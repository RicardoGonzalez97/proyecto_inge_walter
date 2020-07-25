'use strict';

/**
 * Configuración de las rutas
 */
app.run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider
                    .otherwise('/app/dashboard-v1');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'tpl/app.html'
                    })
                    .state('app.dashboard-v1', {
                        url: '/dashboard-v1',
                        templateUrl: 'tpl/app_dashboard_v1.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['js/controllers/chart.js']);
                                }]
                        }
                    })

                    .state('app.login', {
                        url: 'login',
                        template: '<div ui-view class="fade-in-up"></div>'
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
                    .state('app.revista', {
                        url: '/revista',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.revista.index', {
                        url: '/index',
                        templateUrl: 'tpl/revista/index.html',
                    })
                    .state('app.cursos', {
                        url: '/cursos',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.cvu', {
                        url: '/cvu',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.usuarios', {
                        url: '/usuarios',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })
                    .state('app.notaria',{
                        url: '/notaria',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })

                    //inicio Ruta Cursos
                   .state('app.cursos.usuario', {
                        url: '/user',
                        templateUrl: 'tpl/user/index.html',
                        controller: 'TypeUser',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "curso",
                                                files: ["js/controllers/course.js"]
                                            })

                                        })
                                }]
                      
                        }
                    })
                    


                    .state('app.cursos.lista', {
                        url: '/lista/:id',
                        templateUrl: 'tpl/course/listaAlumnos.html',
                        controller: 'Lista',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "curso",
                                                files: ["js/controllers/course.js"]
                                            })

                                        })
                                }]
                        }
                    })

                    .state('app.cursos.inscritos', {
                        url: '/inscritos/:id',
                        templateUrl: 'tpl/course/inscritos.html',
                        controller: 'Inscritos',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "curso",
                                                files: ["js/controllers/course.js"]
                                            })

                                        })
                                }]
                        }
                    })

                    .state('app.cursos.index', {
                        url: '/index',
                        templateUrl: 'tpl/course/index.html',
                        controller: 'Curso',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "curso",
                                                files: ["js/controllers/course.js"]
                                            })

                                        })
                                }]
                        }
                    })

                    .state('app.cursos.constancia', {
                        url: '/constancia',
                        templateUrl: '/public/files/constancia.png',
                        controller: 'Curso',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster','angularFileUpload']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "curso",
                                                files: ["js/controllers/course.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    .state('app.cursos.constancias', {
                        url: '/constancias/:id',
                        templateUrl: '/tpl/course/constancia.html',
                        controller: 'Constancia',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster','angularFileUpload']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "curso",
                                                files: ["js/controllers/course.js"]
                                            })

                                        })
                                }]
                        }
                    })
        
                    .state('app.cursos.addfiles', {
                        url: '/addfiles/:id',
                        templateUrl: 'tpl/course/addfiles.html',
                        controller: 'CursoFiles',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster','angularFileUpload']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "curso",
                                                files: ["js/controllers/course.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    .state('app.cursos.view', {
                        url: '/view',
                        templateUrl: 'tpl/course/view.html',
                        controller: 'view',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "curso",
                                                files: ["js/controllers/course.js"]
                                            })

                                        })
                                }]
                        }
                    })

                    .state('app.cursos.past', {
                        url: '/past',
                        templateUrl: 'tpl/course/past.html',
                        controller: 'past',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "curso",
                                                files: ["js/controllers/course.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    .state('app.cursos.inscripcion', {
                        url: '/inscripcion/:id',
                        controller: 'Inscripcion',
                        templateUrl: 'tpl/course/inscripcion.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "curso",
                                                files: ["js/controllers/course.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    .state('app.cursos.indexadd', {
                        url: '/cursoadd',
                        controller: 'AddCourse',
                        templateUrl: 'tpl/course/add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster','textAngular']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "curso",
                                                files: ["js/controllers/course.js"]
                                            })
                                        })
                                }]
                        }
                    })
                    .state('app.cursos.createcurso', {
                        url: '/create',
                        templateUrl: 'tpl/course/createcurso.html',
                        controller: 'Createcurso',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "curso",
                                                files: ["js/controllers/course.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    //FIn de Ruta Curso
                    //Inicio ruta Articulo
                    .state('app.revista.articulo', {
                        url: '/articulo',
                        controller: 'Articulo',
                        templateUrl: 'tpl/article/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "articulo",
                                                files: ["js/controllers/article.js"]
                                            })

                                        })
                                }]
                        }

                    })
                    .state('app.revista.articuloadd', {
                        url: '/articuloadd',
                        controller: 'Add',
                        templateUrl: 'tpl/article/add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "articulo",
                                        files: ["js/controllers/article.js"]
                                    })
                                }]
                        }
                    })
                    //Archivos del Articulo

                    .state('app.revista.addfiles', {
                        url: '/addfiles/:id',
                        templateUrl: 'tpl/article/addfiles.html',
                        controller: 'ArticuloFiles',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster','angularFileUpload']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "articulo",
                                                files: ["js/controllers/article.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    .state('app.revista.view', {
                        url: '/view/:id',
                        templateUrl: 'tpl/article/view.html',
                        controller: 'view',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "articulo",
                                                files: ["js/controllers/article.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    //Fin Ruta Articulo
                    //Inicio Ruta CategoriaCurso
                    .state('app.cursos.categoriacurso', {
                        url: '/categoriacurso',
                        controller: 'Categoriascursos',
                        templateUrl: 'tpl/categoryCourse/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "categoriacurso",
                                                files: ["js/controllers/categoryCourse.js"]
                                            })
                                        })
                                }]
                        }
                    })
                    .state('app.cursos.categoriacursoadd', {
                        url: '/categoriacursoadd',
                        controller: 'AddCategoryCourse',
                        templateUrl: 'tpl/categoryCourse/add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "categoriacurso",
                                        files: ["js/controllers/categoryCourse.js"]
                                    })
                                }]
                        }
                    })
                    //Fin Ruta Categoriacurso
                    //Inicio Ruta TipoCurso
                    .state('app.cursos.tipocurso', {
                        url: '/tipocurso',
                        controller: 'Tiposcursos',
                        templateUrl: 'tpl/typeCourse/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "tipocurso",
                                                files: ["js/controllers/typeCourse.js"]
                                            })
                                        })
                                }]
                        }
                    })
                    .state('app.cursos.tipocursoadd', {
                        url: '/tipocursoadd',
                        controller: 'AddtypeCourse',
                        templateUrl: 'tpl/typeCourse/add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "tipocurso",
                                        files: ["js/controllers/typeCourse.js"]
                                    })
                                }]
                        }
                    })
                    //Fin Ruta Tipocurso
                    //Inicio Ruta Notaria
                    .state('app.cursos.notari', {
                        url: '/notari',
                        controller: 'Notaris',
                        templateUrl: 'tpl/notaria/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "notari",
                                                files: ["js/controllers/notaria.js"]
                                            })
                                        })
                                }]
                        }
                    })
                    .state('app.cursos.notariadd', {
                        url: '/notariadd',
                        controller: 'Addnotarias',
                        templateUrl: 'tpl/notaria/add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "notari",
                                        files: ["js/controllers/notaria.js"]
                                    })
                                }]
                        }
                    })
                    //Fin Ruta Notaria
                    //Inicio Ruta Lineas de investigacion
                    .state('app.revista.lineainvestigacion', {
                        url: '/lineainvestigacion',
                        controller: 'Lineainvestigacion',
                        templateUrl: 'tpl/linesofInvestigation/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "lineainvestigacion",
                                                files: ["js/controllers/linesofInvestigation.js"]
                                            })
                                        })
                                }]
                        }
                    })
                    .state('app.revista.lineainvestigacionadd', {
                        url: '/lineainvestigacionadd',
                        controller: 'AddlinesofInvestigation',
                        templateUrl: 'tpl/linesofInvestigation/add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "lineainvestigacion",
                                                files: ["js/controllers/linesofInvestigation.js"]
                                            })

                                        })
                                }]
                        }

                    })
                    //Fin Ruta Linea De Investigacion
                    //Inicio Ruta Evaluar
                    .state('app.revista.evaluar', {
                        url: '/evaluar',
                        controller: 'Evaluar',
                        templateUrl: 'tpl/evaluators/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "evaluar",
                                                files: ["js/controllers/evaluators.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    //Articulos add files evaluadores
                    .state('app.revista.addfiless', {
                        url: '/addfiless/:id',
                        templateUrl: 'tpl/evaluators/addfiles.html',
                        controller: 'EvaluarFiles',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster','angularFileUpload']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "evaluar",
                                                files: ["js/controllers/evaluators.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    .state('app.revista.views', {
                        url: '/views/:id',
                        templateUrl: 'tpl/evaluators/view.html',
                        controller: 'view',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "evaluar",
                                                files: ["js/controllers/evaluators.js"]
                                            })

                                        })
                                }]
                        }
                    })

                    .state('app.revista.evaluaradd', {
                        url: '/evaluaradd',
                        controller: 'AddEvaluar',
                        templateUrl: 'tpl/evaluators/add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "evaluar",
                                        files: ["js/controllers/evaluators.js"]
                                    })
                                }]
                        }
                    })
                    //Fin Ruta Evaluar
                    //Inicio Ruta Evaluador
                    .state('app.revista.evaluador', {
                        url: '/evaluador',
                        controller: 'Evaluador',
                        templateUrl: 'tpl/evaluatorArticle/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "evaluador",
                                                files: ["js/controllers/evaluatorArticle.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    .state('app.revista.evaluadoradd', {
                        url: '/evaluadoradd',
                        controller: 'AddEvaluador',
                        templateUrl: 'tpl/evaluatorArticle/add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "evaluador",
                                        files: ["js/controllers/evaluatorArticle.js"]
                                    })
                                }]
                        }
                    })
                    //Fin Ruta Evaluador   
                        
                    //Inicio Ruta Convocatorias
                    .state('app.revista.convocatoria', {
                        url: '/convocatoria',
                        controller: 'Convocatoria',
                        templateUrl: 'tpl/convened/index.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "convocatoria",
                                                files: ["js/controllers/convened.js"]
                                            })
                                        })
                                }]
                        }
                    })
                    .state('app.revista.convocatoriaadd', {
                        url: '/convocatoriaadd',
                        controller: 'AddConvocatoria',
                        templateUrl: 'tpl/convened/add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "convocatoria",
                                        files: ["js/controllers/convened.js"]
                                    })
                                }]
                        }
                    })
                   //Archivos de convocatoria
                    .state('app.revista.addarchivo', {
                        url: '/addarchivo/:id',
                        templateUrl: 'tpl/convened/addfiles.html',
                        controller: 'ConvocatoriaFiles',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster','angularFileUpload']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "convocatoria",
                                                files: ["js/controllers/convened.js"]
                                            })

                                        })
                                }]
                        }
                    })

                    .state('app.revista.vista', {
                        url: '/vista/:id',
                        templateUrl: 'tpl/convened/view.html',
                        controller: 'view',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "convocatoria",
                                                files: ["js/controllers/convened.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    //Fin Ruta Convocatorias
                    //inicio Ruta Titulos
                    .state('app.cvu.titulo', {
                        url: '/titulo',
                        templateUrl: 'tpl/title/index.html',
                        controller: 'Titulo',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "titulo",
                                                files: ["js/controllers/title.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    .state('app.cvu.tituloadd', {
                        url: '/tituloadd',
                        controller: 'AddTitle',
                        templateUrl: 'tpl/title/add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "titulo",
                                        files: ["js/controllers/title.js"]
                                    })
                                }]
                        }
                    })
                    .state('app.titulos.addfiles', {
                        url: '/addfiles/:id',
                        templateUrl: 'tpl/cvu/addfiles.html',
                        controller: 'TituloFiles',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster','angularFileUpload']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "titulo",
                                                files: ["js/controllers/title.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    .state('app.titulos.view', {
                        url: '/view/:id',
                        templateUrl: 'tpl/cvu/view.html',
                        controller: 'view',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "titulo",
                                                files: ["js/controllers/title.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    //FIn de Ruta Curso
                    //inicio Ruta Premio
                    .state('app.cvu.premio', {
                        url: '/premio',
                        templateUrl: 'tpl/award/index.html',
                        controller: 'Premio',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "premio",
                                                files: ["js/controllers/award.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    .state('app.cvu.premioadd', {
                        url: '/premioadd',
                        controller: 'AddAward',
                        templateUrl: 'tpl/award/add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "premio",
                                        files: ["js/controllers/award.js"]
                                    })
                                }]
                        }
                    })

                    .state('app.permisos.addfiles', {
                        url: '/addfiles/:id',
                        templateUrl: 'tpl/cvu/addfiles.html',
                        controller: 'PermisoFiles',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster','angularFileUpload']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "permiso",
                                                files: ["js/controllers/award.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    .state('app.permisos.view', {
                        url: '/view/:id',
                        templateUrl: 'tpl/cvu/view.html',
                        controller: 'view',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "permiso",
                                                files: ["js/controllers/award.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    //FIn de Ruta Premios
                    //inicio Ruta Certificacion
                    .state('app.cvu.certificacion', {
                        url: '/certificacion',
                        templateUrl: 'tpl/certification/index.html',
                        controller: 'Certificacion',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('toaster').then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "certificacion",
                                                files: ["js/controllers/certification.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    .state('app.cvu.certificacionadd', {
                        url: '/certificacionadd',
                        controller: 'AddCertification',
                        templateUrl: 'tpl/certification/add.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        name: "certificacion",
                                        files: ["js/controllers/certification.js"]
                                    })
                                }]
                        }
                    })
                    .state('app.certificaciones.addfiles', {
                        url: '/addfiles/:id',
                        templateUrl: 'tpl/cvu/addfiles.html',
                        controller: 'CertificacionFiles',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster','angularFileUpload']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "certificacion",
                                                files: ["js/controllers/certification.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    .state('app.certificaciones.view', {
                        url: '/view/:id',
                        templateUrl: 'tpl/cvu/view.html',
                        controller: 'view',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(['toaster']).then(
                                        function () {
                                            return $ocLazyLoad.load({
                                                name: "certificacion",
                                                files: ["js/controllers/certification.js"]
                                            })

                                        })
                                }]
                        }
                    })
                    //FIn de Ruta Certificacion

                    .state('app.form', {
                        url: '/form',
                        template: '<div ui-view class="fade-in"></div>',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load('js/controllers/form.js');
                                }]
                        }
                    })
                    .state('app.form.elements', {
                        url: '/elements',
                        templateUrl: 'tpl/form_elements.html'
                    })
                    .state('app.form.validation', {
                        url: '/validation',
                        templateUrl: 'tpl/form_validation.html'
                    })
                    .state('app.form.wizard', {
                        url: '/wizard',
                        templateUrl: 'tpl/form_wizard.html'
                    })
                    .state('app.form.fileupload', {
                        url: '/fileupload',
                        templateUrl: 'tpl/form_fileupload.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('angularFileUpload').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/file-upload.js');
                                        }
                                    );
                                }]
                        }
                    })
                    .state('app.form.imagecrop', {
                        url: '/imagecrop',
                        templateUrl: 'tpl/form_imagecrop.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('ngImgCrop').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/imgcrop.js');
                                        }
                                    );
                                }]
                        }
                    })
                    .state('app.form.select', {
                        url: '/select',
                        templateUrl: 'tpl/form_select.html',
                        controller: 'SelectCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('ui.select').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/select.js');
                                        }
                                    );
                                }]
                        }
                    })
                    .state('app.form.slider', {
                        url: '/slider',
                        templateUrl: 'tpl/form_slider.html',
                        controller: 'SliderCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('vr.directives.slider').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/slider.js');
                                        }
                                    );
                                }]
                        }
                    })
                    .state('app.form.editor', {
                        url: '/editor',
                        templateUrl: 'tpl/form_editor.html',
                        controller: 'EditorCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load('textAngular').then(
                                        function () {
                                            return $ocLazyLoad.load('js/controllers/editor.js');
                                        }
                                    );
                                }]
                        }
                    })
                    // pages
                    .state('app.page', {
                        url: '/page',
                        template: '<div ui-view class="fade-in-down"></div>'
                    })
                    .state('app.page.profile', {
                        url: '/profile',
                        templateUrl: 'tpl/page_profile.html'
                    })
                    .state('app.page.post', {
                        url: '/post',
                        templateUrl: 'tpl/page_post.html'
                    })
                    .state('app.page.search', {
                        url: '/search',
                        templateUrl: 'tpl/page_search.html'
                    })
                    .state('app.page.invoice', {
                        url: '/invoice',
                        templateUrl: 'tpl/page_invoice.html'
                    })
                    .state('app.page.price', {
                        url: '/price',
                        templateUrl: 'tpl/page_price.html'
                    })
                    .state('app.docs', {
                        url: '/docs',
                        templateUrl: 'tpl/docs.html'
                    })
                    // others
                    .state('lockme', {
                        url: '/lockme',
                        templateUrl: 'tpl/page_lockme.html'
                    })
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                    .state('access.signin', {
                        url: '/signin',
                        templateUrl: 'tpl/page_signin.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/signin.js']);
                                }]
                        }
                    })
                    .state('access.signup', {
                        url: '/signup',
                        templateUrl: 'tpl/page_signup.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/signup.js']);
                                }]
                        }
                    })
                    .state('access.forgotpwd', {
                        url: '/forgotpwd',
                        templateUrl: 'tpl/page_forgotpwd.html'
                    })
                    .state('access.404', {
                        url: '/404',
                        templateUrl: 'tpl/page_404.html'
                    })

                    // fullCalendar
                    .state('app.calendar', {
                        url: '/calendar',
                        templateUrl: 'tpl/app_calendar.html',
                        // use resolve to load other dependences
                        resolve: {
                            deps: ['$ocLazyLoad', 'uiLoad',
                                function ($ocLazyLoad, uiLoad) {
                                    return uiLoad.load(
                                        ['vendor/jquery/fullcalendar/fullcalendar.css',
                                            'vendor/jquery/fullcalendar/theme.css',
                                            'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                                            'vendor/libs/moment.min.js',
                                            'vendor/jquery/fullcalendar/fullcalendar.min.js',
                                            'js/app/calendar/calendar.js']
                                    ).then(
                                        function () {
                                            return $ocLazyLoad.load('ui.calendar');
                                        }
                                    )
                                }]
                        }
                    })

                    // mail
                    .state('app.mail', {
                        abstract: true,
                        url: '/mail',
                        templateUrl: 'tpl/mail.html',
                        // use resolve to load other dependences
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/app/mail/mail.js',
                                        'js/app/mail/mail-service.js',
                                        'vendor/libs/moment.min.js']);
                                }]
                        }
                    })
                    .state('app.mail.list', {
                        url: '/inbox/{fold}',
                        templateUrl: 'tpl/mail.list.html'
                    })
                    .state('app.mail.detail', {
                        url: '/{mailId:[0-9]{1,4}}',
                        templateUrl: 'tpl/mail.detail.html'
                    })
                    .state('app.mail.compose', {
                        url: '/compose',
                        templateUrl: 'tpl/mail.new.html'
                    })

                    .state('layout', {
                        abstract: true,
                        url: '/layout',
                        templateUrl: 'tpl/layout.html'
                    })
                    .state('layout.fullwidth', {
                        url: '/fullwidth',
                        views: {
                            '': {
                                templateUrl: 'tpl/layout_fullwidth.html'
                            },
                            'footer': {
                                templateUrl: 'tpl/layout_footer_fullwidth.html'
                            }
                        },
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/vectormap.js']);
                                }]
                        }
                    })
                    .state('layout.mobile', {
                        url: '/mobile',
                        views: {
                            '': {
                                templateUrl: 'tpl/layout_mobile.html'
                            },
                            'footer': {
                                templateUrl: 'tpl/layout_footer_mobile.html'
                            }
                        }
                    })
                    .state('layout.app', {
                        url: '/app',
                        views: {
                            '': {
                                templateUrl: 'tpl/layout_app.html'
                            },
                            'footer': {
                                templateUrl: 'tpl/layout_footer_fullwidth.html'
                            }
                        },
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/controllers/tab.js']);
                                }]
                        }
                    })
                    .state('apps', {
                        abstract: true,
                        url: '/apps',
                        templateUrl: 'tpl/layout.html'
                    })
                    .state('apps.note', {
                        url: '/note',
                        templateUrl: 'tpl/apps_note.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/app/note/note.js',
                                        'vendor/libs/moment.min.js']);
                                }]
                        }
                    })
                    .state('apps.contact', {
                        url: '/contact',
                        templateUrl: 'tpl/apps_contact.html',
                        resolve: {
                            deps: ['uiLoad',
                                function (uiLoad) {
                                    return uiLoad.load(['js/app/contact/contact.js']);
                                }]
                        }
                    })
                    .state('app.weather', {
                        url: '/weather',
                        templateUrl: 'tpl/apps_weather.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load(
                                        {
                                            name: 'angular-skycons',
                                            files: ['js/app/weather/skycons.js',
                                                'vendor/libs/moment.min.js',
                                                'js/app/weather/angular-skycons.js',
                                                'js/app/weather/ctrl.js']
                                        }
                                    );
                                }]
                        }
                    })
                    .state('music', {
                        url: '/music',
                        templateUrl: 'tpl/music.html',
                        controller: 'MusicCtrl',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        'com.2fdevs.videogular',
                                        'com.2fdevs.videogular.plugins.controls',
                                        'com.2fdevs.videogular.plugins.overlayplay',
                                        'com.2fdevs.videogular.plugins.poster',
                                        'com.2fdevs.videogular.plugins.buffering',
                                        'js/app/music/ctrl.js',
                                        'js/app/music/theme.css'
                                    ]);
                                }]
                        }
                    })
                    .state('music.home', {
                        url: '/home',
                        templateUrl: 'tpl/music.home.html'
                    })
                    .state('music.genres', {
                        url: '/genres',
                        templateUrl: 'tpl/music.genres.html'
                    })
                    .state('music.detail', {
                        url: '/detail',
                        templateUrl: 'tpl/music.detail.html'
                    })
                    .state('music.mtv', {
                        url: '/mtv',
                        templateUrl: 'tpl/music.mtv.html'
                    })
                    .state('music.mtvdetail', {
                        url: '/mtvdetail',
                        templateUrl: 'tpl/music.mtv.detail.html'
                    })
                    .state('music.playlist', {
                        url: '/playlist/{fold}',
                        templateUrl: 'tpl/music.playlist.html'
                    })
            }
        ]
    );