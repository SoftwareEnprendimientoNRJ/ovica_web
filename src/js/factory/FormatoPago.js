app.factory('formatoPago', function() {
    var interfaz = {

        generar: function(pago) {
            var formato = this;
            modalAlert.progress()
            formato.imgToBase64('img/plantilla.jpg', function(pB64) {
                formato.imgToBase64('img/barcode.jpg', function(bcB64) {
                    formato.imgToBase64('img/qr.jpg', function(qrB64) {
                        formato.setValuesToFormato(pago, pB64, bcB64, qrB64)
                    });
                });
            });
        },

        imgToBase64: function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                var reader = new FileReader();
                reader.onloadend = function() {
                    return callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        },

        setValuesToFormato(pago, plantillaBase64, barcodeBase64, qrBase64) {
            var formato = this;
            var idEmbedReporte = '#formatoPagoMultiple';
            console.log('-pago', pago);
            // CONTENIDO
            var docDefinition = {
                pageSize: 'LETTER',
                pageOrientation: 'portrait',
                pageMargins: [11, 11, 11, 11],

                defaultStyle: {
                    fontSize: 8,
                },

                content: [{
                    // PLANTILLA
                    image: plantillaBase64,
                    width: 618,
                    height: 792,
                    absolutePosition: { x: 0, y: 0 }
                }, {
                    // CONCEPTO DE COBRO
                    text: pago.conceptocobro,
                    absolutePosition: { x: 40, y: 112 }
                }, {
                    // DATOS DEL CONCEPTO QUE SE PAGA
                    absolutePosition: { x: 25, y: 150 },
                    layout: {
                        hLineWidth: function(i, node) { return 0; },
                        vLineWidth: function(i, node) { return 0; },
                        paddingLeft: function(i, node) { return 15; },
                    },
                    table: {
                        widths: [275],
                        body: formato.getDatospago(pago.conceptopago)
                    }
                }, {
                    // LIQUIDACION DEL PAGO
                    absolutePosition: { x: 320, y: 160 },
                    layout: 'noBorders',
                    table: {
                        widths: [170, 83],
                        body: formato.getLiquidacionpago(pago.liquidacionpago)
                    }
                }, {
                    // TOTAL A PAGAR
                    absolutePosition: { x: 500, y: 280 },
                    layout: 'noBorders',
                    table: {
                        widths: [83],
                        body: formato.getTotalpagar(pago.totalpagar)
                    }
                }, {
                    // LINEA DE CAPTURA
                    absolutePosition: { x: 320, y: 420 },
                    layout: 'noBorders',
                    table: {
                        widths: [263],
                        body: formato.getLineacaptura(pago.lineacaptura)
                    }
                }, {
                    // CODIGO DE BARRAS
                    absolutePosition: { x: 320, y: 455 },
                    layout: 'noBorders',
                    table: {
                        widths: [263],
                        body: formato.getCodigobarras(pago.codigobarras, barcodeBase64)
                    }
                }, {
                    // CODIGO QR
                    absolutePosition: { x: 30, y: 455 },
                    layout: 'noBorders',
                    table: {
                        widths: [265],
                        body: formato.getCodigoqr(qrBase64)
                    }
                }, {
                    // LIQUIDACION DEL PAGO (CONTRIBUYENTE)
                    absolutePosition: { x: 320, y: 565 },
                    layout: 'noBorders',
                    table: {
                        widths: [170, 83],
                        body: formato.getLiquidacionpago(pago.liquidacionpago)
                    }
                }, , {
                    // TOTAL A PAGAR (CONTRIBUYENTE)
                    absolutePosition: { x: 500, y: 745 },
                    layout: 'noBorders',
                    table: {
                        widths: [83],
                        body: formato.getTotalpagar(pago.totalpagar)
                    }
                }, {
                    // LINEA DE CAPTURA (CONTRIBUYENTE)
                    absolutePosition: { x: 30, y: 725 },
                    layout: 'noBorders',
                    table: {
                        widths: [263],
                        body: formato.getLineacaptura(pago.lineacaptura)
                    }
                }, formato.addPageDetalle(pago)]
            };
            // REPORTE
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            pdfDocGenerator.getDataUrl((dataUrl) => {
                PDFObject.embed(
                    dataUrl,
                    idEmbedReporte
                );
            });

        },

        getDatospago(conceptopago) {
            var arr = [];
            if (conceptopago) {
                for (var i = 0; i < conceptopago.length; i++) {
                    arr.push([{ text: conceptopago[i].nombre }]);
                }
            }
            return arr.length > 0 ? arr : [
                []
            ];
        },

        getLiquidacionpago(liquidacionpago) {
            var arr = [];
            if (liquidacionpago) {
                for (var i = 0; i < liquidacionpago.length; i++) {
                    arr.push([{
                        text: liquidacionpago[i].concepto
                    }, {
                        text: liquidacionpago[i].importe,
                        alignment: 'right'
                    }]);
                }
            }
            return arr.length > 0 ? arr : [
                []
            ];
        },

        getTotalpagar(totalpagar) {
            var arr = [];
            if (totalpagar) {
                arr.push([{
                    text: totalpagar,
                    alignment: 'right'
                }]);
            }
            return arr.length > 0 ? arr : [
                []
            ];
        },

        getLineacaptura(lineacaptura) {
            var arr = [];
            if (lineacaptura) {
                arr.push([{
                    text: lineacaptura,
                    fontSize: 18,
                    bold: true,
                    alignment: 'center'
                }]);
            }
            return arr.length > 0 ? arr : [
                []
            ];
        },

        getCodigobarras(codigobarras, barcodeBase64) {
            var arr = [];
            if (codigobarras && barcodeBase64) {
                arr.push([{
                    text: codigobarras.vigencia,
                    alignment: 'center'
                }], [{
                    image: barcodeBase64,
                    width: 220,
                    height: 30,
                    alignment: 'center'
                }], [{
                    text: codigobarras.codigo,
                    fontSize: 8,
                    alignment: 'center',
                }]);
            }
            return arr.length > 0 ? arr : [
                []
            ];
        },

        getCodigoqr(qrBase64) {
            var arr = [];
            if (qrBase64) {
                arr.push([{
                    image: qrBase64,
                    width: 60,
                    height: 60,
                    alignment: 'center'
                }]);
            }
            return arr.length > 0 ? arr : [
                []
            ];
        },

        addPageDetalle(p) {
            var arr = [];
            if (p.detalle) {
                if (p.detalle.length > 0) {
                    arr.push([{
                        // TITULO
                        text: 'DESGLOSE DE LA LINEA DE CAPTURA:',
                        colSpan: 8,
                        bold: true,
                        fontSize: 14,
                        alignment: 'center'
                    }, {}, {}, {}, {}, {}, {}, {}], [{
                        // LIDEA DE CAPTURA
                        text: p.lineacaptura,
                        colSpan: 8,
                        bold: true,
                        fontSize: 12,
                        alignment: 'center'
                    }, {}, {}, {}, {}, {}, {}, {}]);

                    for (var i = 0; i < p.detalle.length; i++) {
                        var a = [];
                        for (var j = 0; j < 8; j++) {
                            if (i == 0 || i == (p.detalle.length - 1)) {
                                a.push({
                                    text: p.detalle[i][j].text,
                                    bold: true,
                                    fontSize: 10,
                                    alignment: (j == 0) ? 'left' : 'right'
                                });
                            } else {
                                a.push({
                                    text: p.detalle[i][j].text,
                                    alignment: (j == 0) ? 'left' : 'right'
                                });
                            }
                        }
                        arr.push(a);
                    }
                    //
                    if (p.detalleTotal) {
                        if (p.detalleTotal.length > 0) {
                            for (var k = 0; k < p.detalleTotal.length; k++) {
                                if (k == 0 || k == (p.detalleTotal.length - 1)) {
                                    arr.push([{
                                        text: p.detalleTotal[k][0],
                                        colSpan: 7,
                                        bold: true,
                                        fontSize: 14,
                                    }, {}, {}, {}, {}, {}, {}, {
                                        text: p.detalleTotal[k][1],
                                        bold: true,
                                        fontSize: 14,
                                        alignment: 'right'
                                    }]);
                                } else {
                                    arr.push([{
                                        text: p.detalleTotal[k][0],
                                        colSpan: 7,
                                        fontSize: 12,
                                    }, {}, {}, {}, {}, {}, {}, {
                                        text: p.detalleTotal[k][1],
                                        fontSize: 12,
                                        alignment: 'right'
                                    }]);
                                }
                            }
                        }
                    }
                }
            }
            console.log('arr', arr);
            return arr.length > 0 ? {
                pageOrientation: 'landscape',
                pageBreak: 'before',
                layout: {
                    hLineWidth: function(i, node) { return 0; },
                    vLineWidth: function(i, node) { return 0; },
                    paddingTop: function(i, node) { return 4; },
                    paddingBottom: function(i, node) { return 4; },
                },
                table: {
                    widths: [85, 85, 85, 85, 85, 85, 85, 100],
                    headerRows: 3,
                    body: arr
                }
            } : {}
        }

    }
    return interfaz;
});