<?php
require_once __DIR__ . '/../vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    return http_response_code(405);
}

validateRecaptcha($_POST['g-recaptcha-response']);
$params = $_POST;
$params['subject'] = getSubject($params);
sendEmail($params);


function getSubject($params) {
    $from = 'Web';
    $trainingType = $params['trainingType'] ?? '';

    if ($trainingType) {
        $from = 'Bootcamp';
    }

    return $from . ' contact triggered by ' . $params['action']  . ' ' . date("Y-m-d H:i:s");
}
