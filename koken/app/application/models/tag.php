<?php

class Tag extends DataMapper {

	function manage($add, $remove, $type = 'content')
	{
		$count = "{$type}_count";

		if ($add)
		{
			$q = array();
			$now = time();
			foreach($add as $tag)
			{
				$q[] = "('$tag', 1, 1, $now)";
			}

			if (!empty($q))
			{
				$q = join(',', $q);
				$this->db->query("INSERT INTO {$this->table}(id, count, $count, last_used) VALUES $q ON DUPLICATE KEY UPDATE $count = $count + 1, count = count + 1");
			}
		}

		if ($remove)
		{
			if (!empty($remove))
			{
				$in = "'" . join("','", $remove) . "'";
				$this->db->query("UPDATE {$this->table} SET $count = $count - 1, count = count - 1 WHERE id IN ($in)");
			}
		}
	}

	function to_array($tag, $params = array())
	{
		$params = array_merge(array('limit_to' => false), $params);

		$data = array(
			'title' => $tag->id,
			'__koken__' => 'tag',
		);

		if ($params['limit_to'])
		{
			$key = rtrim($params['limit_to'], 's') . '_count';
			$key = $key === 'essay_count' ? 'text_count' : $key;
			$data['counts'] = array(
				$params['limit_to'] => (int) $tag->{$key},
				'total' => (int) $tag->{$key},
			);
		}
		else
		{
			$data['counts'] = array(
				'total' => (int) $tag->count,
				'content' => (int) $tag->content_count,
				'albums' => (int) $tag->album_count,
				'essays' => (int) $tag->text_count
			);
		}

		$this->slug = $tag->id;
		$data['url'] = $this->url($params);

		if ($data['url'])
		{
			list($data['__koken_url'], $data['url']) = $data['url'];
		}

		return $data;
	}

	function listing($params = array())
	{
		$defaults = array(
			'order_by' => 'count',
			'order_direction' => 'DESC',
			'floor' => 1,
			'tags' => false,
			'limit_to' => false,
			'page' => false,
			'limit' => false
		);

		$params = array_merge($defaults, $params);

		if ($params['order_by'] === 'essay_count')
		{
			$params['order_by'] = 'text_count';
		}
		else if ($params['order_by'] === 'title')
		{
			$params['order_by'] = 'id';
		}

		if (strpos($params['order_by'], 'count') === false)
		{
			$where = 'count';
		}
		else
		{
			$where = $params['order_by'];
		}

		if ($params['order_by'] === 'last_used')
		{
			$params['order_by'] .= ' ' . $params['order_direction'] . ', count';
		}

		if ($params['limit_to'] && $params['order_by'] !== 'last_used')
		{
			$where = str_replace('essay', 'text', rtrim($params['limit_to'], 's')) . '_count';
		}

		$start = '';
		if ($params['page'] > 1)
		{
			$params['limit'] = $params['limit']*($params['page']-1) . ',' . $params['limit'];
		}
		if ($params['tags'])
		{
			$filter = ' AND id="' . $params['tags'] . '"';
		}
		else
		{
			$filter = '';
		}

		$count = $this->db->query("SELECT count(*) as cnt FROM {$this->table} WHERE $where >= {$params['floor']}$filter ORDER BY {$params['order_by']} {$params['order_direction']}");
		$data = $this->db->query("SELECT * FROM {$this->table} WHERE $where >= {$params['floor']}$filter ORDER BY {$params['order_by']} {$params['order_direction']}" . ($params['limit'] ? " LIMIT {$params['limit']}$start" : ''));
		return array($count, $data);
	}
}

/* End of file trash.php */
/* Location: ./application/models/trash.php */