<style>
    #watermark {
        position: relative;
        top: 0px;
        right: 0px;
        width: 100%;
    }
    /* latin-ext */
    @font-face {
        font-family: 'Lato';
        font-style: italic;
        font-weight: 100;
        src: local('Lato Hairline Italic'), local('Lato-HairlineItalic'), url(https://fonts.gstatic.com/s/lato/v11/muRcAtdNYlnTj3NeuakxChkAz4rYn47Zy2rvigWQf6w.woff2) format('woff2');
        unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
    }

    /* latin */
    @font-face {
        font-family: 'Lato';
        font-style: italic;
        font-weight: 100;
        src: local('Lato Hairline Italic'), local('Lato-HairlineItalic'), url(https://fonts.gstatic.com/s/lato/v11/9TBVFLzQ3GUZLG8FZ4yrEXYhjbSpvc47ee6xR_80Hnw.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
    }

    body {
        font-family: Lato, sans-serif;
    }

    .certificado {
        position: relative;

    }

    .color-green {
        color: rgb(26, 213, 195) !important;
    }

    .logos {
        width: 22%;
        display: inline-block;
    }

    .titulo {
        width: 70%;
        font-family: 'sans-serif';
    }

    .titulo-h2 {
        font-size: 23px;
        text-align: center;
        line-height: 13px;
    }

    .titulo-h2-iq {
        font-size: 39px;
        text-align: center;
        line-height: 13px;
        font-style: italic;

    }

    .no-bold {
        font-weight: normal !important;
        font-size: 20px !important;
    }

    .logos > img {
        width: 325px;
        height: 180px;
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
        /*
        line-height: 12px;*/
    }

    h1 {
        line-height: 2px;
        font-size: 70px;
    }

    .constancia {
        font-size: 45px !important;
    }


    .lugar {
        font-size: 20px !important;
    }
    .footer {
        width: 40%;
        display: inline-block;
    }

    .footer-2 {
        width: 100%;
        display: inline-block;
    }
    .footer-3 {
        width: 200%;
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
        position: absolute !important;
        width: 100%;
    }

    .text-right {
        text-align: right;
    }

    .text-dark {
        color: #000;
    }

    .text-white {
        color: blue !important;
    }

    .text-center {
        text-align: center !important;
    }


</style>
<body>
<div class="certificado">

    <div class="titulo">
        <h2 class="titulo-h2 text-white text-center">
            GRUPO DE INNOVACIÓN E INVESTIGACIÓN
            TECNOLÓGICA <br><br>SA DE CV
        </h2>
    </div>
    <div class="titulo">
        <h2 class=" titulo-h2-iq  text-white text-center"><i>"GIIT"</i></h2>
    </div>
    <div class="">
        <h2 class="text-center">
            Otorga la presente
        </h2>
    </div>
    <div class="">
        <h1 class="text-center constancia">
            CONSTANCIA
        </h1>
    </div>
    <div>

        <h2 class="text-center">
            A: <u>
                {{$curso->author->nombre}}
            </u>
        </h2>
    </div>
    <h2 class="text-center no-bold">
        Por su destacada participación, al haber asistido como ponente en el curso denominado <br>"{{$curso->curso}} con
        duración de: {{$curso->duracion}}
    </h2>
    <p class="text-center lugar">
        <i style="color:black"> Tuxtla Gutiérrez, Chiapas. <br>
            {{$curso->fecha}}</i>
    </p>
    <table class="absolute">
        <tr style="height: 120px">
            <td class="text-center">
                <h4 class=" text-center color-green"><strong><u>Ing. Habibeth Mimiaga Castaneyra</u></strong></h4><br>
                <p class="text-center">Presidenta del Grupo de Innovación e <br>Investigación Tecnológica SA de CV</p>
            </td>
            <td class="text-center">
                <img src="data:image/png;base64, {{ base64_encode(\QrCode::format('png')->encoding('UTF-8')->size(150)->margin(1)->generate(url("/v1/Course/getConstancia/".$key))) }}"
                     alt="">
            </td>
        </tr>
    </table>
</div>
</body>