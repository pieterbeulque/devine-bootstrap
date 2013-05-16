<?php

// Require Composer autoloader
// This includes the router
require_once 'vendor/autoload.php';

// Require the response object
require_once 'rest/Response.php';

// Require any other dependencies here

$config = array();
$config['db']['driver'] = 'mysql';
$config['db']['host'] = 'localhost';
$config['db']['user'] = 'root';
$config['db']['password'] = 'root';
$config['db']['dbname'] = 'dbname';