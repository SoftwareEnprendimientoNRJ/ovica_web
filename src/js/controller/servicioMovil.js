app.controller('servicioCtrlMovil', [
    '$http',
    'dataFactory',
    'dataCDMX',
    servicioController
])

function servicioController($http, dataFactory, dataCDMX) {
    vm = this
    vm.fotos = dataFactory.fotoAerea

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
        $http({
            method: 'GET',
            url: 'https://api-sepomex.hckdrk.mx/query/get_cp_por_municipio/' +
                vm.selectAlcaldia
        }).then(
            function successCallback(object) {
                var jsonVar = object.data.response.cp
                vm.codigos = jsonVar
            },
            function errorCallback(object) {
                console.log('error: ' + object)
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

    vm.setAlcaldiaModal = function() {
        vm = this
        vm.alcaldiasModal = dataCDMX.alcaldias
    }

    vm.selectCodigoPostalXAlcaldiaModal = function() {
        vm = this
        var mySet = new Set()
        limite = dataCDMX.cdmx.length
        for (i = 0; i < limite; i++) {
            if (dataCDMX.cdmx[i].idMunicipio === vm.selectAlcaldiaModal.idalcaldia) {
                mySet.add(dataCDMX.cdmx[i].cp)
            }
        }
        var arreglo = []
        for (let item of mySet) {
            arreglo.push(item)
        }
        vm.codigosModal = arreglo
    }

    vm.selectColoniaXCodigoPostalModal = function() {
        vm = this
        vm = this
        var mySet = new Set()
        limite = dataCDMX.cdmx.length
        for (i = 0; i < limite; i++) {
            if (
                dataCDMX.cdmx[i].idMunicipio === vm.selectAlcaldiaModal.idalcaldia &&
                dataCDMX.cdmx[i].tipo === 'Colonia' &&
                dataCDMX.cdmx[i].cp === vm.selectCodigoPostalModal
            ) {
                mySet.add(dataCDMX.cdmx[i].asentamiento)
            }
        }
        var arreglo = []
        for (let item of mySet) {
            arreglo.push(item)
        }
        vm.coloniasModal = arreglo
    }

    vm.showMapMovil = function() {
        // The location of Uluru
        var uluru = {
            lat: 19.32108,
            lng: -99.15321
        };
        // The map, centered at Uluru
        var map = new google.maps.Map(
            document.getElementById('mapmovil'), {
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

        cdmxPolygon.setMap(map)
        drawingManager.setMap(map);

        var busquedaControlDiv = document.createElement('div');
        vm.BusquedaControl(busquedaControlDiv);

        busquedaControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(busquedaControlDiv);

    }

    vm.setAlcaldiaModal()
}