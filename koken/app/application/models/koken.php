<?php

class Koken extends DataMapper {

	function _validate_time($field)
	{
		$val = $this->{$field};
		$previous = 'old_' . $field;

		if (is_numeric($val))
		{
			return strlen($val) <= 10;
		}
		else if ($val === 'captured_on' && $field === 'published_on')
		{
			$s = new Setting;
			$s->where('name', 'site_timezone')->get();
			$tz = new DateTimeZone($s->value);
			$offset = $tz->getOffset( new DateTime(date('c', $this->captured_on), new DateTimeZone('UTC')) );
			$this->published_on = $this->captured_on - $offset;
			return true;
		}
		else if (isset($this->{$previous}))
		{
			$test = trim(preg_replace('/\-?\s*(year|month|day|hour|second)s?/', '', $test));
			if (strlen($test) === 0)
			{
				$diff = time() - strtotime($val);
				$this->{$field} = $this->{$previous} - $diff;
				return true;
			}
		}
		return false;
	}
}