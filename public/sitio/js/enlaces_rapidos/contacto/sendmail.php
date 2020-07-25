<?php

$mensaje= "Nombre: ".$_POST["nombre"] . "\n Email: " . $_POST["email"] . "\n Consulta: " . $_POST["consulta"];
$mensaje= htmlspecialchars($mensaje);
$mensaje= stripslashes($mensaje);

$to = "dangpark17@gmail.com";
$subject = "Tienes un mensaje de: " . $_POST["nombre"];
$header = "dangpark17@gmail.com \r\n";
$retval = mail ($to,$subject,$mensaje,$header);
if ( $retval == true ){
    echo "Mensaje enviado con éxito...";
}
else{
    echo "Mensaje no se pudo enviar...";
}