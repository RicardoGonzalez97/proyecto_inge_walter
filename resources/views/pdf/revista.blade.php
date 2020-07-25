<style>
    .certificado {

    }

    .logos {
        width: 22%;
        display: inline-block;
    }

    .titulo {
        width: 55%;
        display: inline-block;
    }

    .titulo-h2 {
        font-size: 23px;
        font-weight: bold;
        text-align: center;
        line-height: 22px;
    }

    .logos > img {
        width: 249px;
        height: 130px;
    }

    .gicdt {
        width: 22%;
        display: inline-block;

    }

    .gicdt > img {
        margin-top: 20px;
        width: 95%;
    }

    .text-center {
        text-align: center;
    }

    h2 {
        font-size: 23px;
        line-height: 12px;
    }

    h1 {
        line-height: 2px;
        font-size: 70px;
    }

    .footer {
        width: 33%;
        display: inline-block;
    }

    .footer-2 {
        width: 40%;
        display: inline-block;
    }

    .col-lg-2 {
        width: 26%;
        display: inline-block;
    }

    .col-lg-6 {
        width: 48%;
        display: inline-block;
    }

    .col-lg-8 {
        width: 48% !important;
        display: inline-block !important;
    }

    .footer-3 {
        width: 24%;
        display: inline-block;
    }

    .linea {
        border-top: 2px solid;
    }

    .linea-bottom {
        border-bottom: 2px solid;
    }

    .margin-top {
        margin-top: 120px !important;
    }

    .absolute {
        position: absolute;
        width: 100%;
    }

    .text-right {
        text-align: right;
    }

    .text-dark {
        color: #000 !important;
    }


</style>

<div class="certificado" style="">
    <div class="gicdt">
        <img src="{{url("")}}/logo_gicdt.jpg" alt="">
    </div>

    <div class="titulo">
        <h2 class="titulo-h2">
            El Grupo de Investigación Científica y Desarrollo Tecnológico A.C. <br> En colaboración con IQ160
        </h2>
    </div>
    <div class="logos">
        <img src="{{url("")}}/logo.png" alt="">
    </div>
    <div class="">
        <h2 class="text-center">
            Otorga la siguiente
        </h2>
    </div>
    <div class="">
        <h1 class="text-center">
            <i>Constancia</i>
        </h1>
    </div>

    <div class="col-lg-2">
        <h2 class="text-right">A:</h2>
    </div>
    <div class="col-lg-6">
        <h2 class="text-center linea-bottom">
            {{$name}}
        </h2>
    </div>
    <div class="col-lg-2">

    </div>
    <h2 class="text-center">
        Por demostrar un compromiso en su formación al asistir al curso<a href="{{url('course?'.$course)}}"
                                                                          class="text-dark">"<u>{{$course}}</u>"</a>.
    </h2>
    <br>
    <div class="footer text-center">
        <br> <br> <br>
        <h4 class="linea text-center"><strong>Ing. Walter Torres Robledo</strong></h4>
        <p class="text-center">Presidente del Grupo de Investigación Científica y Desarrollo Tecnológico A.C. </p>
    </div>
    <div class="footer-2 ">
        <p class="text-center margin-top">Tuxtla Gutiérrez, Chiapas, México, A {{date('d')}} de {{date('m')}}
            de {{date('Y')}}</p>
    </div>
    <div class="footer-3 text-center">
        <img src="data:image/png;base64, {{ base64_encode(\QrCode::format('png')->encoding('UTF-8')->size(180)->color(00,150,136)->margin(1)->generate(url("v1/Course/getConstancia/".$key))) }}"
             alt="">
    </div>

</div>


