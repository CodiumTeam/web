<?php
require_once __DIR__ . '/../vendor/autoload.php';

//validateRecaptcha($_POST['g-recaptcha-response']);
$params = $_POST;
$params['subject'] = 'Curso de TDD ' . date("Y-m-d H:i:s");
sendEmail($params);


