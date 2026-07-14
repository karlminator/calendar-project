<?php

//0. Load variables from .env file
$envFile = __DIR__ . "/.env";
if (file_exists($envFile)) {
  $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  foreach ($lines as $line) {
    if (strpos($line, "=") !== false) {
      [$name, $value] = explode("=", $line, 2);
      putenv(trim($name) . "=" . trim($value));
    };
  }
}

//1. Connect to Local MySQL Server
$username = getenv("USERNAME");
$password = getenv("PASSWORD");

$conn = new mysqli("localhost", $username, $password, "calendar_db");
$conn->set_charset("utf8mb4");