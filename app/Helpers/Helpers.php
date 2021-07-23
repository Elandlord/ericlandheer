<?php

if (! function_exists('strip_divs')) {
    function strip_divs($str) {
        return preg_replace('/\<[\/]{0,1}div[^\>]*\>/i', '', $str);
    }
}
