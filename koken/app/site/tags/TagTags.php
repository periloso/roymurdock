<?php

	class TagTags extends Tag {

		protected $allows_close = true;
		public $tokenize = true;

		function generate()
		{
			if (count(Koken::$tokens) > 1)
			{
				$token = '$value' . Koken::$tokens[1];
			}
			else
			{
				$token = '$value' . Koken::$tokens[0];
			}

			$ref = '$value' . Koken::$tokens[0];

			$params = $this->params_to_array_str();

			return <<<OUT
<?php

	\$__params = array($params);

	if (!isset({$token}['tags']) && isset({$token}['album']))
	{
		\$__base = {$token}['album'];
	}
	else if (isset({$token}['tags']) && is_array({$token}['tags']) && (empty({$token}['tags']) || (isset({$token}['tags'][0]) && is_string({$token}['tags'][0]))) && isset({$token}['__koken__']) && !isset(\$__params['limit_to']))
	{
		\$__base = $token;
	}
	else
	{
		\$__base = Koken::tags( \$__params );
	}

	if (isset(\$__base['tags']) && !empty(\$__base['tags'])):

		$ref = array();

		{$ref}['__loop__'] = \$__base['tags'];

		if (!is_array(\$__base['tags'][0]))
		{
			foreach({$ref}['__loop__'] as &\$t)
			{
				\$t = array(
					'title' => \$t,
					'__koken__' => 'tag_' . \$__base['__koken__'] . 's'
				);
			}
		}
?>
OUT;
		}
	}