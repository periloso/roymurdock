<?php

	date_default_timezone_set('UTC');

	error_reporting(0);

	if (isset($_GET['path']))
	{
		$path = $_GET['path'];
	}
	else if (isset($_SERVER['QUERY_STRING']))
	{
		$path = urldecode($_SERVER['QUERY_STRING']);
	}
	else if (isset($_SERVER['PATH_INFO']))
	{
		$path = $_SERVER['PATH_INFO'];
	}
	else if (isset($_SERVER['REQUEST_URI']))
	{
		$path = preg_replace('/.*\/i.php/', '', $_SERVER['REQUEST_URI']);
	}

	$path = preg_replace('/\?\d+$/', '', urldecode($path));
	$ds = DIRECTORY_SEPARATOR;
	$root = dirname(__FILE__);
	$content = $root . $ds . 'storage';
	$base = $content . $ds . 'cache' . $ds . 'images';
	$file = $base . str_replace('/', $ds, $path);
	$strip = true;

	$dl = $base64 = false;
	if (preg_match('/\.dl$/', $file))
	{
		$file = preg_replace('/\.dl$/', '', $file);
		$dl = true;
	}
	else if (preg_match('/\.64$/', $file))
	{
		$file = preg_replace('/\.64$/', '', $file);
		$base64 = true;
	}

	$new = false;

	$exists = file_exists($file);

	$info = pathinfo($file);
	$ext = $info['extension'];

	if ($exists)
	{
		$realpath = realpath($base);
		$realpathfile = realpath($file);

		if ($exists && (!$realpathfile || strpos($realpathfile, $realpath) !== 0))
		{
			// Bad request
			header('HTTP/1.1 403 Forbidden');
			exit;
		}
	}
	else
	{
		$new = $preset = true;

		preg_match('/^\/((?:[0-9]{3}\/[0-9]{3})|custom)\/(.*)[,\/](tiny|small|medium|medium_large|large|xlarge|huge)\.(crop\.)?(2x\.)?(?P<ext>jpe?g|gif|png|svg)(\.dl|.64)?$/i', $path, $matches);

		// If $matches is empty, they are requesting a custom size
		if (empty($matches))
		{
			preg_match('/^\/((?:[0-9]{3}\/[0-9]{3})|custom)\/(.*)[,\/]([0-9]+)\.([0-9]+)\.([0-9]{1,3})\.([0-9]{1,3})\.(crop\.)?(2x\.)?(?P<ext>jpe?g|gif|png|svg)(\.dl|.64)?$/i', $path, $matches);
			$preset = false;
		}

		if (empty($matches))
		{
			// Bad request
			header('HTTP/1.1 403 Forbidden');
			exit;
		}

		$custom = $matches[1] === 'custom';

 		// No path traversing in file name
 		if (preg_match("/[^a-zA-Z0-9._-]/", $matches[2])) {
			header('HTTP/1.1 403 Forbidden');
			exit;
		}

		require($content . $ds . 'configuration' . $ds . 'database.php');

		if ($custom)
		{
			$query = false;
			$row = array();
		}
		else
		{
			$id = (int) str_replace('/', '', $matches[1]);
			$query = "SELECT filename, file_type, visibility, lg_preview, internal_id, focal_point, width, height FROM {$KOKEN_DATABASE['prefix']}content WHERE id = $id";
		}

		$settings_query = "SELECT id FROM {$KOKEN_DATABASE['prefix']}settings WHERE name = 'retain_image_metadata' AND value = 'true'";

		if ($preset)
		{
			$quality_query = "SELECT name, value FROM {$KOKEN_DATABASE['prefix']}settings WHERE name = 'image_{$matches[3]}_quality' OR name = 'image_{$matches[3]}_sharpening'";
		}

		$interface = $KOKEN_DATABASE['driver'];

		if ($interface == 'mysqli')
		{
			$db_link = mysqli_connect($KOKEN_DATABASE['hostname'], $KOKEN_DATABASE['username'], $KOKEN_DATABASE['password'], null, (int) $KOKEN_DATABASE['port'], $KOKEN_DATABASE['socket']);
			$db_link->select_db($KOKEN_DATABASE['database']);

			if ($query)
			{
				$result = $db_link->query($query);
				if ($result)
				{
					$row = $result->fetch_array();
					$result->close();
				}
				else
				{
					header('HTTP/1.1 404 Not Found');
					exit;
				}
			}

			$settings_result = $db_link->query($settings_query);
			if ($settings_result && $settings_result->num_rows > 0)
			{
				$strip = false;
			}

			if ($preset)
			{
				$quality_result = $db_link->query($quality_query);
				while($quality_row = $quality_result->fetch_array())
				{
					if (strpos($quality_row['name'], 'quality'))
					{
						$settings_quality = $quality_row['value'];
					}
					else
					{
						$settings_sharpening = $quality_row['value'];
					}
				}
			}
			$db_link->close();
		}
		else
		{
			mysql_connect($KOKEN_DATABASE['hostname'], $KOKEN_DATABASE['username'], $KOKEN_DATABASE['password']);
			mysql_select_db($KOKEN_DATABASE['database']);

			if ($query)
			{
				$result = mysql_query($query);
				if ($result)
				{
					$row = mysql_fetch_array($result);
					mysql_free_result($result);
				}
				else
				{
					header('HTTP/1.1 404 Not Found');
					exit;
				}
			}

			$settings_result = mysql_query($settings_query);
			if ($settings_result && mysql_num_rows($settings_result) > 0)
			{
				$strip = false;
			}

			if ($preset)
			{
				$quality_result = mysql_query($quality_query);
				while($quality_row = mysql_fetch_assoc($quality_result))
				{
					if (strpos($quality_row['name'], 'quality'))
					{
						$settings_quality = $quality_row['value'];
					}
					else
					{
						$settings_sharpening = $quality_row['value'];
					}
				}
			}
			mysql_close();
		}

		if (!$custom)
		{
			$original_info = pathinfo($row['filename']);
			if (strtolower($original_info['filename']) !== strtolower($matches[2]))
			{
				header('HTTP/1.1 404 Not Found');
				exit;
			}
		}

		if ($custom)
		{
			$original = $content . $ds . 'custom' . $ds . preg_replace('/\-(jpe?g|gif|png)$/i', '.$1', $matches[2]);
		}
		else
		{
			$internal_path = substr($row['internal_id'], 0, 2) . $ds . substr($row['internal_id'], 2, 2);
			$original = $content . $ds . 'originals' . $ds . $internal_path . $ds . basename($row['filename']);
			if ($row['file_type'] != 0)
			{
				$preview_file = array_shift(explode(':', $row['lg_preview']));
				$original .= '_previews' . $ds . $preview_file;

				list($source_width, $source_height) = getimagesize($original);
			}
		}

		if (file_exists($original))
		{
			if (!is_dir(dirname($file)))
			{
				$parent_perms = substr(sprintf('%o', fileperms(dirname(dirname(dirname(dirname($file)))))), -4);
				$old = umask(0);
				mkdir(dirname($file), octdec($parent_perms), true);
				umask($old);
			}

			if (isset($preview_file) && $preview_file == 'waveform.svg')
			{
				// TODO: store this once, perhaps handle vectors separately in API response
				copy($original, $file);
			}
			else
			{
				@include($content . $ds . 'configuration' . $ds . 'user_setup.php');

				if (!defined('MAGICK_PATH'))
				{
					define('MAGICK_PATH_FINAL', 'convert');
				}
				else if (strpos(strtolower(MAGICK_PATH), 'c:\\') !== false)
				{
					define('MAGICK_PATH_FINAL', '"' . MAGICK_PATH . '"');
				}
				else
				{
					define('MAGICK_PATH_FINAL', MAGICK_PATH);
				}
				if (!defined('FORCE_GD'))
				{
					define('FORCE_GD', 0);
				}

				require($root . $ds . 'app' . $ds . 'koken' . $ds . 'darkroom.php');

				$focal = json_decode($row['focal_point']);
				if (!$focal)
				{
					$x = $y = 50;
				}
				else
				{
					$x = $focal->x;
					$y = $focal->y;
				}

				if ($preset)
				{
					$preset_array = Darkroom::$presets[$matches[3]];
					$w = $preset_array['width'];
					$h = $preset_array['height'];
					$q = $settings_quality;
					$sh = $settings_sharpening;
					if (empty($matches[4]))
					{
						$crop = false;
					}
					else
					{
						$crop = true;
					}

					$hires = !empty($matches[5]);
				}
				else
				{
					list(,,,$w,$h,$q,$sh,$crop) = $matches;
					$crop = (bool) $crop;
					$hires = !empty($matches[8]);
					$sh /= 100;
				}

				if (!isset($source_width))
				{
					$source_width = $row['width'];
					$source_height = $row['height'];
				}

				Darkroom::develop( array(
						'source' => $original,
						'destination' => $file,
						'width' => $w,
						'height' => $h,
						'quality' => $q,
						'square' => $crop,
						'sharpening' => $sh,
						'focal_x' => $x,
						'focal_y' => $y,
						'hires' => $hires,
						'source_width' => $source_width,
						'source_height' => $source_height,
						'strip' => $strip
					),
					$row
				);
			}
		}
		else
		{
			header('HTTP/1.1 404 Not Found');
			exit;
		}

		if (!file_exists($file))
		{
			header('HTTP/1.1 500 Internal Server Error');
			exit;
		}

	}

	$mtime = filemtime($file);
	$etag = md5($file . $mtime);

	$disabled_functions = explode(',', str_replace(' ', '', ini_get('disable_functions')));

	$ext = strtolower($ext);

 	if ($ext == 'jpg')
 	{
 		$ext = 'jpeg';
 	}
 	else if ($ext == 'svg')
 	{
 		$ext .= '+xml';
 	}

	if ($dl)
	{
		header("Content-Disposition: attachment; filename=\"" . basename($file) . "\"");
		header('Content-type: image/' . $ext);
		header('Content-length: ' . filesize($file));

		if (is_callable('readfile') && !in_array('readfile', $disabled_functions)) {
			readfile($file);
			exit;
		} else {
			die(file_get_contents($file));
		}
	}
	else if ($base64)
	{
		$string = base64_encode(file_get_contents($file));
		die("data:image/$ext;base64,$string");
	}

	if (!$new) {
		if (
			(isset($_SERVER['HTTP_IF_NONE_MATCH']) && $_SERVER['HTTP_IF_NONE_MATCH'] == $etag) ||
			(isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) >= filemtime($path_to_cache))
		)
		{
			$server_protocol = (isset($_SERVER['SERVER_PROTOCOL'])) ? $_SERVER['SERVER_PROTOCOL'] : false;

			if (substr(php_sapi_name(), 0, 3) === 'cgi')
			{
				header("Status: 304 Not Modified", true);
			}
			elseif ($server_protocol === 'HTTP/1.1' OR $server_protocol === 'HTTP/1.0')
			{
				header($server_protocol." 304 Not Modified", true, $code);
			}
			else
			{
				header("HTTP/1.1 304 Not Modified", true, $code);
			}
			exit;
		}
	}

	header('Content-type: image/' . $ext);
	header('Content-length: ' . filesize($file));
	header('Cache-Control: public');
	header('Expires: ' . gmdate('D, d M Y H:i:s', strtotime('+1 year')) . ' GMT');
	header('Last-Modified: ' . gmdate('D, d M Y H:i:s', filemtime($file)) . ' GMT');
	header('ETag: ' . $etag);

	if (is_callable('readfile') && !in_array('readfile', $disabled_functions)) {
		readfile($file);
	} else {
		die(file_get_contents($file));
	}