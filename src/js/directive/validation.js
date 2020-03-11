app.directive('vCuenta', vCuenta);
app.directive('vEntero', vEntero);
app.directive('vTexto', vTexto);

function vCuenta() {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function myValidation(value) {
                mCtrl.$setValidity('validation', expresiones.cuentapredial(value));
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
}

function vEntero() {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, mCtrl) {
            function myValidation(value) {
                mCtrl.$setValidity('validation', expresiones.entero(value));
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
}

function vTexto() {
    return {
        require: 'ngModel',
        link: function (scope, $element, attr, mCtrl) {
            function myValidation(value) {
                mCtrl.$setValidity('validation', expresiones.letrasConEspacio(value));
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
  }