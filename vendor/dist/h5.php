<?php

$url =($_REQUEST['isSandbox']?'sandbox':'').'api.5yoho.cn/h5.php';
echo httpClientRequest($url, $_REQUEST);

function httpClientRequest($url, $data, $method = 'POST', $waitForResponse = true, $timeout = 60, $options = array ())
{
    $urlarr = parse_url($url);
    $ch = curl_init();
    $timeout = $waitForResponse == true ? $timeout : 1;
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_MAXREDIRS, 5);
    if (strtolower($urlarr['scheme']) == 'https') {
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
    }
    if (isset($urlarr['port']))
        curl_setopt($ch, CURLOPT_PORT, $urlarr['port']);
    if (strtoupper($method) == 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_HTTPHEADER,
            array (
                'Content-Type: multipart/form-data'
            )
        );
    } else //GET method
    {
        if ($data) {
            if (false === strpos($url, '?'))
                $url .= '?' . $data;
            else
                $url .= '&' . $data;
        }
    }
    curl_setopt($ch, CURLOPT_URL, $url);
    $output = curl_exec($ch);
    curl_close($ch);
    return $output;
}




