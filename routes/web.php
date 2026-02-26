<?php

use Illuminate\Support\Facades\Route;


Route::view('/app/{any?}', 'react')->where('any', '.*');

require __DIR__ . '/auth.php';
