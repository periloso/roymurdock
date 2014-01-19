<?php

	// This class responds to koken:content, koken:albums and koken:essays
	class TagLoader extends Tag {

		protected $allows_close = true;
		public $tokenize = true;

		function generate()
		{

			$obj = $this->parameters['_obj'];
			unset($this->parameters['_obj']);

			if (count(Koken::$tokens) > 1)
			{
				$token = '$value' . Koken::$tokens[1];
				$copy = '$copy' . Koken::$tokens[1];
			}
			else
			{
				$token = '$value' . Koken::$tokens[0];
				$copy = '$copy' . Koken::$tokens[0];
			}
			$ref = '$value' . Koken::$tokens[0];
			$tmp = '$tmp' . Koken::$tokens[0];
			$limit = '$limit' . Koken::$tokens[0];
			$archive = '$archive' . Koken::$tokens[0];

			if (isset($this->parameters['limit']))
			{
				$l = $this->attr_parse($this->parameters['limit']);
			}
			else
			{
				$l = 'false';
			}

			$params = $this->params_to_array_str();

			return <<<OUT
<?php

	$archive = $limit = false;

	if (isset($token))
	{
		$copy = $token;
	}
	else
	{
		$copy = array();
	}

	if (isset({$copy}['$obj']) && is_string({$copy}['$obj']) && strpos({$copy}['$obj'], 'http') !== false)
	{
		if (isset({$token}['filename']) || (isset({$token}['counts']) && {$token}['counts']['$obj'] > 0))
		{
			$copy = Koken::api({$copy}['$obj'] . ( $l > 0 ? '/limit:' . $l : '' ));
		}
		else
		{
			{$copy}['$obj'] = array();
		}
	}
	else if (!isset({$copy}['$obj']))
	{
		$copy = Koken::$obj(array($params));
	}

	if (isset({$copy}['text']))
	{
		{$copy}['essays'] = {$copy}['text'];
	}

	if (!isset({$copy}['$obj']) && isset({$copy}['preview']['$obj']))
	{
		$archive = {$copy};
		$tmp = {$copy}['preview'];
		$limit = $l;
	}
	else
	{
		$tmp = $copy;
	}

	if (isset({$tmp}['$obj']) && !empty({$tmp}['$obj'])):

		if ($limit > 0)
		{
			{$tmp}['$obj'] = array_slice({$tmp}['$obj'], 0, $limit);
		}

		$ref = array();
		{$ref}['__loop__'] =& {$tmp}['$obj'];
		{$ref}['$obj'] =& {$tmp}['$obj'];

		if ($archive)
		{
			foreach($archive as \$__k => \$__v)
			{
				if (\$__k === 'preview') continue;
				{$ref}[\$__k] = \$__v;
			}
			{$ref}['__koken__'] .= '_{$obj}';
			{$ref}['link'] = Koken::form_link($ref, false, false);
		}
?>
OUT;
		}
	}