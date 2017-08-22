<?php
require_once __DIR__ . '/../vendor/autoload.php';

validateRecaptcha($_POST['g-recaptcha-response']);
$params = $_POST;
$params['subject'] = 'Web contact triggered by ' . $params['action']  . ' ' . date("Y-m-d H:i:s");
sendEmail($params);


