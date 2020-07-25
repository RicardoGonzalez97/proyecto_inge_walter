<!DOCTYPE html>
<html lang="en" data-ng-app="app">
<head>
    <meta charset="utf-8"/>
    <link rel="icon" type="image/png" href="/img/logoiq.png" />
    <title>Grupo de Investigación Científica y Desarrollo Tecnológico, A.C.</title>
    <meta name="description" content="GICDT, grupo de investigación científica y desarrollo tecnológico, conformado por personas emprendedoras y comprometidas, que satisface las necesidades de la sociedad, aplicando los conocimientos sobre tecnología e investigación en la solución de problemáticas y necesidades de investigadores, autores y estudiantes de posgrado, a fin de impulsar la divulgación de la información, por medio de 4 servicios ofertados en una plataforma web que maneja tecnología de vanguardia."/>
    <meta http-equiv="Pragma" content="no-cache" >
    <meta http-equiv="expires" content="-1" >
    <meta name="keywords" content=" Publicación de artículos,PLATAFORMAIQ,GICDT,gicdt.org,gicdt,el grupo de investigacion,cursos,chiapas,cursos ittg,ittg,grupo de investigación científica y desarrollo tecnológico" />
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
    <meta name="twitter:title" content="GICDT | El conocimiento en un click" />
    <meta name="twitter:description" content="GICDT, grupo de investigación científica y desarrollo tecnológico, conformado por personas emprendedoras y comprometidas, que satisface las necesidades de la sociedad, aplicando los conocimientos sobre tecnología e investigación en la solución de problemáticas y necesidades de investigadores, autores y estudiantes de posgrado, a fin de impulsar la divulgación de la información, por medio de 4 servicios ofertados en una plataforma web que maneja tecnología de vanguardia."/>
    <meta name="twitter:image" content="/baner.png" />

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <link rel="stylesheet" href="{{url("")}}/css/bootstrap.css" type="text/css" />
    <link rel="stylesheet" href="{{url("")}}/css/animate.css" type="text/css" />
    <link rel="stylesheet" href="{{url("")}}/css/font-awesome.min.css" type="text/css" />
    <link rel="stylesheet" href="{{url("")}}/css/simple-line-icons.css" type="text/css" />
    <link rel="stylesheet" href="{{url("")}}/css/font.css" type="text/css" />
    <link rel="stylesheet" href="{{url("")}}/css/app.css" type="text/css" />
    <link rel="stylesheet" href="{{url("")}}//vendor/angular/toaster/toaster.css" type="text/css" />



</head>
<body ng-controller="AppCtrl">
<div class="app" id="app" ng-class="{'app-header-fixed':app.settings.headerFixed, 'app-aside-fixed':app.settings.asideFixed, 'app-aside-folded':app.settings.asideFolded, 'app-aside-dock':app.settings.asideDock, 'container':app.settings.container}" ui-view></div>
<script src="https://maps.google.com/maps/api/js?key=AIzaSyCR46MmlilO38MUSdSAkMPyeCaUyQv4-Oo"></script>
<script>
    var DEBUG = true;
    if(!DEBUG){
        if(!window.console) window.console = {};
        var methods = ["log", "debug", "warn", "info"];
        for(var i=0;i<methods.length;i++){
            console[methods[i]] = function(){};
        }
    }

    var API_SERVER="{{url("")}}/v1/";
    var SERVER="{{url("")}}/";
</script>
<script src="{{url("")}}/js/gicdt.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angularjs-toaster/1.1.0/toaster.min.js"></script>

<script src="{{url("")}}/vendor/jquery/moments/moment.js"></script>
<script>
    moment.locale('es');
</script>
<script src="{{url("")}}/js/app.js"></script>
<script src="{{url("")}}/js/api.js"></script>
<script src="{{url("")}}/js/config.js"></script>
<script src="{{url("")}}/js/config.lazyload.js"></script>
<script src="{{url("")}}/js/config.router.js"></script>
<script src="{{url("")}}/js/main.js"></script>
<script src="{{url("")}}/js/controllers/bootstrap.js"></script>
<script src="{{url("")}}/js/directives.min.js"></script>


<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-100125290-1', 'auto');
    ga('send', 'pageview');

</script>
<!--End of Zopim Live Chat Script-->
</body>
</html>