/**
 * Form Request 1.0.0
 * The form request for validation inputs form
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
var FormRequest = function() {
    function FormRequest(form) {
        $('[error-message]').hide();
        
        var input_val = {
            date: 'val()',
            email: 'val()',
            file: 'val()',
            hidden: 'val()',
            number: 'val()',
            password: 'val()',
            text: 'val()'
        };
        
        var input_prop = {
            checkbox: 'prop("checked")',
            radio: 'prop("checked")',
        };
        
        this.form       = form;
        this.input_val  = input_val;
        this.input_prop = input_prop;
    }
    
    FormRequest.prototype = Object.create(Validator.prototype);
    
    FormRequest.prototype.run = function() {
        var inputs = this.form.find('[request-rules]');
        
        for (var i = 0; i < inputs.length; i++) {
            var response = this.rules(inputs[i], this.getRules(inputs[i]));
            
            if (response.fails) {
                this.displayError(inputs[i], response.message);
                return false;
            } else {
                this.hideError(inputs[i]);
            }
        }
    };
    
    FormRequest.prototype.getValue = function(input) {
        if ($(input).attr('type') in this.input_val) {
            return $(input).val();
        }
        
        if ($(input).attr('type') in this.input_prop) {
            return $(input).prop('checked');
        }
        
        alert("Error: The type {"+$(input).attr('type')+"} ins't suported.");
    };
    
    FormRequest.prototype.getName = function(input) {
        return $(input).attr('request-name');
    };
    
    FormRequest.prototype.getRules = function(input) {
        return $(input).attr('request-rules');
    };
    
    FormRequest.prototype.displayError = function(input, message) {
        return $('[request-error="'+this.getName(input)+'"]').html(message).slideDown();
    };
    
    FormRequest.prototype.hideError = function(input, message) {
        return $('[request-error="'+this.getName(input)+'"]').hide().html();
    };
    
    FormRequest.prototype.rules = function(input, rules) {
        var callback = rules.split('|');
        
        for (var i in callback) {
            var input_value = this.getValue(input),
                input_name  = this.getName(input),
                call        = 'this.' + callback[i] + '()';
            
            if (typeof input_value == 'string') {
                if (input_value !== '') {
                    call = 'this.' + callback[i] + '("'+input_value+'")';
                }
            } else {
                call = 'this.' + callback[i] + '('+input_value+')';
            }
            
            if (!eval(call)) {
                return {fails: true, message: this.getErrors(input_name)};
            }
        }
        
        return {fails: false};
    };
    
    return FormRequest;
}();