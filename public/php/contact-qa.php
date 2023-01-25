<?php
require_once __DIR__ . '/../vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    return http_response_code(405);
}

validateRecaptcha($_POST['g-recaptcha-response']);
$params = $_POST;
$params['subject'] = 'Curso de QA ' . date("Y-m-d H:i:s");
sendEmail($params);
