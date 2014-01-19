<?php

class Category extends DataMapper {

	var $has_many = array(
		'content',
		'album',
		'text'
	);

	var $validation = array(
		'title' => array(
			'label' => 'Title',
			'rules' => array('required')
		),
		'slug' => array(
			'rules' => array('slug', 'required')
		)
	);

	/**
	 * Constructor: calls parent constructor
	 */
    function __construct($id = NULL)
	{
		parent::__construct($id);
    }

    function _slug($field)
	{
		if (!empty($this->slug) && $this->slug !== '__generate__')
		{
			return true;
		}

		$this->load->helper(array('url', 'text', 'string'));
		$slug = reduce_multiples(
					strtolower(
						url_title(
							convert_accented_characters($this->title), 'dash'
						)
					)
				, '-', true);

		if (empty($slug))
		{
			$t = new Category;
			$max = $t->select_max('id')->get();
			$slug = $max->id + 1;
		}

		if (is_numeric($slug))
		{
			$slug = "$slug-1";
		}

		$s = new Slug;

		// Need to lock the table here to ensure that requests arriving at the same time
		// still get unique slugs
		if ($this->has_db_permission('lock tables'))
		{
			$this->db->query("LOCK TABLE {$s->table} WRITE");
			$locked = true;
		}
		else
		{
			$locked = false;
		}

		while($s->where('id', "category.$slug")->count() > 0)
		{
			$slug = increment_string($slug, '-');
		}

		$this->db->query("INSERT INTO {$s->table}(id) VALUES ('category.$slug')");

		if ($locked)
		{
			$this->db->query('UNLOCK TABLES');
		}

		$this->slug = $slug;
	}

    function to_array($options = array())
	{
		$exclude = array('content_count', 'album_count', 'text_count', 'count');
		list($data, $public_fields) = $this->prepare_for_output($options, $exclude);
		if (isset($options['limit_to']) && $options['limit_to'])
		{
			$key = rtrim($options['limit_to'], 's') . '_count';
			$key = $key === 'essay_count' ? 'text_count' : $key;
			$data['counts'] = array(
				$options['limit_to'] => (int) $this->{$key},
				'total' => (int) $this->{$key},
			);
		}
		else
		{
			$data['counts'] = array(
				'content' => (int) $this->content_count,
				'albums' => (int) $this->album_count,
				'essays' => (int) $this->text_count,
				'total' => $this->content_count + $this->album_count + $this->text_count
			);
		}

		$data['__koken__'] = 'category';

		$data['url'] = $this->url($options);

		if ($data['url'])
		{
			list($data['__koken_url'], $data['url']) = $data['url'];
		}

		return $data;
	}

	function manage_counts($obj, $type, $post)
	{
		$obj->categories->get_iterated();
		$current_category_ids = array();
		$refresh_ids = array();

		foreach($obj->categories as $cat)
		{
			$current_category_ids[] = $cat->id;
		}

		if (empty($post))
		{
			foreach($obj->categories as $cat)
			{
				$cat->delete($obj);
				$refresh_ids[] = $cat->id;
			}
		}
		else
		{
			$new_categories = explode(',', $post);
			$add = array_diff($new_categories, $current_category_ids);
			$remove = array_diff($current_category_ids, $new_categories);

			if (!empty($add))
			{
				$c_new = new Category;
				$new = $c_new->where_in('id', $add)->get_iterated();
				foreach($new as $n)
				{
					$refresh_ids[] = $n->id;
					$n->save($obj);
				}
			}

			if (!empty($remove))
			{
				$c_rm = new Category;
				$remove = $c_rm->where_in('id', $remove)->get_iterated();
				foreach($remove as $r)
				{
					if (!in_array($r->id, $refresh_ids)) {
						$refresh_ids[] = $r->id;
					}
					$r->delete($obj);
				}
			}
		}

		if (!empty($refresh_ids))
		{
			$c_re = new Category;
			$refresh = $c_re->where_in('id', $refresh_ids)->get_iterated();

			foreach($refresh as $r)
			{
				$count = "{$type}_count";
				$r->{$count} = $r->{$type}->count();
				$r->count = $r->album_count + $r->content_count + $r->text_count;
				$r->save();
			}
		}
	}
}

/* End of file category.php */
/* Location: ./application/models/category.php */