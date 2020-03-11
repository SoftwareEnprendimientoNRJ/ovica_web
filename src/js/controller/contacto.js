app.controller('contactoCtrl', [
    '$http',
    contactoController
])

function contactoController($http) {
    vm = this

    vm.nombrecontactovalido = false
    vm.correocontactovalido = false
    vm.mensajecontactovalido = false

    vm.isMobile = function() {
        return (
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/BlackBerry/i)
        )
    }

    vm.validarFormularioContactoOnblur = function(campo) {
        vm = this
        uno = dos = tres = true;
        switch (campo) {
            case 1:
                uno = expresiones.letrasConEspacio(vm.nombrecontacto)
                vm.nombrecontactovalido = !uno
                break
            case 2:
                dos = expresiones.mail(vm.correocontacto)
                vm.correocontactovalido = !dos
                break
            case 3:
                tres = expresiones.requerido(vm.mensajecontacto)
                vm.mensajecontactovalido = !tres
                break
        }
    }

    vm.validarFormularioContacto = function() {
        vm = this
        errores = false;
        uno = dos = tres = true;

        uno = expresiones.letrasConEspacio(vm.nombrecontacto)
        vm.nombrecontactovalido = !uno

        dos = expresiones.mail(vm.correocontacto)
        vm.correocontactovalido = !dos

        tres = expresiones.requerido(vm.mensajecontacto)
        vm.mensajecontactovalido = !tres

        if (!uno || !dos || !tres) {
            errores = true
        }
        return errores;
    }

    vm.enviarCorreoContacto = function() {
            vm = this
            if (!vm.validarFormularioContacto()) {
                vm.correoformatovalido = false
                var datos = {
                    nombre: vm.nombrecontactovalido,
                    correoelectronico: vm.correocontactovalido,
                    mensaje: vm.mensajecontactovalido
                }
                modalAlert.progress()
                $http({
                        method: 'POST',
                        url: '../../backend/controller/guardCrud.php',
                        data: datos
                    }).then(
                        function successCallback(object) {
                            var jsonVar = object.data
                            vm.nombrecontacto = ""
                            vm.correocontacto = ""
                            vm.mensajecontacto = ""
                        }, //successCallback
                        function errorCallback(object) {
                            vm.nombrecontacto = ""
                            vm.correocontacto = ""
                            vm.mensajecontacto = ""
                            modalAlert.error("Sus comentarios no pudieron ser enviados, intente m&aacute;s tarde o comun&iacute;quese " +
                                "directamente al tel&eacute;fono de contacto");

                        } //errorCallback
                    ) //then
            } //else
        } //enviarCorreoContacto
}