<?php
require_once 'vendor/autoload.php';

$loader = new Twig_Loader_Filesystem('templates');

$twig = new Twig_Environment($loader, [
]);

$data = $twig->render('tdd.html.twig');
echo $data;
file_put_contents('curso-tdd.html', $data);