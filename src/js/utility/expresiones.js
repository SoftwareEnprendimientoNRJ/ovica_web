// JavaScript Document
// Author: edgar.salinas
// yo.edgar.salinas@gmail.com
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++EXPRESIONES REGULARES+++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
expresiones = {
    noRequerido: function(campo) {
        var valor = campo.replace(/^\s+|\s+$/g, "");
        if (valor == "") {
            return true;
        } else {
            return false;
        }
    },
    requerido: function(campo) {
        if (campo === undefined) {
            return false
        }
        var RegExPattern = /[^.*]/;
        if (!(campo.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },
    usuario: function(campo) {
        if (campo === undefined) {
            return false
        }
        var valor = campo.replace(/^\s+|\s+$/g, "");;
        var RegExPattern = /^([a-z]+[.]{1,1}[a-z]+)$/i;
        if (!(valor.match(RegExPattern)) || valor.length < 5) {
            return false;
        } else {
            return true;
        }
    },

    //La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, 
    //al menos una minúscula y al menos una mayúscula.
    contrasenia: function(campo) {
        if (campo === undefined) {
            return false
        }
        var valor = campo.replace(/^\s+|\s+$/g, "");
        var RegExPattern = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,16})$/;
        if (!(valor.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },

    //La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito,
    //al menos una minúscula y al menos una mayúscula.
    contraseniaSimbolo: function(campo) {
        if (campo === undefined) {
            return false
        }
        var valor = campo.replace(/^\s+|\s+$/g, "");
        var RegExPattern = /(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
        if (!(valor.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },

    contraseniaConfirmar: function(campoUno, campoDos) {
        if (campoUno === undefined || campoDos === undefined) {
            return false
        }
        var valorUno = campoUno.value;
        var valorDos = campoDos.value;
        if (valorUno != valorDos) {
            return false;
        } else {
            return true;
        }
    },

    unaLetra: function(campo) {
        if (campo === undefined) {
            return false
        }
        var valor = campo.replace(/^\s+|\s+$/g, "");
        var RegExPattern = /^[a-zA-Z]{1}$/;
        if (!(valor.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },

    letrasConEspacio: function(campo) {
        if (campo === undefined) {
            return false
        }
        var valor = campo.replace(/^\s+|\s+$/g, "");
        var RegExPattern = /^[a-zA-ZñÑ ]+$/i;
        if (!(valor.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },

    letrasGuionPuntoEspacio: function(campo) {
        if (campo === undefined) {
            return false
        }
        var valor = campo.replace(/^\s+|\s+$/g, "");
        var RegExPattern = /^[a-z0-9 ._-]+$/i;
        if (!(valor.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },

    letrasGuionPuntoSinEspacio: function(campo) {
        if (campo === undefined) {
            return false
        }
        var valor = campo.replace(/^\s+|\s+$/g, "");;
        var RegExPattern = /^[a-z0-9._-]+$/i;
        if (!(valor.match(RegExPattern))) {} else {
            return true;
        }
    },

    alfanumerico: function(campo) {
        if (campo === undefined) {
            return false
        }
        var valor = campo.replace(/^\s+|\s+$/g, "");
        var RegExPattern = /^[a-z0-9]+$/i;
        if (!(valor.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },

    telefono: function(campo) {
        if (campo === undefined) {
            return false
        }
        var RegExPattern = /^\d{10}$/;
        if (!(campo.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },

    decimal: function(campo) {
        if (campo === undefined) {
            return false
        }
        var RegExPattern = /^\d*\.?\d{1,2}?$/;
        if (!(campo.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },

    double: function(campo) {
        if (campo === undefined) {
            return false
        }
        var RegExPattern = /^-?\d*\.?\d+$/;
        if (!(campo.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },

    entero: function(campo) {
        var RegExPattern = /^\d+$/;
        if (!(campo.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },

    cuentapredial: function(campo) {
        if (campo === undefined) {
            return false
        }
        var RegExPattern = /^[a-zA-Z0-9]{12}$/i;
        if (!(campo.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },

    combo: function(campo) {
        indice = campo.selectedIndex;
        if (indice == null || indice == 0) {
            return false;
        } //fin de if
        else {
            return true;
        }
    },

    compararCombo: function(comboUno, comboDos) {
        if (comboUno.selectedIndex >= comboDos.selectedIndex) {
            return false;
        } else {
            return true;
        }
    },

    rfcFisico: function(campo) {
        if (campo === undefined) {
            return false
        }
        //primero quitar espacios trim
        var valor = campo.replace(/^\s+|\s+$/g, "");
        //establece la expresion regular
        var RegExPattern = /^([a-zA-ZñÑ]{4}[0-9]{6}([a-zA-ZñÑ|0-9]{3})?)$/;
        if (!(valor.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },

    rfcMoral: function(campo) {
        if (campo === undefined) {
            return false
        }
        //primero quitar espacios trim
        var valor = campo.replace(/^\s+|\s+$/g, "");
        //establece la expresion regular
        var RegExPattern = /^([a-zA-Z]{3}[0-9]{6}[a-zA-Z0-9]{3})$/;
        if (!(valor.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },

    rfcFisicoMoral: function(campo) {
        if (campo === undefined) {
            return false
        }
        //primero quitar espacios trim
        var valor = campo.replace(/^\s+|\s+$/g, "");
        //establece la expresion regular
        var RegExPattern = /^([a-zA-ZñÑ]{4}[0-9]{6}([a-zA-ZñÑ|0-9]{3})?)$/;
        if (!(valor.match(RegExPattern))) {
            RegExPattern = /^([a-zA-Z]{3}[0-9]{6}[a-zA-Z0-9]{3})$/;
            if (!(valor.match(RegExPattern))) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    },

    mail: function(campo) {
        if (campo === undefined) {
            return false
        }
        //primero quitar espacios trim
        var valor = campo.replace(/^\s+|\s+$/g, "");
        //establece la expresion regular
        var RegExPattern = /^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
        if (!(valor.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },

    url: function(campo) {
        if (campo === undefined) {
            return false
        }
        //primero quitar espacios trim
        var valor = campo.replace(/^\s+|\s+$/g, "");
        //establece la expresion regular
        var RegExPattern = /^(https|http?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?$/;
        if (!(valor.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },

    codigoPostal: function(campo) {
        if (campo === undefined) {
            return false
        }
        //primero quitar espacios trim
        var valor = campo.replace(/^\s+|\s+$/g, "");
        //establece la expresion regular
        var RegExPattern = /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/;
        if (!(valor.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    },

    fecha: function(campo) {
        if (campo === undefined) {
            return false
        }
        var valor = campo.replace(/^\s+|\s+$/g, "");
        var RegExPattern = /^([0-9]{4}-[0-9]{2}-[0-9]{2})$/;

        if (!(valor.match(RegExPattern))) {
            return false;
        } else {
            return true;
        }
    }
};

mensajes = {
    success: function() {
        return "PROCESO EXITOSO";
    },
    error: function() {
        return "ERROR EN EL PROCESO";
    },
    errorEmail: function() {
        return "LA CUENTA DE CORREO YA EXISTE";
    },
    errorCelular: function() {
        return "EL TELEFONO CELULAR YA EXISTE";
    },
    errorObligatorio: function() {
        return "TODOS LOS CAMPOS SON OBLIGATORIOS";
    }
};

modalAlert = {
    progress: function() {
        $('#progressModal').modal();
        setTimeout(function() {
            $('#progressModal').modal('hide');
        }, 2000);
    },

    error: function(mensaje) {
        $('#errorModal').modal();
        $("#mensajeerrormodal").html(mensaje);
    },

    progressInicio: function() {
        $('#progressInicio').css('height', '7pt');
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
    }
}