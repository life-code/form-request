# Documentation - Form Request

## Validators:
* [Accepted](#accepted)
* [After](#after)
* [Alpha](#alpha)
* [Array](#array)
* [Between](#between)
* [Boolean](#boolean)
* [Confirmed](#confirmed)
* [CNPJ](#cnpj)
* [CPF](#cpf)
* [Email](#email)
* [In array](#in_array)
* [Integer](#integer)
* [Max](#max)
* [Min](#min)
* [Numeric](#numeric)
* [Phone](#phone)
* [Required](#required)
* [Valid CPF](#validCpf)
* [Valid CNPJ](#validCnpj)

### accepted
The field under validation must be yes, on, 1, or true. This is useful for validating "Terms of Service" acceptance.

### alpha
The field under validation must be entirely alphabetic characters.

### array
The field under validation must be a JAVASCRIPT array.

### between:min,max
The field under validation must have a size between the given min and max. Strings, numerics, arrays, and files are evaluated in the same fashion as the size rule.

### boolean
The field under validation must be able to be cast as a boolean. Accepted input are true, false,  1, 0, "1", and "0".

### confirmed
The field under validation must have a matching field of foo_confirmation. For example, if the field under validation is password, a matching password_confirmation field must be present in the input.

### cnpj
The field under validation must be valid CNPJ with or without a mask.

### cpf
The field under validation must be valid CPF with or without a mask.

### email
The field under validation must be formatted as an e-mail address.

### in_array:value1,value2,...
The field under validation must exist in anotherfield's values.

### integer
The field under validation must be an integer.

### max:value
The field under validation must be less than or equal to a maximum value. Strings, numerics, arrays, and files are evaluated in the same fashion as the size rule.

### min:value
The field under validation must have a minimum value. Strings, numerics, arrays, and files are evaluated in the same fashion as the size rule.

### numeric
The field under validation must be numeric.

### phone
The field under validation must be phone/cell phone with or without a mask.

### required
The field under validation must be present in the input data and not empty. A field is considered "empty" if one of the following conditions are true:

* The value is null.
* The value is an empty string.
* The value is an empty array or empty Countable object.
* The value is an uploaded file with no path.

### valid_cpf
The field under validation must be valid CPF.

### valid_cnpj
The field under validation must be valid CNPJ.