app.factory('dataFactory', function() {
    var interfaz = {
        cuentaseleccionada: '',

        totalpago: {
            totalperiodos: '0',
            impuestoemitido: '6584.00',
            impuestopagado: '0.00',
            actualizacion: '7540.33',
            gastosdeejecucion: '2000.00',
            gastosdeejecucioncondonados: '0.00',
            condonacionderecargo: '0.00',
            recargo: '11278.75',
            multa: '830.00',
            condonaciondemulta: '0.00',
            totalpagar: '28233.08',
            lineacaptura: '798798798798798',
            vencimiento: '31/12/2019'
        },

        vigenteAdulto: [{
            estatus: 'vigente',
            seleccionado: '0',
            cuenta: '154772720095',
            idadeudo: '1',
            idinmueble: '1',
            esadultomayor: '1',
            bimestre: '2019-06',
            lineacaptura: '456465465465465456',
            vencimiento: '31/12/2019',
            impuesto: '4500.00',
            reduccion: '500.00',
            total: '4000.00'
        }],

        noAdeudo: [{
            estatus: 'noadeudo',
            seleccionado: '0',
            cuenta: '321654987012',
            idadeudo: '1',
            idinmueble: '1',
            esadultomayor: '1',
            bimestre: '2019-06',
            lineacaptura: '456465465465465456',
            vencimiento: '31/12/2019',
            impuesto: '4500.00',
            reduccion: '500.00',
            total: '4000.00'
        }],

        vencido: [{
                estatus: 'vencido',
                seleccionado: '0',
                cuenta: '054231380004',
                idadeudo: '1VENCIDO',
                idinmueble: '1INMUEBLE',
                bimestre: '2001-01',
                requerido: 'NO',
                impuestoemitido: '3292.00',
                impuestopagado: '0.00',
                reduccion: '0.00',
                total: '13235.69',
                detalle: {
                    impuestoemitido: '3292.00',
                    impuestopagado: '0.00',
                    actualizacion: '3790.08',
                    diferencia: '3292.00',
                    recargo: '5738.61',
                    condonacionderecargo: '0.00',
                    gastosdeejecucion: '0.00',
                    gastosdeejecucioncondonados: '0.00',
                    multa: '415.00',
                    condonaciondemulta: '0.00',
                    subtotalperiodo: '13235.69'
                }
            },
            {
                estatus: 'vencido',
                seleccionado: '0',
                cuenta: '054231380004',
                idadeudo: '2VENCIDO',
                idinmueble: '2INMUEBLE',
                bimestre: '2001-02',
                requerido: 'NO',
                impuestoemitido: '3292.00',
                impuestopagado: '0.00',
                reduccion: '0.00',
                total: '12997.39',
                detalle: {
                    impuestoemitido: '3292.00',
                    impuestopagado: '0.00',
                    actualizacion: '3750.25',
                    diferencia: '3292.00',
                    recargo: '5540.14',
                    condonacionderecargo: '0.00',
                    gastosdeejecucion: '0.00',
                    gastosdeejecucioncondonados: '0.00',
                    multa: '415.00',
                    condonaciondemulta: '0.00',
                    subtotalperiodo: '12997.39'
                }
            }
        ],

        vigenteAnticipadoVencido: [{
                estatus: 'vigente',
                seleccionado: '0',
                cuenta: '123456789012',
                idadeudo: '1',
                idinmueble: '1',
                esadultomayor: '0',
                bimestre: '2019-01',
                lineacaptura: '456465465465465456',
                vencimiento: '31/12/2019',
                impuesto: '4500.00',
                reduccion: '0.00',
                total: '4500.00'
            },
            {
                estatus: 'anticipado',
                seleccionado: '0',
                cuenta: '123456789012',
                idadeudo: '2',
                idinmueble: '2',
                esadultomayor: '0',
                bimestre: '2019-02',
                lineacaptura: '456465465465465456',
                vencimiento: '31/12/2019',
                impuesto: '4500.00',
                reduccion: '500.00',
                total: '4000.00'
            },
            {
                estatus: 'vencido',
                seleccionado: '0',
                cuenta: '123456789012',
                idadeudo: '3',
                idinmueble: '3',
                bimestre: '2018-01',
                requerido: 'NO',
                impuestoemitido: '4500.00',
                impuestopagado: '0.00',
                reduccion: '0.00',
                total: '4500.00',
                detalle: {
                    impuestoemitido: '4500.00',
                    impuestopagado: '0.00',
                    actualizacion: '0.00',
                    diferencia: '0.00',
                    recargo: '0.00',
                    condonacionderecargo: '0.00',
                    gastosdeejecucion: '0.00',
                    gastosdeejecucioncondonados: '0.00',
                    multa: '0.00',
                    condonaciondemulta: '0.00',
                    subtotalperiodo: '4500.00'
                }
            },
            {
                estatus: 'vencido',
                seleccionado: '0',
                cuenta: '123456789012',
                idadeudo: '4',
                idinmueble: '4',
                bimestre: '2018-02',
                requerido: 'SI',
                impuestoemitido: '4500.00',
                impuestopagado: '0.00',
                reduccion: '0.00',

                total: '4500.00',
                detalle: {
                    impuestoemitido: '4500.00',
                    impuestopagado: '0.00',
                    actualizacion: '0.00',
                    diferencia: '0.00',
                    recargo: '0.00',
                    condonacionderecargo: '0.00',
                    gastosdeejecucion: '0.00',
                    gastosdeejecucioncondonados: '0.00',
                    multa: '0.00',
                    condonaciondemulta: '0.00',
                    subtotalperiodo: '4500.00'
                }
            },
            {
                estatus: 'vencido',
                seleccionado: '0',
                cuenta: '123456789012',
                idadeudo: '5',
                idinmueble: '5',
                bimestre: '2018-03',
                requerido: 'NO',
                impuestoemitido: '4500.00',
                impuestopagado: '0.00',
                reduccion: '0.00',

                total: '4500.00',
                detalle: {
                    impuestoemitido: '4500.00',
                    impuestopagado: '0.00',
                    actualizacion: '0.00',
                    diferencia: '0.00',
                    recargo: '0.00',
                    condonacionderecargo: '0.00',
                    gastosdeejecucion: '0.00',
                    gastosdeejecucioncondonados: '0.00',
                    multa: '0.00',
                    condonaciondemulta: '0.00',
                    subtotalperiodo: '4500.00'
                }
            }
        ],

        fotoAerea: [
            "Im\u00E1gen Sat\u00E9lite Blanco y Negro",

            "Im\u00E1gen Sat\u00E9lite Blanco y Negro Mini",

            "Im\u00E1gen Sat\u00E9lite Color",

            "Ortofoto Px:9cm Lambert",

            "Ortofoto Px:16cm Lambert",

            "Ortofoto Px:16cm Lambert",

            "Ortofoto Px:9cm Lambert(Norte Px + Sur 16 Px (Repixeleada))",

            "Im\u00E1gen Sat\u00E9lite WorldView (Febrero 2010)",

            "Im\u00E1gen Sat\u00E9lite WorldView (Noviembre 2010)",

            "Ortoim\u00E1gen WV-2 Fucionada Color Natural"
        ],

        getAdeudoClone: function(cuenta) {
            if ('154772720095' === cuenta) {
                return JSON.parse(JSON.stringify(this.vigenteAdulto));
            } else if ('054231380004' === cuenta) {
                return JSON.parse(JSON.stringify(this.vencido));
            } else if ('123456789012' === cuenta) {
                return JSON.parse(JSON.stringify(this.vigenteAnticipadoVencido));
            } else if ('321654987012' === cuenta) {
                return JSON.parse(JSON.stringify(this.noAdeudo));
            }
            return false
        },

        getAdeudoFactory: function(cuenta) {
            if ('154772720095' === cuenta) {
                return this.vigenteAdulto
            } else if ('054231380004' === cuenta) {
                return this.vencido
            } else if ('123456789012' === cuenta) {
                return this.vigenteAnticipadoVencido
            } else if ('321654987012' === cuenta) {
                return this.noAdeudo
            }
            return false
        }
    }
    return interfaz
})