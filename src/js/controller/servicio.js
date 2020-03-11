app.controller('servicioCtrl', [
    '$http',
    'dataFactory',
    'dataCDMX',
    'formatoPago',
    servicioController
])

function servicioController($http, dataFactory, dataCDMX, formatoPago) {
    vm = this
    modalAlert.progressInicio();
    vm.siguientedesactivado = true
    vm.regresardesactivado = true
    vm.pago = true
    vm.cuentavalida = false
    vm.tablaAdeudoVigente = false
    vm.tablaAdeudoAnticipado = false
    vm.tablaAdeudoVencido = false
    vm.tablaTotales = false
    vm.formulariopagoenlinea = false
    vm.btncalculartotales = false
    vm.siguientepie = false
    vm.siguientedosdesactivado = true
    vm.btnregresarsiguientepie = false

    vm.uno = true
    vm.dos = false
    vm.tres = false
    vm.tresformato = false
    vm.treslinea = false
    vm.formulariocuenta = true
    vm.noadeudo = false
    vm.noencontrada = false

    paso = 1
    ceroformulario = false
    unoformulario = false
    dosformulario = false
    tresformulario = false
    cuatroformulario = false
    cincoformulario = false
    seisformulario = false
    sieteformulario = false
    ochoformulario = false
    nueveformulario = false
    modalidaddepago = false
    formulariodos = false
    modalidaddepagoseleccionado = ''
    vm.fotos = dataFactory.fotoAerea

    vm.siguienteTab = function() {
        if (paso === 1) {
            vm.siguientedesactivado = true
            vm.regresardesactivado = false
            vm.muestraDos()
            paso = 2
            if (document.getElementById('radioformatomultiple').checked) {
                vm.siguientedesactivado = false
            } else if (formulariodos) {
                vm.siguientedesactivado = false
            }
        } else if (paso === 2) {
            vm.regresardesactivado = false
            vm.muestraTres()
            paso = 3
            vm.siguientedesactivado = true
        }
    }

    vm.regresarTab = function() {
        if (paso === 2) {
            vm.siguientedesactivado = false
            vm.regresardesactivado = true
            vm.muestraUno()
            paso = 1
        } else if (paso === 3) {
            vm.muestraDos()
            paso = 2
            if (document.getElementById('radioformatomultiple').checked) {
                vm.siguientedesactivado = false
            } else if (formulariodos) {
                vm.siguientedesactivado = false
            }
        }
    }

    vm.muestraUno = function() {
        vm.uno = true
        vm.dos = false
        vm.tres = false
    }

    vm.muestraDos = function() {
        vm.uno = false
        vm.dos = true
        vm.tres = false
    }

    vm.muestraTres = function() {
        vm.uno = false
        vm.dos = false
        vm.tres = true
        if (document.getElementById('radioformatomultiple').checked) {
            vm.tresformato = true
            vm.treslinea = false
                //
            formatoPago.generar(vm.getValoresPago())
        } else {
            vm.treslinea = true
            vm.tresformato = false
            vm.setValoresTres()
        }
    }

    vm.getValoresPago = function() {
        var pago = dataFactory.getAdeudoFactory(dataFactory.cuentaseleccionada)
        var conceptocobro = ''
        var conceptopago = []
        var liquidacionpago = []
        var totalpagar = ''
        var lineacaptura = ''
        var vencimiento = ''
        var detalle = []
        var detalleTotal = []
        var formatoVigente = function(p) {
                conceptopago = [{
                        nombre: 'CUENTA: ' + dataFactory.cuentaseleccionada
                    },
                    {
                        nombre: 'PERIODOS: ' + p.bimestre
                    }
                ]

                liquidacionpago = [{
                    concepto: 'IMPUESTO:',
                    importe: p.impuesto
                }]

                if (p.esadultomayor === '1') {
                    liquidacionpago.push({
                        concepto: 'BENIFICIO:',
                        importe: p.reduccion
                    })
                }

                totalpagar = p.total
                lineacaptura = p.lineacaptura
                vencimiento = p.vencimiento
            }
            //
        var formatoVencido = function() {
                conceptopago = [{
                        nombre: 'CUENTA: ' + dataFactory.cuentaseleccionada
                    },
                    {
                        nombre: 'PERIODOS: VER ANEXO'
                    }
                ]
                liquidacionpago = [{
                        concepto: 'IMPUESTO:',
                        importe: dataFactory.totalpago.impuestoemitido
                    },
                    {
                        concepto: 'IMPUESTO ACTUALIZADO:',
                        importe: dataFactory.totalpago.actualizacion
                    },
                    {
                        concepto: 'RECARGOS:',
                        importe: dataFactory.totalpago.recargo
                    },
                    {
                        concepto: 'REDUCCI\u00D3N:',
                        importe: '0.00'
                    }
                ]
                totalpagar = dataFactory.totalpago.totalpagar
                lineacaptura = dataFactory.totalpago.lineacaptura
                vencimiento = dataFactory.totalpago.vencimiento
            }
            //
        var setPagoDetalle = function(pago) {
                detalle = [
                    [{
                            text: 'Bimestre'
                        },
                        {
                            text: 'Impuesto'
                        },
                        {
                            text: 'Actualizaci\u00F3n'
                        },
                        {
                            text: 'Recargos'
                        },
                        {
                            text: 'Recargos Cond.'
                        },
                        {
                            text: 'Multas'
                        },
                        {
                            text: 'Multas Cond.'
                        },
                        {
                            text: 'Total'
                        }
                    ]
                ]

                for (var i = 0; i < pago.length; i++) {
                    if (pago[i].seleccionado == '1') {
                        detalle.push([{
                                text: pago[i].bimestre // Bimestre
                            },
                            {
                                text: pago[i].detalle.impuestoemitido // Impuesto
                            },
                            {
                                text: pago[i].detalle.actualizacion // Actualizacion
                            },
                            {
                                text: pago[i].detalle.recargo // Recargos
                            },
                            {
                                text: pago[i].detalle.condonacionderecargo // Recargos Cond.
                            },
                            {
                                text: pago[i].detalle.multa // Multas
                            },
                            {
                                text: pago[i].detalle.condonaciondemulta // Multas Cond.
                            },
                            {
                                text: pago[i].detalle.subtotalperiodo // Total
                            }
                        ])
                    }
                }

                if (detalle.length > 1) {
                    detalle.push([{
                            text: 'Total por Rubro' // Bimestre
                        },
                        {
                            text: dataFactory.totalpago.impuestoemitido // Impuesto
                        },
                        {
                            text: dataFactory.totalpago.actualizacion // Actualizacion
                        },
                        {
                            text: dataFactory.totalpago.recargo // Recargos
                        },
                        {
                            text: dataFactory.totalpago.condonacionderecargo // Recargos Cond.
                        },
                        {
                            text: dataFactory.totalpago.multa // Multas
                        },
                        {
                            text: dataFactory.totalpago.condonaciondemulta // Multas Cond.
                        },
                        {
                            text: dataFactory.totalpago.totalpagar // Total
                        }
                    ])
                }

                if (detalle.length > 1) {
                    detalleTotal = [
                        [{ text: 'SUBTOTAL' }, { text: dataFactory.totalpago.totalpagar }],
                        [
                            { text: 'Gastos de Ejecuci\u00F3n' },
                            { text: dataFactory.totalpago.impuestoemitido }
                        ],
                        [
                            { text: 'Cond. de Gastos de Ejecucuci\u00F3n' },
                            { text: dataFactory.totalpago.gastosdeejecucioncondonados }
                        ],
                        [
                            { text: 'Multas por Incumplimiento' },
                            { text: dataFactory.totalpago.multa }
                        ],
                        [
                            { text: 'Cond. de Multas por Incumplimiento' },
                            { text: dataFactory.totalpago.condonaciondemulta }
                        ],
                        [{ text: 'TOTAL' }, { text: dataFactory.totalpago.totalpagar }]
                    ]
                }

                detalle = detalle.length > 1 ? detalle : []
            }
            //
        var formatoVencidoRequerido = function() {
                conceptopago = [{
                        nombre: 'CUENTA: ' + dataFactory.cuentaseleccionada
                    },
                    {
                        nombre: 'PERIODOS: VER ANEXO'
                    }
                ]
                liquidacionpago = [{
                        concepto: 'IMPUESTO:',
                        importe: dataFactory.totalpago.impuestoemitido
                    },
                    {
                        concepto: 'IMPUESTO ACTUALIZADO:',
                        importe: dataFactory.totalpago.actualizacion
                    },
                    {
                        concepto: 'MULTAS:',
                        importe: dataFactory.totalpago.multa
                    },
                    {
                        concepto: 'GASTOS DE EJECUCION:',
                        importe: dataFactory.totalpago.gastosdeejecucion
                    },
                    {
                        concepto: 'RECARGOS:',
                        importe: dataFactory.totalpago.recargo
                    }
                ]
                totalpagar = dataFactory.totalpago.totalpagar
                lineacaptura = dataFactory.totalpago.lineacaptura
                vencimiento = dataFactory.totalpago.vencimiento
            }
            //
        if (dataFactory.cuentaseleccionada === '154772720095') {
            conceptocobro =
                'IMPUESTO PREDIAL POR SISTEMA CON CONDONACI\u00D3N DEL TREINTA POR CIENTO RESOLUCI\u00D3N DE CARACTER GENERAL'
            formatoVigente(pago[0])
        } else if (dataFactory.cuentaseleccionada === '054231380004') {
            conceptocobro = 'IMPUESTO PREDIAL VENCIDO SOLO L\u00CDNEA DE CAPTURA'
            formatoVencido()
            setPagoDetalle(pago)
        } else if (dataFactory.cuentaseleccionada === '123456789012') {
            var isvencido = false
            var isrequerido = false
            for (var i = 0; i < pago.length; i++) {
                obj = pago[i]
                if (obj.estatus === 'vigente' && obj.seleccionado === 1) {
                    conceptocobro = 'IMPUESTO PREDIAL EMITIDO BIMESTRAL VIGENTE'
                    formatoVigente(obj)
                    break
                } else if (obj.estatus === 'anticipado' && obj.seleccionado === 1) {
                    conceptocobro =
                        'IMPUESTO PREDIAL EMITIDO BIMESTRAL VIGENTE ANTICIPADO'
                    formatoVigente(obj)
                    break
                } else if (obj.estatus === 'vencido' && obj.seleccionado === 1) {
                    isvencido = true
                    if (obj.requerido === 'SI') {
                        isrequerido = true
                        break
                    }
                }
            }
            if (isvencido) {
                if (isrequerido) {
                    conceptocobro =
                        'IMPUESTO PREDIAL REQUERIDO POR FISCALIZACI\u00D3N L\u00CDNEA DE CAPTURA'
                    formatoVencidoRequerido()
                } else {
                    conceptocobro = 'IMPUESTO PREDIAL VENCIDO SOLO L\u00CDNEA DE CAPTURA'
                    formatoVencido()
                }
                setPagoDetalle(pago)
            }
        }
        //
        var codigobarras = {
            vigencia: 'VIGENCIA HASTA: ' + vencimiento,
            codigo: lineacaptura
        }
        var codigoqr = {
                codigo: lineacaptura
            }
            //
        return {
            conceptocobro: conceptocobro,
            conceptopago: conceptopago,
            liquidacionpago: liquidacionpago,
            totalpagar: totalpagar,
            lineacaptura: lineacaptura,
            codigobarras: codigobarras,
            codigoqr: codigoqr,
            detalle: detalle,
            detalleTotal: detalleTotal
        }
    }

    vm.setValoresTres = function() {
        if (dataFactory.cuentaseleccionada === '154772720095') {
            vm.conceptodepagotres =
                'IMPUESTO PREDIAL POR SISTEMA CON CONDONACI\u00D3N DEL TREINTA POR CIENTO RESOLUCI\u00D3N DE CARACTER GENERAL'
            obj = dataFactory.getAdeudoFactory(dataFactory.cuentaseleccionada)
            vm.importetotalapagartres = obj[0].total
            vm.lineadecapturatres = obj[0].lineacaptura
        } else if (dataFactory.cuentaseleccionada === '054231380004') {
            vm.conceptodepagotres =
                'IMPUESTO PREDIAL VENCIDO SOLO L\u00CDNEA DE CAPTURA'
            vm.importetotalapagartres = dataFactory.totalpago.totalpagar
            vm.lineadecapturatres = dataFactory.totalpago.lineacaptura
        } else if (dataFactory.cuentaseleccionada === '123456789012') {
            jsonVar = dataFactory.getAdeudoFactory(dataFactory.cuentaseleccionada)
            limite = jsonVar.length
            isseleccionado = false
            for (i = 0; i < limite && !isseleccionado; i++) {
                obj = jsonVar[i]
                if (obj.estatus === 'vigente' && obj.seleccionado === 1) {
                    vm.conceptodepagotres = 'IMPUESTO PREDIAL EMITIDO BIMESTRAL VIGENTE'
                    vm.importetotalapagartres = obj.total
                    vm.lineadecapturatres = obj.lineacaptura
                    isseleccionado = true
                } else if (obj.estatus === 'anticipado' && obj.seleccionado === 1) {
                    vm.conceptodepagotres =
                        'IMPUESTO PREDIAL EMITIDO BIMESTRAL VIGENTE ANTICIPADO'
                    vm.importetotalapagartres = obj.total
                    vm.lineadecapturatres = obj.lineacaptura
                    isseleccionado = true
                } else if (obj.estatus === 'vencido' && obj.seleccionado === 1) {
                    if (obj.requerido === 'SI') {
                        vm.conceptodepagotres =
                            'IMPUESTO PREDIAL REQUERIDO POR FISCALIZACI\u00D3N L\u00CDNEA DE CAPTURA'
                    } else {
                        vm.conceptodepagotres =
                            'IMPUESTO PREDIAL VENCIDO SOLO L\u00CDNEA DE CAPTURA'
                    }
                    vm.importetotalapagartres = dataFactory.totalpago.totalpagar
                    vm.lineadecapturatres = dataFactory.totalpago.lineacaptura
                    isseleccionado = true
                }
            }
        }

        vm.modalidaddepagotres = modalidaddepagoseleccionado
        var DateObj = new Date()
        var dias = 5
        DateObj.setDate(DateObj.getDate() + dias)
        vm.fechavencimientotres =
            DateObj.getMonth() +
            1 +
            '/' +
            DateObj.getDate() +
            '/' +
            DateObj.getFullYear()
        vm.nombrerazontres = vm.nombrerazon.toUpperCase()
        vm.callenumerotres = vm.callenumero.toUpperCase()
        vm.codigopostaltres = vm.selectCodigoPostal
        vm.apellidopaternotres = vm.paterno.toUpperCase()
        vm.alcaldiatres = vm.selectAlcaldia.alcaldia.toUpperCase()
        vm.telefonotres = vm.telefono
        vm.apellidomaternotres = vm.materno.toUpperCase()
        vm.coloniatres = vm.selectColonia.toUpperCase()
        vm.correoelectronicotres = vm.correo
    }

    vm.mostrarContenido = function(valor) {
        vm = this
        vm.pago = false
        vm.mapa = false
        vm.pagorealizado = false
        vm.conozcaimpuesto = false
        vm.plano = false
        vm.copias = false
        switch (valor) {
            case '0':
                vm.pago = true
                break
            case '1':
                vm.showMap();
                vm.mapa = true
                break
            case '2':
                vm.pagorealizado = true
                break
            case '3':
                modalAlert.progress()
                PDFObject.embed(
                    'recursos/Ejemplo_imp_pred_2018.pdf',
                    '#Ejemplo_imp_pred_2018'
                )
                vm.conozcaimpuesto = true
                break
            case '4':
                vm.copias = true
                break
            case '5':
                vm.plano = true
                break
        }
        if (vm.isMobile()) {
            vm.moverScroll()
        }
    }

    vm.showMap = function() {
        modalAlert.progress()
        var styledMapType = new google.maps.StyledMapType(
            [
                { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
                { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
                { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
                {
                    featureType: 'administrative',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#c9b2a6' }]
                },
                {
                    featureType: 'administrative.land_parcel',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#dcd2be' }]
                },
                {
                    featureType: 'administrative.land_parcel',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#ae9e90' }]
                },
                {
                    featureType: 'landscape.natural',
                    elementType: 'geometry',
                    stylers: [{ color: '#dfd2ae' }]
                },
                {
                    featureType: 'poi',
                    elementType: 'geometry',
                    stylers: [{ color: '#dfd2ae' }]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#93817c' }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry.fill',
                    stylers: [{ color: '#a5b076' }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#447530' }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{ color: '#f5f1e6' }]
                },
                {
                    featureType: 'road.arterial',
                    elementType: 'geometry',
                    stylers: [{ color: '#fdfcf8' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{ color: '#f8c967' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#e9bc62' }]
                },
                {
                    featureType: 'road.highway.controlled_access',
                    elementType: 'geometry',
                    stylers: [{ color: '#e98d58' }]
                },
                {
                    featureType: 'road.highway.controlled_access',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#db8555' }]
                },
                {
                    featureType: 'road.local',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#806b63' }]
                },
                {
                    featureType: 'transit.line',
                    elementType: 'geometry',
                    stylers: [{ color: '#dfd2ae' }]
                },
                {
                    featureType: 'transit.line',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#8f7d77' }]
                },
                {
                    featureType: 'transit.line',
                    elementType: 'labels.text.stroke',
                    stylers: [{ color: '#ebe3cd' }]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'geometry',
                    stylers: [{ color: '#dfd2ae' }]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry.fill',
                    stylers: [{ color: '#b9d3c2' }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#92998d' }]
                }
            ], { name: 'Styled Map' });
        // The location of Uluru
        var uluru = {
            lat: 19.32108,
            lng: -99.15321
        };
        // The map, centered at Uluru


        var map = new google.maps.Map(
            document.getElementById('map'), {
                zoom: 10,
                center: uluru,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                    mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                        'styled_map'
                    ],
                    position: google.maps.ControlPosition.LEFT_BOTTOM,
                },
                fullscreenControlOptions: {
                    position: google.maps.ControlPosition.BOTTOM_LEFT,
                }
            });


        var CD_MX_BOUNDS = dataCDMX.cdmxDelimiters;

        var cdmxPolygon = new google.maps.Polygon({
            paths: CD_MX_BOUNDS,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: '#FF0000',
            fillOpacity: 0.03
        });



        var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
            },
            markerOptions: { icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' },
            circleOptions: {
                fillColor: '#ffff00',
                fillOpacity: 1,
                strokeWeight: 5,
                clickable: false,
                editable: true,
                zIndex: 1
            }
        });

        //map.mapTypes.set('styled_map', styledMapType);
        //map.setMapTypeId('styled_map')
        cdmxPolygon.setMap(map)
        drawingManager.setMap(map);

        var busquedaControlDiv = document.createElement('div');
        vm.BusquedaControl(busquedaControlDiv);

        busquedaControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(busquedaControlDiv);

        vm = this
    }

    vm.BusquedaControl = function(controlDiv) {
        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginTop = '5px';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'B\u00FAsqueda';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '20px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = '<i class="fas fa-search"></i>';
        controlUI.appendChild(controlText);

        controlUI.addEventListener('click', function() {
            $('#busquedaModal').modal()
        });

    }

    vm.moverScroll = function() {
        var element = document.getElementById('contenidoservicio')
        element.scrollIntoView()
    }

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

    vm.cuentaPredialValida = function() {
        vm = this
        if (!expresiones.cuentapredial(vm.clavepredial)) {
            vm.cuentavalida = true
        } else {
            vm.cuentavalida = false
        }
    }

    vm.getAdeudo = function(valido) {
            vm = this
            modalAlert.progress();
            var response = grecaptcha.getResponse()
            errores = false

            if (response.length == 0) {
                errores = vm.errorrecaptcha = true
            }

            if (!expresiones.cuentapredial(vm.clavepredial)) {
                errores = vm.cuentavalida = true
            }

            if (!errores) {
                vm.errorrecaptcha = vm.cuentavalida = false
                vm.expanded = false
                jsonVar = dataFactory.getAdeudoClone(vm.clavepredial)
                var dimension = jsonVar.length
                if (
                    jsonVar === null ||
                    dimension === 0 ||
                    !jsonVar ||
                    /^\s*$/.test(jsonVar)
                ) {
                    vm.clavepredial = ''
                    vm.noadeudo = false
                    vm.noencontrada = true
                    vm.formulariocuenta = false
                } else {
                    if (jsonVar[0].estatus.toLowerCase() === 'noadeudo') {
                        vm.cuentanolocalizada = vm.clavepredial
                        vm.clavepredial = ''
                        vm.noadeudo = true
                        vm.noencontrada = false
                        vm.formulariocuenta = false
                    } else {
                        vm.cuentalocalizada = vm.clavepredial
                        dataFactory.cuentaseleccionada = vm.clavepredial
                        vm.clavepredial = ''
                        vm.siadeudo = true
                        vigente = false
                        anticipado = false
                        jsonTemp = jsonVar[0]
                        if (jsonTemp.estatus.toLowerCase() === 'vigente') {
                            vm.bimestrevigente = jsonTemp.bimestre
                            vm.lineacapturavigente = jsonTemp.lineacaptura
                            vm.vencimientovigente = jsonTemp.vencimiento
                            vm.impuestovigente = jsonTemp.impuesto
                            vm.reduccionvigente = jsonTemp.reduccion
                            vm.totalvigente = jsonTemp.total
                            vm.tablaAdeudoVigente = true
                            vigente = true
                        } else if (jsonTemp.estatus.toLowerCase() === 'anticipado') {
                            vm.bimestreanticipado = jsonTemp.bimestre
                            vm.lineacapturaanticipado = jsonTemp.lineacaptura
                            vm.vencimientoanticipado = jsonTemp.vencimiento
                            vm.impuestoanticipado = jsonTemp.impuesto
                            vm.reduccionanticipado = jsonTemp.reduccion
                            vm.totalanticipado = jsonTemp.total
                            vm.tablaAdeudoAnticipado = true
                            anticipado = true
                        }

                        if (dimension > 1 && !anticipado) {
                            jsonTemp = jsonVar[1]
                            if (jsonTemp.estatus.toLowerCase() === 'anticipado') {
                                vm.bimestreanticipado = jsonTemp.bimestre
                                vm.lineacapturaanticipado = jsonTemp.lineacaptura
                                vm.vencimientoanticipado = jsonTemp.vencimiento
                                vm.impuestoanticipado = jsonTemp.impuesto
                                vm.reduccionanticipado = jsonTemp.reduccion
                                vm.totalanticipado = jsonTemp.total
                                vm.tablaAdeudoAnticipado = true
                                anticipado = true
                            }
                            if (dimension > 2 && vigente && anticipado) {
                                jsonTemp = jsonVar
                                jsonTemp.splice(0, 2)
                                vm.tablaAdeudoVencido = true
                                vm.adeudosvencidos = jsonTemp
                            } else if (vigente && !anticipado && dimension >= 2) {
                                jsonTemp = jsonVar
                                jsonTemp.splice(0, 1)
                                vm.adeudosvencidos = jsonTemp
                                vm.tablaAdeudoVencido = true
                            } else if (!vigente && anticipado && dimension >= 2) {
                                jsonTemp = jsonVar
                                jsonTemp.splice(0, 1)
                                vm.adeudosvencidos = jsonTemp
                                vm.tablaAdeudoVencido = true
                            } else if (!vigente && !anticipado) {
                                vm.adeudosvencidos = jsonVar
                                vm.tablaAdeudoVencido = true
                            }
                        }
                        vm.noencontrada = false
                        vm.formulariocuenta = false
                        vm.noadeudo = false
                    }
                }
            } //end errores            
        } //end getAdeudo


    vm.nuevaCuenta = function() {
        vm = this
        modalAlert.progress()
        grecaptcha.reset();
        vm.errorrecaptcha = vm.cuentavalida = false
        vm.noencontrada = false
        vm.noadeudo = false
        vm.siadeudo = false
        vm.tablaAdeudoVigente = false
        vm.tablaAdeudoAnticipado = false
        vm.tablaAdeudoVencido = false
        vm.tablaTotales = false
        vm.formulariopagoenlinea = false
        vm.btncalculartotales = false
        vm.siguientepie = false
        dataFactory.cuentaseleccionada = ''
        vm.vigenteactivo = false
        vm.anticipadoactivo = false
        vm.todoslosvencidos = false

        vm.siguientedesactivado = true
        vm.regresardesactivado = true
        vm.pago = true
        vm.tablaAdeudoVigente = false
        vm.tablaAdeudoAnticipado = false
        vm.tablaAdeudoVencido = false
        vm.tablaTotales = false
        vm.formulariopagoenlinea = false
        vm.btncalculartotales = false
        vm.siguientepie = false
        vm.siguientedosdesactivado = true
        vm.btnregresarsiguientepie = false

        vm.dos = false
        vm.tres = false
        vm.tresformato = false
        vm.treslinea = false
        vm.noencontrada = false

        paso = 1
        ceroformulario = false
        unoformulario = false
        dosformulario = false
        tresformulario = false
        cuatroformulario = false
        cincoformulario = false
        seisformulario = false
        sieteformulario = false
        ochoformulario = false
        nueveformulario = false
        modalidaddepago = false
        formulariodos = false
        modalidaddepagoseleccionado = ''

        vm.uno = true
        vm.formulariocuenta = true
    }

    vm.adeudoVigente = function() {
        vm = this
        if (!vm.vigenteactivo) {
            vm.seleccionarAdeudoXEstatus('vigente')
            vm.tablaAdeudoAnticipado = false
            vm.tablaAdeudoVencido = false
            vm.siguientedesactivado = false
            vm.siguientepie = true
        } else {
            this.deseleccionarAdeudo()
            if (vm.buscarAdeudoXEstatus('anticipado')) {
                vm.tablaAdeudoAnticipado = true
            }
            if (vm.buscarAdeudoXEstatus('vencido')) {
                vm.tablaAdeudoVencido = true
            }
            vm.siguientedesactivado = true
            vm.siguientepie = false
        }
    }

    vm.adeudoAnticipado = function() {
        vm = this
        if (!vm.anticipadoactivo) {
            this.seleccionarAdeudoXEstatus('anticipado')
            vm.tablaAdeudoVigente = false
            vm.tablaAdeudoVencido = false
            vm.siguientedesactivado = false
            vm.siguientepie = true
        } else {
            vm.deseleccionarAdeudo()
            if (vm.buscarAdeudoXEstatus('vigente')) {
                vm.tablaAdeudoVigente = true
            }
            if (vm.buscarAdeudoXEstatus('vencido')) {
                vm.tablaAdeudoVencido = true
            }
            vm.siguientedesactivado = true
            vm.siguientepie = false
        }
    }

    vm.adeudoVencido = function(idadeudo) {
            vm = this
            vm.tablaTotales = false
            vm.siguientepie = false
            checkBox = document.getElementById(idadeudo)
            if (checkBox.checked === true) {
                this.seleccionarAdeudo(idadeudo)
                vm.tablaAdeudoVigente = false
                vm.tablaAdeudoAnticipado = false
                vm.btncalculartotales = true
            } else {
                vm.deseleccionarAdeudoXId(idadeudo)
                isseleccionado = false
                jsonVar = dataFactory.getAdeudoFactory(dataFactory.cuentaseleccionada)
                limite = jsonVar.length
                for (i = 0; i < limite && !isseleccionado; i++) {
                    obj = jsonVar[i]
                    if (obj.estatus === 'vencido' && jsonVar[i].seleccionado === 1) {
                        isseleccionado = true
                    }
                }

                if (!isseleccionado) {
                    this.deseleccionarAdeudo()
                    vm.todoslosvencidos = false
                    if (vm.buscarAdeudoXEstatus('vigente')) {
                        vm.tablaAdeudoVigente = true
                    }
                    if (vm.buscarAdeudoXEstatus('anticipado')) {
                        vm.tablaAdeudoAnticipado = true
                    }
                    vm.siguientedesactivado = true
                    vm.btncalculartotales = false
                }
            }
        } // vm.adeudoVencido

    vm.todosVencidos = function() {
            vm = this
            vm.tablaTotales = false
            vm.siguientepie = false
            if (!vm.todoslosvencidos) {
                jsonVar = dataFactory.getAdeudoFactory(dataFactory.cuentaseleccionada)
                limite = jsonVar.length
                for (i = 0; i < limite; i++) {
                    obj = jsonVar[i]
                    if (obj.estatus === 'vencido') {
                        jsonVar[i].seleccionado = 1
                    }
                }
                vm.tablaAdeudoVigente = false
                vm.tablaAdeudoAnticipado = false
                vm.btncalculartotales = true
            } else {
                this.deseleccionarAdeudo()
                if (vm.buscarAdeudoXEstatus('vigente')) {
                    vm.tablaAdeudoVigente = true
                }
                if (vm.buscarAdeudoXEstatus('anticipado')) {
                    vm.tablaAdeudoAnticipado = true
                }
                vm.siguientedesactivado = true
                vm.btncalculartotales = false
                vm.tablaTotales = false
            }
        } // vm.todosVencidos

    vm.deseleccionarAdeudo = function() {
        jsonVar = dataFactory.getAdeudoFactory(dataFactory.cuentaseleccionada)
        limite = jsonVar.length
        for (i = 0; i < limite; i++) {
            obj = jsonVar[i]
            jsonVar[i].seleccionado = 0
        }
    }

    vm.deseleccionarAdeudoXId = function(idadeudo) {
        jsonVar = dataFactory.getAdeudoFactory(dataFactory.cuentaseleccionada)
        limite = jsonVar.length
        for (i = 0; i < limite; i++) {
            obj = jsonVar[i]
            if (obj.idadeudo === idadeudo) {
                jsonVar[i].seleccionado = 0
            }
        }
    }

    vm.seleccionarAdeudo = function(idadeudo) {
        jsonVar = dataFactory.getAdeudoFactory(dataFactory.cuentaseleccionada)
        limite = jsonVar.length
        for (i = 0; i < limite; i++) {
            obj = jsonVar[i]
            if (obj.idadeudo === idadeudo) {
                jsonVar[i].seleccionado = 1
            }
        }
    }

    vm.seleccionarAdeudoXEstatus = function(estatus) {
        jsonVar = dataFactory.getAdeudoFactory(dataFactory.cuentaseleccionada)
        limite = jsonVar.length
        for (i = 0; i < limite; i++) {
            obj = jsonVar[i]
            if (obj.estatus === estatus) {
                jsonVar[i].seleccionado = 1
            }
        }
    }

    vm.buscarAdeudoXEstatus = function(estatus) {
        jsonVar = dataFactory.getAdeudoFactory(dataFactory.cuentaseleccionada)
        limite = jsonVar.length
        for (i = 0; i < limite; i++) {
            obj = jsonVar[i]
            if (obj.estatus === estatus) {
                return true
            }
        }
        return false
    }

    vm.calcularTotales = function() {
        vm = this
        jsonVar = dataFactory.getAdeudoFactory(dataFactory.cuentaseleccionada)
        limite = jsonVar.length

        for (i = 0; i < limite; i++) {
            obj = jsonVar[i]
            if (obj.seleccionado != 1 && obj.requerido === 'SI') {
                $('#exampleModal').modal()
                return
            }
        }

        modalAlert.progress();

        vm.tablaTotales = true
        totalperiodos = 0.0
        totalemitido = 0.0
        totalpagado = 0.0
        totalactualizacion = 0.0
        totalgastos = 0.0
        totalgastoscondonados = 0.0
        totalrecargo = 0.0
        totalrecargocondonado = 0.0
        totalmulta = 0.0
        totalmultacondonada = 0.0
        totalpagar = 0.0

        for (i = 0; i < limite; i++) {
            obj = jsonVar[i]
            if (obj.seleccionado === 1) {
                totalperiodos++
                totalemitido += parseFloat(obj.detalle.impuestoemitido)
                totalpagado += parseFloat(obj.detalle.impuestopagado)
                totalactualizacion += parseFloat(obj.detalle.actualizacion)
                totalrecargo += parseFloat(obj.detalle.recargo)
                totalrecargocondonado += parseFloat(obj.detalle.condonacionderecargo)
                totalgastos += parseFloat(obj.detalle.gastosdeejecucion)
                totalgastoscondonados += parseFloat(
                    obj.detalle.gastosdeejecucioncondonados
                )
                totalmulta += parseFloat(obj.detalle.multa)
                totalmultacondonada += parseFloat(obj.detalle.condonaciondemulta)
                totalpagar += parseFloat(obj.detalle.subtotalperiodo)
            }
        }

        vm.totalperiodos = totalperiodos
        vm.totalemitido = totalemitido
        vm.totalpagado = totalpagado
        vm.totalactualizacion = totalactualizacion
        vm.totalgastos = totalgastos
        vm.totalgastoscondonados = totalgastoscondonados
        vm.totalrecargo = totalrecargo
        vm.totalrecargocondonado = totalrecargocondonado
        vm.totalmulta = totalmulta
        vm.totalmultacondonada = totalmultacondonada
        vm.totalpagar = totalpagar

        dataFactory.totalpago.totalperiodos = totalperiodos
        dataFactory.totalpago.impuestoemitido = totalemitido
        dataFactory.totalpago.impuestopagado = totalpagado
        dataFactory.totalpago.actualizacion = totalactualizacion
        dataFactory.totalpago.gastosdeejecucion = totalgastos
        dataFactory.totalpago.gastosdeejecucioncondonados = totalgastoscondonados
        dataFactory.totalpago.condonacionderecargo = totalrecargocondonado
        dataFactory.totalpago.recargo = totalrecargo
        dataFactory.totalpago.multa = totalmulta
        dataFactory.totalpago.condonaciondemulta = totalmultacondonada
        dataFactory.totalpago.totalpagar = totalpagar

        var DateObj = new Date()
        var dias = 5
        DateObj.setDate(DateObj.getDate() + dias)
        dataFactory.totalpago.vencimiento =
            DateObj.getMonth() +
            1 +
            '/' +
            DateObj.getDate() +
            '/' +
            DateObj.getFullYear()

        vm.siguientedesactivado = false
        vm.siguientepie = true
    }

    vm.selectAlcaldiasSEPOMEX = function() {
        vm = this
        $http({
            method: 'GET',
            url: 'https://api-sepomex.hckdrk.mx/query/get_municipio_por_estado/Ciudad de Mexico'
        }).then(
            function successCallback(object) {
                var jsonVar = object.data.response.municipios
                vm.alcaldias = jsonVar
            },
            function errorCallback(object) {
                console.log('error: ' + object)
            }
        )
    }

    vm.selectCodigoPostalXAlcaldiaSEPOMEX = function() {
        vm = this
        modalAlert.progress();
        $http({
            method: 'GET',
            url: 'https://api-sepomex.hckdrk.mx/query/get_cp_por_municipio/' +
                vm.selectAlcaldia
        }).then(
            function successCallback(object) {
                var jsonVar = object.data.response.cp
                vm.codigos = jsonVar
            },
            function errorCallback(object, status) {
                if (object === null || object === 'undefined') {
                    modalAlert.error("No se han podido obtener los c&oacute;digos postales por fallas de comunicaci&oacute;n," +
                        " favor de intentar m&aacute;s tarde");
                } else if (object.data === null) {
                    modalAlert.error("No se han podido obtener los c&oacute;digos postales por fallas del sistema," +
                        " favor de intentar m&aacute;s tarde");
                }
            }
        )
    }

    vm.selectColoniaXCodigoPostalSEPOMEX = function() {
        vm = this
        $http({
            method: 'GET',
            url: 'https://api-sepomex.hckdrk.mx/query/get_colonia_por_cp/' +
                vm.selectCodigoPostal
        }).then(
            function successCallback(object) {
                var jsonVar = object.data.response.colonia
                vm.colonias = jsonVar
            },
            function errorCallback(object) {
                console.log('error: ' + object)
            }
        )
    }

    vm.selectAlcaldias = function() {
        vm = this
        vm.alcaldias = dataCDMX.alcaldias
        vm.siguientedesactivado = true
        vm.siguientedosdesactivado = true
    }

    vm.selectCodigoPostalXAlcaldia = function() {
        vm = this
        modalAlert.progress();
        var mySet = new Set()
        limite = dataCDMX.cdmx.length
        for (i = 0; i < limite; i++) {
            if (dataCDMX.cdmx[i].idMunicipio === vm.selectAlcaldia.idalcaldia) {
                mySet.add(dataCDMX.cdmx[i].cp)
            }
        }
        var arreglo = []
        for (let item of mySet) {
            arreglo.push(item)
        }
        vm.codigos = arreglo
        vm.siguientedesactivado = true
        vm.siguientedosdesactivado = true
    }

    vm.selectColoniaXCodigoPostal = function() {
        vm = this
        modalAlert.progress();
        var mySet = new Set()
        limite = dataCDMX.cdmx.length
        for (i = 0; i < limite; i++) {
            if (
                dataCDMX.cdmx[i].idMunicipio === vm.selectAlcaldia.idalcaldia &&
                dataCDMX.cdmx[i].tipo === 'Colonia' &&
                dataCDMX.cdmx[i].cp === vm.selectCodigoPostal
            ) {
                mySet.add(dataCDMX.cdmx[i].asentamiento)
            }
        }
        var arreglo = []
        for (let item of mySet) {
            arreglo.push(item)
        }
        vm.colonias = arreglo
    }

    vm.mostrarFormularioPagoEnLinea = function() {
        vm = this
        vm.siguientedesactivado = true
        vm.siguientedosdesactivado = true
        vm = this
        vm.selectAlcaldias()
        vm.formulariopagoenlinea = true
        vm.btnregresarsiguientepie = true
    }

    vm.mostrarFormatoDePago = function() {
        vm.formulariopagoenlinea = false
        vm.siguientedesactivado = false
        vm.siguientedosdesactivado = false
        vm.btnregresarsiguientepie = true
    }

    vm.selectRadioModalidad = function() {
        vm.modalidadpagovalido = false
        vm.validarFormulario()
    }

    vm.validarFormularioPagoEnLinea = function(campo) {
        vm = this
        switch (campo) {
            case 0:
                condicion = expresiones.requerido(vm.nombrerazon)
                vm.ceroformulario = !condicion
                break
            case 1:
                condicion = expresiones.letrasConEspacio(vm.paterno)
                vm.unoformulario = !condicion
                break
            case 2:
                condicion = expresiones.letrasConEspacio(vm.materno)
                vm.dosformulario = !condicion
                break
            case 3:
                condicion = expresiones.requerido(vm.callenumero)
                vm.tresformulario = !condicion
                break
            case 4:
                condicion = expresiones.combo(document.getElementById('alcaldia'))
                vm.cuatroformulario = !condicion
                break
            case 5:
                condicion = expresiones.combo(document.getElementById('codigopostal'))
                vm.cincoformulario = !condicion
                break
            case 6:
                condicion = expresiones.combo(document.getElementById('colonia'))
                vm.seisformulario = !condicion
                break
            case 7:
                condicion = expresiones.telefono(vm.telefono)
                vm.sieteformulario = !condicion
                break
            case 8:
                condicion = expresiones.mail(vm.correo)
                vm.ochoformulario = !condicion
                break
            case 9:
                vm.nueveformulario = !vm.checkavisodeprivacidad
                break
        }
        vm.validarFormulario()
    }

    vm.validarFormulario = function() {
        if (!document.getElementById('tarjetacredito').checked &&
            !document.getElementById('cuentacheques').checked
        ) {
            modalidaddepago = false
        } else {
            modalidaddepago = true
            if (document.getElementById('tarjetacredito').checked) {
                modalidaddepagoseleccionado = 'Tarjeta de cr\u00E9dito'
            } else {
                modalidaddepagoseleccionado = 'Cuenta de cheques Bancomer'
            }
        }
        ceroformulario = expresiones.requerido(vm.nombrerazon)
        unoformulario = expresiones.letrasConEspacio(vm.paterno)
        dosformulario = expresiones.letrasConEspacio(vm.materno)
        tresformulario = expresiones.requerido(vm.callenumero)
        cuatroformulario = expresiones.combo(document.getElementById('alcaldia'))
        cincoformulario = expresiones.combo(document.getElementById('codigopostal'))
        seisformulario = expresiones.combo(document.getElementById('colonia'))
        sieteformulario = expresiones.telefono(vm.telefono)
        ochoformulario = expresiones.mail(vm.correo)
        nueveformulario = vm.checkavisodeprivacidad

        if (
            ceroformulario &&
            unoformulario &&
            dosformulario &&
            tresformulario &&
            cuatroformulario &&
            cincoformulario &&
            seisformulario &&
            sieteformulario &&
            ochoformulario &&
            nueveformulario &&
            modalidaddepago
        ) {
            vm.siguientedesactivado = false
            vm.siguientedosdesactivado = false
            formulariodos = true
        } else {
            vm.siguientedesactivado = true
            vm.siguientedosdesactivado = true
            formulariodos = false
        }
    }

    vm.correoFormatoValido = function() {
        vm = this
        if (!expresiones.mail(vm.correoformato)) {
            vm.correoformatovalido = true
        } else {
            vm.correoformatovalido = false
        }
    }

    vm.enviarFormatoXCorreo = function() {
            vm = this

            if (!expresiones.mail(vm.correoformato)) {
                vm.correoformatovalido = true
            } else {
                vm.correoformatovalido = false
                var datos = {
                    correoelectronico: vm.correoformato
                }
                modalAlert.progress()
                $http({
                        method: 'POST',
                        url: '../../backend/controller/guardCrud.php',
                        data: datos
                    }).then(
                        function successCallback(object) {
                            var jsonVar = object.data
                            vm.correoformato = ""
                        }, //successCallback
                        function errorCallback(object) {
                            vm.correoformato = ""
                            modalAlert.error("No se ha podido enviar el correo electr&oacute;nico por fallas de comunicaci&oacute;n, " +
                                "se le recomienda descargar el documento en el equipo que se est&aacute; usando.");
                        } //errorCallback
                    ) //then
            } //else
        } //enviarFormatoXCorreo
}