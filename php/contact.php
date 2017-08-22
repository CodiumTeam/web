<?php
require_once __DIR__ . '/../vendor/autoload.php';

validateRecaptcha($_POST['g-recaptcha-response']);
$params = $_POST;
$params['subject'] = 'Web contact triggered by ' . $params['action'];
sendEmail($_POST);

function validateRecaptcha($recaptcha)
{
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

function sendEmail($params)
{
    $transport = (new Swift_SmtpTransport('in-v3.mailjet.com', 587))
        ->setUsername('494fb687ee5235f531bc7a6a426bb6c1')
        ->setPassword('9dd332b69575a9ab2a49cc65a7ee6b20');

    $mailer = new Swift_Mailer($transport);

    $email = $params['email'];
    $name = $params['name'];
    $subject = $params['subject'];
    $body = $params['message'] . "\n\nEmail $email";

    $message = (new Swift_Message($subject))
        ->setFrom(['luisrovirosa@gmail.com' => $name])
        ->setTo(['luis@codium.team' => 'Luis Rovirosa', 'jordi@codium.team' => 'Jordi Anguela'])
        ->setBody($body);

    $mailer->send($message);
}
