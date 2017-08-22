<?php
require_once __DIR__ . '/../vendor/autoload.php';

validateRecaptcha();
sendEmail();

function validateRecaptcha()
{
    $recaptcha = $_POST['g-recaptcha-response'];
    $client = new \GuzzleHttp\Client();
    $response = $client->request('POST', 'https://www.google.com/recaptcha/api/siteverify', [
        'form_params' => [
            'secret'   => '6LcIGCsUAAAAAGpVhL28cuEsHVqRipF8r7XmPQOz',
            'response' => $recaptcha
        ]
    ]);

    $responseJson = json_decode($response->getBody()->getContents(), true);
    if (!$responseJson['success']) {
        throw new Exception("El captcha no es válido", 400);
    }
}

function sendEmail()
{
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

    $mailer->send($message);
}
