app.controller('tramiteCtrl', [tramiteController])

function tramiteController() {
    vm = this
    vm.propietario = true

    vm.mostrarContenido = function(valor) {
        vm = this;
        vm.inicioservicio = false;
        //
        vm.propietario = false;
        vm.asignacion = false;
        vm.empadronamiento = false;
        vm.levantamiento = false;
        vm.revision = false;
        vm.certificado = false;
        vm.relotificacion = false;
        vm.datos = false;
        vm.alta = false;
        vm.ubicacion = false;
        vm.fusion = false;
        vm.ratificacion = false;
        vm.modificacion = false;

        switch (valor) {
            case '0':
                vm.propietario = true;
                break;
            case '1':
                vm.asignacion = true;
                break;
            case '2':
                vm.empadronamiento = true
                break
            case '3':
                vm.levantamiento = true;
                break;
            case '4':
                vm.revision = true;
                break;
            case '5':
                vm.certificado = true;
                break;
            case '6':
                vm.relotificacion = true;
                break;
            case '7':
                vm.datos = true;
                break;
            case '8':
                vm.alta = true;
                break;
            case '9':
                vm.ubicacion = true;
                break;
            case '10':
                vm.fusion = true;
                break;
            case '11':
                vm.ratificacion = true;
                break;
            case '12':
                vm.modificacion = true;
                break;
        }
        if (vm.isMobile()) {
            vm.moverScroll()
        }
        if (vm.isMobile()) {
            vm.moverScroll()
        }
    }

    vm.moverScroll = function() {
        var element = document.getElementById('contenidotramite')
        element.scrollIntoView()
    }

    vm.isMobile = function() {
        return (
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Opera Mini/i) ||
            navigator.userAgent.match(/IEMobile/i)
        )
    }
}