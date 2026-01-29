<?php
// testa.php - Inizio della pagina HTML + session start

session_start(); // sempre all'inizio se usiamo sessioni
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: 'Times New Roman', Times, serif; max-width: 500px; margin: 50px auto; padding: 20px; }
        .input {
            display: inline-flexbox;
            width: 495px;
            height: 25px;
            color: black;
            background: white;
            text-decoration: none;
            text-align: center;
            border-radius: 5px;
            border-width: 1px;
            border-color: black;
        }

        .btn {
            display: block;
            width: 100%;
            height: 25px;
            background: #00c407;
            color: white;
            text-decoration: none;
            text-align: center;
            border-radius: 5px;
            border: none;
            cursor: pointer;
        }

        .btn:hover {
            background: #008d05;    /* verde più scuro */
        }
        
        .btn-login {
            display: block;
            width: 250px;
            height: 25px;
            background: #00c407;
            color: white;
            text-decoration: none;
            text-align: center;
            border-radius: 5px;
            border: none;
            cursor: pointer;
        }

        .btn-login:hover {
            background: #008d05;    /* verde più scuro */
        }

        .btn-registrati {
            display: block;
            width: 250px;
            height: 25px;
            background: #2196F3;    /* blu per registrati */
            color: white;
            text-decoration: none;
            text-align: center;
            border-radius: 5px;
            border: none;
            cursor: pointer;
        }

        .btn-registrati:hover {
            background: #186fb6;   /* blu più scuro */
        }
    </style>
</head>
<body>

<div class="container"></div>