app.controller('principalCtrl', [principalController])

function principalController() {
    vm = this

    vm.cargaPagina = false;
    var progreso = 0;
    var idIterval = setInterval(function() {
        // Aumento en 10 el progeso
        progreso += 20;
        $('#barCargaPagina').css('width', progreso + '%');

        //Si llegó a 100 elimino el interval
        if (progreso > 100) {
            $('#barCargaPagina').css('width', '0');
            $('#progressInicio').css('height', '0');
            clearInterval(idIterval);
        }
    }, 1000);

    var DateObj = new Date()
    var diaNumero = DateObj.getDay()
    var mesNumero = DateObj.getMonth()

    var dia = new Array(7)
    dia[0] = 'Domingo'
    dia[1] = 'Lunes'
    dia[2] = 'Martes'
    dia[3] = 'Miércoles'
    dia[4] = 'Jueves'
    dia[5] = 'Viernes'
    dia[6] = 'Sábado'
    var mes = new Array(12)
    mes[0] = 'Enero'
    mes[1] = 'Febrero'
    mes[2] = 'Marzo'
    mes[3] = 'Abril'
    mes[4] = 'Mayo'
    mes[5] = 'Junio'
    mes[6] = 'Julio'
    mes[7] = 'Agosto'
    mes[8] = 'Septiembre'
    mes[9] = 'Octubre'
    mes[10] = 'Noviembre'
    mes[11] = 'Diciembre'
    vm.CurrentDate =
        dia[diaNumero] +
        ' ' +
        DateObj.getDate() +
        ' de ' +
        mes[mesNumero] +
        ' de ' +
        DateObj.getFullYear()

    vm.moverScroll = function() {
        var element = document.getElementById('contenido')
        element.scrollIntoView()
    }
}