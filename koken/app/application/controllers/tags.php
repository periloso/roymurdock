<?php

class Tags extends Koken_Controller {

	function __construct()
    {
         parent::__construct();
    }

	function index()
	{
		$defaults = array('page' => 1, 'limit' => 20);

		list($params,,$slug) = $this->parse_params(func_get_args());

		$params = array_merge($defaults, $params);

		$t = new Tag();


		if (!$slug)
		{
			list($count, $listing) = $t->listing($params);
			$count_obj = array_pop( $count->result() );
			$final = array(
						'page' => (int) $params['page'],
						'pages' => ceil($count_obj->cnt/$params['limit']),
						'per_page' => min((int) $params['limit'], $count_obj->cnt),
						'total' => (int) $count_obj->cnt,
						'tags' => array()
					);

			$koken_url_info = $this->config->item('koken_url_info');
			$base = $koken_url_info->base;

			foreach($listing->result() as $l) {

				$arr = $t->to_array($l, $params);

				$arr['items'] = $base . 'api.php?/tags/slug:' . urlencode($l->id);
				$final['tags'][] = $arr;

			}
		}
		else
		{
			list(, $listing) = $t->listing();

			$slug = urldecode($slug);
			$data = $this->db->query("SELECT * FROM {$t->table} WHERE id = '$slug'");
			$tag = $data->row();

			$tag_array = $t->to_array($tag);

			$params['tag'] = $tag->id;
			list($final, $counts) = $this->aggregate('tag', $params);

			$final['counts'] = $counts;
			$final = array_merge($tag_array, $final);

			$previous = $next = $current = false;
			$i = 1;
			$total = count($listing->result());
			foreach($listing->result() as $l)
			{
				if ($l->id === urldecode($slug))
				{
					$current = true;
				}
				else if ($current)
				{
					$next = array($t->to_array($l));
					break;
				}
				else
				{
					$previous = array($t->to_array($l));
				}
			}

			$final['context'] = array(
				'total' => $total,
				'position' => $i,
				'previous' => $previous ? $previous : array(),
				'next' => $next ? $next : array()
			);

		}

		$this->set_response_data($final);
	}

}