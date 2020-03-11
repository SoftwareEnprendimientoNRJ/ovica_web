app.config(function($routeProvider) {
    //configuración y definición de las rutas
    $routeProvider
        .when('/', {
            templateUrl: 'home.html'
        })
        .when("/servicios", {
            templateUrl: 'servicio.html',
            controller: 'servicioCtrl as vm'
        })
        .when("/tramites", {
            templateUrl: 'tramite.html',
            controller: 'tramiteCtrl as vm'
        })
        .when("/contacto", {
            templateUrl: 'contacto.html',
            controller: 'contactoCtrl as vm'
        })
        .otherwise({
            redirectTo: '/'
        });
});