/*
    Accepted
    Active URL
    After (Date)
    After Or Equal (Date)
    *Alpha
    Alpha Dash
    Alpha Numeric
    Array
    Before (Date)
    Before Or Equal (Date)
    Between
    Boolean
    Confirmed
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
    *Empty
    Exists (Database)
    File
    Filled
    Image (File)
    In
    In Array
    *Integer
    IP Address
    JSON
    Max
    MIME Types
    MIME Type By File Extension
    Min
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

var Validator = (function(){
    function Validator(){}
    
    var errors;
    
    Validator.prototype.alpha = function(data){
        return (data.match(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/)) ? true : false;
    };
    
    Validator.prototype.cnpj = function(cnpj){
        cnpj = String(cnpj);
        return (cnpj.match(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/)) ? true : false;
    };
    
    Validator.prototype.cpf = function(cpf){
        cpf = String(cpf);
        return (cpf.match(/[/0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/)) ? true : false;
    };
    
    Validator.prototype.email = function(email){
        email = String(email);
        return (email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) ? true : false;
    };
    
    Validator.prototype.empty = function(data, length){
        return (data === '' || data.length < length);
    };
    
    Validator.prototype.integer = function(data){
        return (data % 1 === 0 && !isNaN(data % 1));
    };
    
    Validator.prototype.numeric = function(data){
        if (typeof data === 'number') {
            return true;
        }
        
        return (data.match(/^[0-9]+$/)) ? true : false;
    };
    
    Validator.prototype.phone = function(phone){
        phone = String(phone);
        return (phone.match(/^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/)) ? true : false;
    };
    
    Validator.prototype.required = function(data){
        return (data !== '');
    };
    
    Validator.prototype.validCpf = function (cpf){
        if (!this.cpf(cpf)) {
            return false;
        }
        
        cpf = cpf.replace(/\./g, '').replace('-', '');
        
        var sum = 0, rest;
        
    	for (var i = 1; i <= 9; i++) {
    	    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    	}
    	
    	rest = (sum * 10) % 11;
    	
        if (rest === 10 || rest === 11) {
            rest = 0;
        }
        
        if (rest !== parseInt(cpf.substring(9, 10))) {
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
        
        return (rest === parseInt(cpf.substring(10, 11))) ? true : false;
    };
    
    Validator.prototype.validCnpj = function(cnpj){
        if (!this.cnpj(cnpj)) {
            return false;
        }
        
        cnpj = cnpj.replace(/[^\d]+/g,'');
        
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
        
        return (parseInt(resultado) === parseInt(digitos.charAt(1))) ? true : false;
    };
    
    Validator.prototype.rule = function(data, rules){
        
    };
    
    return Validator;
})();