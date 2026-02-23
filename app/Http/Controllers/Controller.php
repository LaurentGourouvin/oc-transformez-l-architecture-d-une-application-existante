<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *     title="Renote API",
 *     version="1.0.0",
 *     description="API REST pour l'application Renote"
 * )
 * @OA\Server(
 *     url="http://monolithic-app.test",
 *     description="Local server"
 * )
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer"
 * )
 */
abstract class Controller
{
    //
}
