<?php

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

require_once 'vendor/autoload.php';

$loader = new FilesystemLoader('templates');
$twig = new Environment($loader, []);

$data = preg_replace('/\s+/', ' ', $twig->render('tdd.html.twig'));
echo $data;
file_put_contents('curso-tdd.html', $data);
