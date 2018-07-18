<?php
require_once 'vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('templates');

$twig = new Twig_Environment($loader, []);

$data = preg_replace('/\s+/', ' ', $twig->render('index.html.twig'));
echo $data;
file_put_contents('index.html', $data);