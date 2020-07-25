/**
 * Created by T4B on 5/21/16.
 */
'use strict';
app
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider
                    .otherwise('/applogininiciar');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: "/sitio/views/app.html",
                        controller: 'MasterController',

                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {

                                    return $ocLazyLoad.load({
                                        name: "Inicio",
                                        files: ["/sitio/js/inicio.js"]
                                    })

                                }]
                        }
                    })
                    .state('app.recovery', {
                            url: "/recovery/:token",
                            templateUrl: '/sitio/views/login/recovery.html',
                            controller: "recoveryPassword",
                            resolve: {
                                deps: ['$ocLazyLoad',
                                    function ($ocLazyLoad) {
                                        return $ocLazyLoad.load({
                                            name: "Acceso",
                                            files: ["/sitio/js/login/Acceso.js"]
                                        })

                                    }]
                            }


                        }
                    )
                    .state('app.inicio', {
                        url: '/cursos/view',
                        templateUrl: '/sitio/views/inicio.html',
                        controller: 'inicio',

                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "Inicio",
                                        files: ["/sitio/js/inicio.js"]
                                    })

                                }]
                        }

                    })
                    .state('app.ayuda', {
                        url: '/ayuda',
                        templateUrl: "/sitio/views/enlaces_rapidos/ayuda/ayuda.html",
                        controller: 'Ayuda',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "ayuda",
                                        files: ["/sitio/js/enlaces_rapidos/ayuda/ayuda.js"]
                                    })

                                }]
                        }
                    })
                    .state('app.quienes', {
                        url: '/nosotros',
                        templateUrl: "/sitio/views/enlaces_rapidos/quienes_somos/quienes.html",
                        controller: 'Quienes',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "quienes",
                                        files: ["/sitio/js/enlaces_rapidos/quienes_somos/quienes.js"]
                                    })

                                }]
                        }
                    })
                    .state('app.preguntas', {
                        url: '/preguntas_frecuentes',
                        templateUrl: "/sitio/views/enlaces_rapidos/preguntas_frecuentes/preguntas.html",
                        controller: 'Preguntas',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "preguntas",
                                        files: ["/sitio/js/enlaces_rapidos/preguntas_frecuentes/preguntas.js"]
                                    })

                                }]
                        }
                    })
                    .state('app.terminos', {
                        url: '/terminos_y_condiciones',
                        templateUrl: "/sitio/views/enlaces_rapidos/terminos_y_condiciones/terminos.html",
                        controller: 'Terminos',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "terminos",
                                        files: ["/sitio/js/enlaces_rapidos/terminos_y_condiciones/terminos.js"]
                                    })

                                }]
                        }
                    })
                    .state('app.contacto', {
                        url: '/contacto',
                        templateUrl: "/sitio/views/enlaces_rapidos/contacto/contacto.html",
                        controller: 'Contacto',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "contacto",
                                        files: ["/sitio/js/enlaces_rapidos/contacto/contacto.js"]
                                    })

                                }]
                        }
                    })
                    .state('app.conferencias', {
                        url: '/conferencias',
                        templateUrl: "/sitio/views/conferencias/conferencias.html",
                        controller: 'Conferencias',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "conferencias",
                                        files: ["/sitio/js/conferencias/conferencias.js"]
                                    })

                                }]
                        }
                    })
                    .state('app.revista', {
                        url: '/revista',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.revista.info', {
                        url: '/info',
                        templateUrl: "/sitio/views/revista/add.html",
                        controller: 'Evaluadores',

                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "revista",
                                        files: ["/sitio/js/revista/revista.js"]
                                    })

                                }]
                        }
                    })
                    .state('app.revista.all', {
                        url: '/all',
                        templateUrl: "/sitio/views/revista/all.html",
                        controller: 'Evaluadores',

                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {

                                    return $ocLazyLoad.load({
                                        name: "revista",
                                        files: ["/sitio/js/revista/revista.js"]
                                    })

                                }]
                        }
                    })
                    .state('app.revista.instrucciones', {
                        url: '/instrucciones',
                        templateUrl: "/sitio/views/revista/instrucciones.html",
                        controller: 'Revista',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {

                                    return $ocLazyLoad.load({
                                        name: "revista",
                                        files: ["/sitio/js/revista/revista.js"]
                                    })

                                }]
                        }
                    })
                    .state('app.revista.consejo', {
                        url: '/consejo',
                        templateUrl: "/sitio/views/revista/consejo.html"
                    })
                    .state('app.revista.comite', {
                        url: '/comite',
                        templateUrl: "/sitio/views/revista/comite.html",
                        controller: 'Evaluadores',

                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {

                                    return $ocLazyLoad.load({
                                        name: "revista",
                                        files: ["/sitio/js/revista/revista.js"]
                                    })

                                }]
                        }
                    })

                    .state('app.cursos', {
                        url: '/cursos',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })

                    .state('app.cursos.info', {
                        url: '/info',
                        templateUrl: "/sitio/views/cursos/informacion.html",
                        controller: 'Cursos',

                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "curso",
                                        files: ["/sitio/js/cursos/course.js"]
                                    })

                                }]
                        }
                    })
                    .state('app.cursos.indexadd', {
                        url: '/cursoadd',
                        templateUrl: '/sitio/views/cursos/add.html',
                        controller: 'AddCourse',
                        /*resolve: {
                         deps: ['$ocLazyLoad',
                         function ($ocLazyLoad) {
                         return $ocLazyLoad.load(['toaster','textAngular']).then(
                         function () {
                         return $ocLazyLoad.load({
                         name: "curso",
                         files: ["/sitio/js/cursos/course.js"]
                         })

                         })
                         }]
                         }*/
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "curso",
                                        files: ["/sitio/js/cursos/course.js"]
                                    })

                                }]
                        }
                    })

                    .state('app.congresos', {
                        url: '/congresos',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })

                    .state('app.congresos.info', {
                        url: '/info',
                        templateUrl: "/sitio/views/congreso/info.html",
                        controller: 'Congresos',

                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "congresos",
                                        files: ["/sitio/js/congreso/congreso.js"]
                                    })

                                }]
                        }
                    })
                    .state('app.congresos.contacto', {
                        url: '/contacto',
                        templateUrl: "/sitio/views/contacto/contacto.html",
                        controller: 'Contacto',

                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "contacto",
                                        files: ["/sitio/js/contacto/contacto.js"]
                                    })

                                }]
                        }
                    })
                    .state('app.cvu', {
                        url: '/cvu',
                        templateUrl: "/sitio/views/cvu/cvu.html",
                        controller: 'Cvu',

                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "cvu",
                                        files: ["/sitio/js/cvu/cvu.js"]
                                    })

                                }]
                        }
                    })
                    .state('app.login', {
                        url: 'login',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.login.iniciar', {
                        url: 'iniciar',
                        templateUrl: "/sitio/views/login/iniciar.html",
                        controller: 'login',

                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "Acceso",
                                        files: ["/sitio/js/login/Acceso.js"]
                                    })

                                }]
                        }
                    })

                    .state('app.login.registro', {
                        url: 'registro',
                        templateUrl: "/sitio/views/login/registro.html",
                        controller: 'Registro',

                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "Acceso",
                                        files: ["/sitio/js/login/Acceso.js"]
                                    })

                                }]
                        }
                    })

                    .state('app.login.mostrar', {
                        url: 'mostrar',
                        templateUrl: "/tpl/user/index.html",
                        controller: 'Mostrar',

                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "Acceso",
                                        files: ["/sitio/js/login/Acceso.js"]
                                    })

                                }]
                        }
                    })
                    .state('app.login.recuperar', {
                        url: 'recuperar',
                        templateUrl: "/sitio/views/login/recuperar.html",
                        controller: 'recovery',

                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "Recuperar",
                                        files: ["/sitio/js/login/Recuperar.js"]
                                    })
                                }]
                        }
                    })
            }
        ]
    );