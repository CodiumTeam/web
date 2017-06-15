<?php
require_once __DIR__ . '/../vendor/autoload.php';

$transport = (new Swift_SmtpTransport('in-v3.mailjet.com', 587))
    ->setUsername('494fb687ee5235f531bc7a6a426bb6c1')
    ->setPassword('9dd332b69575a9ab2a49cc65a7ee6b20');

$mailer = new Swift_Mailer($transport);

$email = $_POST['email'];
$name = $_POST['name'];
$body = $_POST['message'] . "\n\nEmail $email";
$subject = '[Dojo] ' . $_POST['action'];

$message = (new Swift_Message($subject))
    ->setFrom(['luisrovirosa@gmail.com' => $name])
    ->setTo(['luisrovirosa@gmail.com' => 'Luis Rovirosa', 'jordi.anguela@gmail.com' => 'Jordi Anguela'])
    ->setBody($body);

$result = $mailer->send($message);







