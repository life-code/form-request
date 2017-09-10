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
            date: '',
            email: '',
            file: '',
            hidden: '',
            number: '',
            password: '',
            text: ''
        };
        
        var input_prop = {
            checkbox: 'prop("checked")',
            radio: 'prop("checked")',
        };
        
        this.form       = form;
        this.input_val  = input_val;
        this.input_prop = input_prop;
        
        this.hideError();
    }
    
    FormRequest.prototype = Object.create(Validator.prototype);
    
    FormRequest.prototype.run = function() {
        var inputs = this.form.find('[rules]');
        
        for (var i = 0; i < inputs.length; i++) {
            var response = this.rules(inputs[i]);
            
            if (response.fails) {
                this.showError(inputs[i], response.message);
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
        return $(input).attr('request');
    };
    
    FormRequest.prototype.getRules = function(input) {
        return $(input).attr('rules');
    };
    
    FormRequest.prototype.showError = function(input, message) {
        return $('[error="'+this.getName(input)+'"]').html(message).fadeIn(300);
    };
    
    FormRequest.prototype.hideError = function(input) {
        return (!input) 
                ? $('[error]').hide().html('')
                : $('[error="'+this.getName(input)+'"]').hide().html('');
    };
    
    FormRequest.prototype.generateCall = function(input_value, callback) {
        var params = callback.split(':')[1];
        var call   = 'this.'+callback.split(':')[0]+'(';
        
        if (typeof input_value == 'string' && input_value !== '') {
            call += '"'+input_value+'"';
        } else {
            call += input_value;
        }
        
        if (typeof params !== 'undefined') {
            call += ', "'+params+'"';
        }
        
        return eval(call+')');
    };
    
    FormRequest.prototype.rules = function(input) {
        var callback = this.getRules(input).split('|');
        
        for (var i in callback) {
            if (!this.generateCall(this.getValue(input), callback[i])) {
                return {fails: true, message: this.getErrors(this.getName(input))};
            }
        }
        
        return {fails: false};
    };
    
    return FormRequest;
}();