<!DOCTYPE html>
<html lang="en" ng-app="manu">
<head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/png" href="/img/logoiq.png" />
    <title>Grupo de Investigación Científica y Desarrollo Tecnológico, A.C.</title>
    <meta name="description" content="GICDT, grupo de investigación científica y desarrollo tecnológico, conformado por personas emprendedoras y comprometidas, que satisface las necesidades de la sociedad, aplicando los conocimientos sobre tecnología e investigación en la solución de problemáticas y necesidades de investigadores, autores y estudiantes de posgrado, a fin de impulsar la divulgación de la información, por medio de 4 servicios ofertados en una plataforma web que maneja tecnología de vanguardia."/>
    <meta http-equiv="Pragma" content="no-cache" >
    <meta http-equiv="expires" content="-1" >
    <meta name="keywords" content=" Publicación de artículos,PLATAFORMAIQ,GICDT,gicdt.org,gicdt,el grupo de investigacion,cursos,chiapas,cursos ittg,ittg,grupo de investigación científica y desarrollo tecnológico" />
    <meta name="robots" content="follow,index"/>
    <meta name="author" content="DanielPerez" />

    <meta name="robots" content="follow,index"/>
    <meta name="author" content="DanielPerez" />
    <meta property="og:type" content="website" />
    <meta name="og:url" content="{{url("/")}}"/>
    <meta name="og:image" content="/baner.png"/>
    <meta property="og:site_name" content="GICDT" />
    <meta name="og:title" content="GICDT"/>
    <meta name="og:description" content="GICDT, grupo de investigación científica y desarrollo tecnológico, conformado por personas emprendedoras y comprometidas, que satisface las necesidades de la sociedad, aplicando los conocimientos sobre tecnología e investigación en la solución de problemáticas y necesidades de investigadores, autores y estudiantes de posgrado, a fin de impulsar la divulgación de la información, por medio de 4 servicios ofertados en una plataforma web que maneja tecnología de vanguardia."/>
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible"/>
    <meta property="fb:app_id" content="525982820914900" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@PLATAFORMAIQ160" />
    <meta name="twitter:title" content="GICDT" />
    <meta name="twitter:description" content="GICDT, grupo de investigación científica y desarrollo tecnológico, conformado por personas emprendedoras y comprometidas, que satisface las necesidades de la sociedad, aplicando los conocimientos sobre tecnología e investigación en la solución de problemáticas y necesidades de investigadores, autores y estudiantes de posgrado, a fin de impulsar la divulgación de la información, por medio de 4 servicios ofertados en una plataforma web que maneja tecnología de vanguardia."/>
    <meta name="twitter:image" content="/baner.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Raleway:300,400,700,900' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="{{url("")}}/sitio/css/library/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="{{url("")}}/sitio/css/library/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="{{url("")}}/sitio/css/library/owl.carousel.css">
    <link rel="stylesheet" type="text/css" href="{{url("")}}/sitio/css/md-font.css">
    <link rel="stylesheet" type="text/css" href="{{url("")}}/sitio/css/style.css">
    <link rel="stylesheet" href="{{ url("") }}/vendor/angular/toaster/toaster.css" type="text/css" />
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>

    <![endif]-->
    <title>GICDT</title>

</head>
<body  id="page-top" class="home" >
<div ui-view="">

</div>
<script>
    var DEBUG = true;
    if(!DEBUG){
        if(!window.console) window.console = {};
        var methods = ["log", "debug", "warn", "info"];
        for(var i=0;i<methods.length;i++){
            console[methods[i]] = function(){};
        }
    }
    var SERVER="{{url("")}}/";
    var API_SERVER="{{url("")}}/v1/";
</script>

<script src="{{ url("") }}/sitio/js/sitio.min.js"></script>
<script src="{{url("")}}/vendor/jquery/moments/moment.js"></script>
<script>
    moment.locale('es');
</script>

<script type="text/javascript" src="{{url("")}}/sitio/js/library/bootstrap.min.js"></script>
<script src="{{ url("") }}/sitio/js/app.js"></script>
<script src="{{ url("") }}/js/api.js"></script>
<script src="{{ url("") }}/sitio/js/config.route.js"></script>

<script type="text/javascript" src="{{url("")}}/sitio/js/library/jquery.owl.carousel.js"></script>
<script type="text/javascript" src="{{url("")}}/sitio/js/library/jquery.appear.min.js"></script>
<script type="text/javascript" src="{{url("")}}/sitio/js/library/perfect-scrollbar.min.js"></script>
<script type="text/javascript" src="{{url("")}}/sitio/js/library/jquery.easing.min.js"></script>
<!--Start of Zopim Live Chat Script-->

<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-100125290-1', 'auto');
    ga('send', 'pageview');
</script>
<!--End of Tawk.to Script-->
<script src="{{ url("") }}/sitio/js/scripts.js"></script>
<!--End of Zopim Live Chat Script-->
</body>
</html>