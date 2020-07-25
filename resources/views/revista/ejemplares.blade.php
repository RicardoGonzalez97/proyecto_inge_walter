@extends('app')
@section('container')
    <section class="slide" style="background-image: url({{url('sitio')}}/images/homeslider/bg.jpg)">
        <div class="container">
            <div class="slide-cn" id="slide-home">
                <!-- SLIDE ITEM -->
                <div class="slide-item">
                    <div class="item-inner">
                        <div class="text">
                            <h2>IQ160</h2>
                            <p class="text-justify">Plataforma web de Investigación Científica y Desarrollo
                                Tecnológico Digital
                            </p>
                            <div class="group">
                                <a href="#" class="mc-btn btn-style-1">Ver Más</a>
                            </div>
                        </div>

                        <div class="img">
                            <img src="{{url('sitio')}}/images/homeslider/img-thumb.png" alt="">
                        </div>
                    </div>

                </div>
                <!-- SLIDE ITEM -->

                <!-- SLIDE ITEM -->
                <div class="slide-item">
                    <div class="item-inner">
                        <div class="text">
                            <h2>IQ160</h2>
                            <p class="text-justify">La empresa “IQ160 S.A. de C.V.”
                                <br>innova con la plataforma que integra<br> cuatro servicios en un solo lugar.
                            </p>
                            <div class="group">
                                <a href="#" class="mc-btn btn-style-1">Ver Más</a>
                            </div>
                        </div>

                        <div class="img">
                            <img src="{{url('sitio')}}/images/homeslider/img-thumb.png" alt="">
                        </div>

                    </div>
                </div>
                <!-- SLIDE ITEM -->

            </div>
        </div>
    </section>

    <section id="mc-section-1" class="mc-section-1 section">
        <div class="container">
            <div class="row">

                <div class="col-lg-5">
                    <div class="mc-section-1-content-1">
                        <h2 class="big">Ejemplares publicados, por volumen.</h2>
                        <ul>
                            <li><a href="#">Ejemplar 1</a></li>
                            <li><a href="#">Ejemplar 2</a></li>
                            <li><a href="#">Ejemplar 3</a></li>

                        </ul>

                    </div>
                </div>

                <div class="col-md-6 col-lg-offset-1">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="featured-item">
                                <i class="icon icon-featured-1"></i>
                                <h4 class="title-box text-uppercase">Premium</h4>
                                <p class="text-justify">
                                    El servicio premium de la revista científica-tecnológica digital, además de la publicación del artículo dentro de la revista contiene:
                                    •	Ayuda en la selección de la Línea de Investigación.
                                    •	Revisión de especialistas en su área para comentarios y aprobación posterior por el Jefe Editor de la revista.
                                    •	Corrector de estilo para la ortografía y el estilo formal.
                                    •	Conversión y creación (preparación para diversos productos como HTML y PDF).
                                </p>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="featured-item">
                                <i class="icon icon-featured-2"></i>
                                <h4 class="title-box text-uppercase">Standard</h4>
                                <p class="text-justify">
                                    El servicio standard de la revista científica-tecnológica digital, además de la publicación del artículo dentro de la revista contiene:
                                    •	Documento con la información clara de los lineamientos para la aceptación de un artículo y su publicación dentro de la revista.
                                    •	Invitación a la participación de ponencias y congresos organizada por la empresa.

                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>


@endsection
@section('style')
@endsection
@section('js')
    <script type="text/javascript" src="{{url('sitio')}}/js/scripts.js"></script>
@endsection