<?php
if ($_GET['act'] === 'men'){
    $url = 'http://k.olc.tw/elections/api/elections/candidates/'.$_GET['areaid'];
}
else if ($_GET['act'] === 'man'){
	$url = 'http://k.olc.tw/elections/api/candidates/view/'.$_GET['manid'];
}
else if ($_GET['act'] === 'area'){
	$url = 'http://k.olc.tw/elections/api/elections/index/'.$_GET['typeid'];
}

$ch = curl_init();

// set URL and other appropriate options
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);

// grab URL and pass it to the browser
$result = curl_exec($ch);
//echo $result;

// close cURL resource, and free up system resources
curl_close($ch);