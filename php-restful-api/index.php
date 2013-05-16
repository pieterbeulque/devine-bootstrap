<?php

require_once 'bootstrap.php';

// Set up router
$router = new \Bramus\Router\Router();

// Set up database
$dsn = $config['db']['driver'] . ':host=' . $config['db']['host'] . ';dbname=' . $config['db']['dbname']
       . ';user=' . $config['db']['user'] . ';password=' . $config['db']['password'] . ';charset=utf8';

$db = new \PDO($dsn, $config['db']['user'], $config['db']['password']);

if ($db) {
    $db->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
    $db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    if ($config['db']['driver'] === 'mysql') $db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
} else {
    die('Could not connect to database');
}

// Define routes

// Example code

// $router->get('/', function () use ($db) {
//     $res = new JSONResponse();
//     $res->setData('Your api works!');
//     $res->finish();
// });

// $router->get('/events/(\d+)', function ($eventID) use ($db) {
//     Parameters with a subset of RegEx
//     Check out what to use:
//     https://www.cs.washington.edu/education/courses/190m/12sp/cheat-sheets/php-regex-cheat-sheet.pdf
// });

$router->run();