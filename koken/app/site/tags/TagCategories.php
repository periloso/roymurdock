<?php

	class TagCategories extends Tag {

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

	if (!isset({$token}['categories']) && isset({$token}['album']))
	{
		\$__base = {$token}['album'];
	}
	else if (isset({$token}['categories']) && (empty({$token}['categories']) || (isset({$token}['categories'][0]) && isset({$token}['categories'][0]['title']))) && isset({$token}['__koken__']) && !isset(\$__params['limit_to']))
	{
		\$__base = $token;
	}
	else
	{
		\$__base = Koken::categories( \$__params );
	}

	if (isset(\$__base['categories']) && !empty(\$__base['categories'])):

		$ref = array();
		{$ref}['__loop__'] =& \$__base['categories'];
?>
OUT;
		}
	}