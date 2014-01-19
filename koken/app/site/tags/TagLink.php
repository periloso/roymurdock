<?php

	class TagLink extends Tag {

		protected $allows_close = true;

		function generate()
		{
			$attr = array();
			$get = false;

			if (isset($this->parameters['bind_to_key']))
			{
				$this->parameters['data-bind-to-key'] = $this->parameters['bind_to_key'];
				unset($this->parameters['bind_to_key']);
			}

			if (isset($this->parameters['to']) && $this->parameters['to'] === 'date')
			{
				$this->parameters['type'] = 'event_timeline';
				unset($this->parameters['to']);
			}
			else if (isset($this->parameters['to']) && in_array($this->parameters['to'], array('archive', 'tag', 'category')))
			{
				$this->parameters['type'] = $this->parameters['to'];
				unset($this->parameters['to']);
			}

			if (isset($this->parameters['to']) && strpos($this->parameters['to'], 'archive_') !== false)
			{
				$this->parameters['type'] = str_replace('archive_', '', $this->parameters['to']);
				unset($this->parameters['to']);
			}

			if (isset($this->parameters['url']))
			{
				$this->parameters['url'] = '"' . $this->attr_parse( $this->parameters['url'] ) . '"';
			}
			else if (isset($this->parameters['to']))
			{
				$this->parameters['url'] = $this->parameters['to'] === 'front' ? '"/"' : 'isset(Koken::$location[\'urls\'][\'' . $this->parameters['to'] . '\']) ? Koken::$location[\'urls\'][\'' . $this->parameters['to'] . '\'] : "/"';
				if (isset($this->parameters['filter:id']))
				{
					$get = $this->parameters['filter:id'];
					unset($this->parameters['filter:id']);
					$model = $this->parameters['to'];
				}
				unset($this->parameters['to']);
			}
			else if (isset($this->parameters['data']))
			{
				$token = $this->field_to_keys('data');
				if (preg_match("/\.context\.(neighbors|previous|next)/", $this->parameters['data']))
				{
					$bits = explode('.context.', $this->parameters['data']);
					$album = $bits[0] . '.context.album';
					$k = $this->field_to_keys($album);
					$parent_token = "\$__context = isset($k) ? $k : false;";
				}
				unset($this->parameters['data']);
			}
			else
			{
				$token = '$value' . Koken::$tokens[0];
				$check_token = isset(Koken::$tokens[1]) ? Koken::$tokens[1] : Koken::$tokens[0];

				$c = '$value' . $check_token . "['context']['album']";
				$p = '$value' . $check_token . "['album']";
				$parent_token = "\$__context = isset($c) ? $c : ( isset($p) ? $p : false );";
			}

			if (isset($this->parameters['type']))
			{
				if (in_array($this->parameters['type'], array('event_timeline', 'tag', 'category')))
				{
					$to = "{$token}['__koken__override'] = '{$this->parameters['type']}';";
				}
				else if ($this->parameters['type'] === 'archive')
				{
					$to = "{$token}['__koken__override'] = 'archive_' . (isset({$token}['__koken__']) ? {$token}['__koken__'] . 's' : ( isset({$token}['album']) ? 'albums' : '' ));";
				}
				else
				{
					$to = "{$token}['__koken__override'] = {$token}['__koken__'] . '_{$this->parameters['type']}';";
				}
				unset($this->parameters['type']);
			}
			else
			{
				$to = '';
			}

			if (isset($this->parameters['echo']))
			{
				$echo = true;
				unset($this->parameters['echo']);
				$this->allows_close = false;
			}
			else
			{
				$echo = false;
			}

			$tail = '';
			foreach($this->parameters as $key => $val)
			{
				if ($key === 'url') continue;
				if (strpos($key, 'filter:') === 0)
				{
					$tail .= str_replace('filter:', '', $key) . ':' . $this->attr_parse($val) . '/';
					if ($key === 'filter:order_by')
					{
						$to .= "{$token}['__koken__override_date'] = \"" . $this->attr_parse($val) . '";';
					}
				}
				else
				{
					$attr[] = $key . '=\"' . $this->attr_parse($val) . '\"';
				}
			}

			if (count($attr) > 0)
			{
				$attr = ' ' . join(' ', $attr);
			}
			else
			{
				$attr = '';
			}

			if (!isset($parent_token))
			{
				$parent_token = '$__context = false;';
			}

			if (isset($this->parameters['lightbox']))
			{
				$lightbox = 'true';
			}
			else
			{
				$lightbox = 'false';
			}

			$out = "<?php \$attr = \"$attr\";";

			if ($get)
			{
				$this->tokenize = true;
				$token = md5(uniqid());
				array_unshift(Koken::$tokens, $token);
				if ($model === 'page' || $model === 'essay')
				{
					$model = 'text';
				} else if ($model !== 'content')
				{
					$model .= 's';
				}
				$main = '$value' . $token;
				$out .= <<<DOC
	$main = Koken::api('/$model/$get');
	if ($main && !isset({$main}['error']))
	{
		if (!isset({$main}[{$main}['__koken__']]))
		{
			{$main}[{$main}['__koken__']] =& $main;
		}
	}
	\$__url = {$main}['__koken_url'];
DOC;
			}
			else if (isset($token))
			{
				$out .= <<<DOC
	$parent_token
	$to
	\$__url = Koken::form_link($token, \$__context, $lightbox);
	if (isset({$token}['__koken__override']))
	{
		unset({$token}['__koken__override']);
	}
	if (isset({$token}['__koken__override_date']))
	{
		unset({$token}['__koken__override_date']);
	}
DOC;
			}
			else
			{
				$out .= '$__url = ' . $this->parameters['url'] . ';';
			}

			$out .= <<<DOC
	if (\$__url === Koken::\$navigation_home_path)
	{
		\$__url = '/';
	}
	if ((\$__url === '/' && Koken::\$location['here'] === '/') || preg_match('/^' . str_replace('/', '\\/', urldecode(\$__url)) . '(\\/.*)?$/', Koken::\$location['here']))
	{
		if (strpos(\$attr, 'class="') === false)
		{
			\$attr .= ' class="k-nav-current"';
		}
		else
		{
			\$attr = preg_replace('/class="([^"]+)"/', 'class="$1 k-nav-current"', \$attr);
		}
	}
	if (strpos(\$__url, '/') === 0 && !preg_match('/\/lightbox\/$/', \$__url))
	{
		\$attr .= ' data-koken-internal';
	}
	\$__url = strpos(\$__url, '/') === 0 ? Koken::\$location['root'] . \$__url . "$tail" . ( Koken::\$preview ? '&amp;preview=' . Koken::\$preview : '' ) : \$__url;
DOC;

			if ($echo)
			{
				$out .= "echo ( isset(\$_SERVER['HTTPS']) && \$_SERVER['HTTPS'] === 'on' ? 'https' : 'http' ) . '://' . \$_SERVER['HTTP_HOST'] . \$__url; ?>";
			}
			else
			{
				$out .= <<<DOC
?><a href="<?php echo \$__url; ?>"<?php echo \$attr; ?>>
DOC;
			}

			return $out;
		}

		function close()
		{
			return $this->allows_close ? '</a>' : '';
		}
	}