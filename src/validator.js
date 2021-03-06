/*
    *Accepted (yes, on, 1, or true)
    *Alpha
    Alpha Numeric
    *Array
    *Between
    *Boolean
    *Confirmed
    *CNPJ
    *CPF
    Date
    Date Format
    Different
    Digits
    Digits Between
    Dimensions (Image Files)
    Distinct
    *E-Mail
    Exists (Database)
    File
    Filled
    Image (File)
    In
    *In Array
    *Integer
    IP Address
    JSON
    *Max
    MIME Types
    MIME Type By File Extension
    *Min
    Nullable
    Not In
    *Numeric
    Present
    *Phone
    Regular Expression
    *Required
    Required If
    Required Unless
    Required With
    Required With All
    Required Without
    Required Without All
    Same
    Size
    String
    Timezone
    Unique (Database)
    URL
    *Valid CPF
    *Valid CNPJ
*/

/**
 * Validator 1.0.0
 * The validator library
 * 
 * https://github.com/life-code/form-request
 * 
 * Copyright 2017, Vinicius Pugliesi
 * 
 * Portfolio Vinicius Pugliesi
 * http://www.viniciuspugliesi.com/
 * 
 * License MIT
 * 
 * Released on: July 31, 2017
 */
var Validator = (function() {
    function Validator() {}
    
    var errors = '';
    
    Validator.prototype.getErrors = function(name) {
        return errors.replace('{name}', '<strong>' + name + '</strong>');
    };
    
    Validator.prototype.accepted = function(data) {
        var accepted = [ 'yes', 'on', 1, '1', true, 'true' ];
        
        if (accepted.indexOf(data) <= 0) {
            errors = 'O campo {name} é inválido.';
            return false;
        }
        
        return true;
    };
    
    Validator.prototype.alpha = function(data) {
        if (data.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)) {
            return true;
        }
        
        errors = 'O campo {name} deve ser alpha.';
        return false;
    };
    
    Validator.prototype.array = function(data) {
        return (Array.isArray(data)) ? true : false;
    };
    
    Validator.prototype.between = function(data, min, max) {
        return (data >= min && data <= max) ? true : false;
    };
    
    Validator.prototype.boolean = function(data) {
        if (typeof(data) === "boolean") {
            return true;
        }
        
        var accepted = ['1', '0', 'true', 'false'];
        
        return accepted.indexOf(data);
    };
    
    Validator.prototype.confirmed = function(value1, value2) {
        return (value1 === value2) ? true : false;
    };
    
    Validator.prototype.cnpj = function(cnpj) {
        cnpj = String(cnpj);
        return (cnpj.match(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/)) ? true : false;
    };
    
    Validator.prototype.cpf = function(cpf) {
        cpf = String(cpf);
        return (cpf.match(/[/0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/)) ? true : false;
    };
    
    Validator.prototype.email = function(email) {
        email = String(email);
        
        if (email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.) {3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
            return true;
        }
        
        errors = 'O campo {name} deve conter um email válido.';
        return false;
    };
    
    Validator.prototype.in_array = function(key, array) {
        array = array.split(',');
        
        for (var i = 0; i < array.length; i++) {
            if (array[i] == key) {
                return true;
            }
        }
        
        errors = 'O campo {name} deve estar presente na lista: '+array;
        return false;
    };
    
    Validator.prototype.integer = function(data) {
        if (data % 1 === 0 && !isNaN(data % 1)) {
            return true;
        }
        
        errors = 'O campo {name} deve ser inteiro.';
        return false;
    };
    
    Validator.prototype.max = function(data, length) {
        if (data.length <= length) {
            return true;
        }
        
        errors = 'O campo {name} deve ter no máximo '+length+' caracteres.';
        return false;
    };
    
    Validator.prototype.min = function(data, length) {
        if (data.length >= length) {
            return true;
        }
        
        errors = 'O campo {name} deve ter no mínimo '+length+' caracteres.';
        return false;
    };
    
    Validator.prototype.numeric = function(data) {
        if (typeof data === 'number' || !data.match(/^\d+(\.\d{1,2})?$/)) {
            return true;
        }
        
        errors = 'O campo {name} deve ser do tipo numérico.';
        return false;
    };
    
    Validator.prototype.phone = function(phone) {
        phone = String(phone);
        
        if (!phone.match(/^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/)) {
            return true;
        }
        
        errors = 'O campo {name} é inválido.';
        return false;
    };
    
    Validator.prototype.required = function(data) {
        if (!data) {
            errors = 'O campo {name} é obrigário.';
            return false;
        }
        
        data = String(data);
        
        if (data === 'undefined' || data === '') {
            errors = 'O campo {name} é obrigário.';
            return false;
        }
        
        return true;
    };
    
    Validator.prototype.valid_cpf = function (cpf) {
        if (!this.cpf(cpf)) {
            errors = 'O campo {name} é inválido.';
            return false;
        }
        
        cpf = cpf.replace(/\./g, '').replace('-', '');
        
        var invalid_cpf = [
            '11111111111', '22222222222', '33333333333', '44444444444', 
            '55555555555', '66666666666', '77777777777', '88888888888', 
            '99999999999'
        ];
    
        if (invalid_cpf.indexOf(cpf) > 0 || cpf === '00000000000') {
            errors = 'O campo {name} é inválido.';
            return false;
        }
        
        var sum = 0, rest;
        
    	for (var i = 1; i <= 9; i++) {
    	    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    	}
    	
    	rest = (sum * 10) % 11;
    	
        if (rest === 10 || rest === 11) {
            rest = 0;
        }
        
        if (rest !== parseInt(cpf.substring(9, 10))) {
            errors = 'O campo {name} é inválido.';
            return false;
        }
        
    	sum = 0;
    	
        for (var i = 1; i <= 10; i++) {
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        
        rest = (sum * 10) % 11;
    	
        if (rest === 10 || rest === 11) {
            rest = 0;
        }
        
        if (rest !== parseInt(cpf.substring(10, 11))) {
            errors = 'O campo {name} é inválido.';
            return false;
        }
        
        return true;
    };
    
    Validator.prototype.valid_cnpj = function(cnpj) {
        if (!this.cnpj(cnpj)) {
            errors = 'O campo {name} é inválido.';
            return false;
        }
        
        cnpj = cnpj.replace(/[^\d]+/g,'');
        
        if (cnpj === '00000000000000') {
            errors = 'O campo {name} é inválido.';
            return false;
        }
        
        var tamanho = cnpj.length - 2;
        var numeros = cnpj.substring(0,tamanho);
        var digitos = cnpj.substring(tamanho);
        var soma    = 0;
        var pos     = tamanho - 7;
        
        for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        
        var resultado = (soma % 11 < 2) ? 0 : 11 - soma % 11;
        
        if (parseInt(resultado) !== parseInt(digitos.charAt(0))) {
            errors = 'O campo {name} é inválido.';
            return false;
        }
        
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma    = 0;
        pos     = tamanho - 7;
        
        for (var i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        
        resultado = (soma % 11 < 2) ? 0 : 11 - soma % 11;
        
        if (parseInt(resultado) !== parseInt(digitos.charAt(1))) {
            errors = 'O campo {name} é inválido.';
            return false;
        }
        
        return true;
    };
    
    return Validator;
})();