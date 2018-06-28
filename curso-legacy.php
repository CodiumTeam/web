<?php
require_once 'vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('templates');

$twig = new Twig_Environment($loader, [
]);

$data = $twig->render('legacy.html.twig');
echo $data;
file_put_contents('curso-legacy.html', $data);