var Validation = function () {
    this.checkBlank = function (value, selector, classNameError) {
        if (value.trim() === '') {
            document.querySelector(selector).classList.add(classNameError)
            return false;
        }
        document.querySelector(selector).classList.remove(classNameError)
        return true;
    }
    this.checkValue = function (value, minValue, maxValue, selector, classNameError) {
        if (value < minValue || value > maxValue) {
            document.querySelector(selector).classList.add(classNameError)
            return false;
        }
        document.querySelector(selector).classList.remove(classNameError)
        return true;
    }
    this.checkEmail = function (value, selector, classNameError) {
        var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!value.match(regexEmail)) {
            document.querySelector(selector).classList.add(classNameError)
            return false;
        }
        document.querySelector(selector).classList.remove(classNameError)
        return true;
    }
    this.checkNumber = function (value, selector, classNameError) {
        var regexNumber = /^\d+$/;
        if (!value.match(regexNumber)) {
            document.querySelector(selector).classList.add(classNameError)
            return false;
        }
        document.querySelector(selector).classList.remove(classNameError)
        return true;
    }
    this.checkLength = function (value, minLength, maxLength, selector, classNameError) {
        if (value.trim().length < minLength || value.trim().length > maxLength) {
            document.querySelector(selector).classList.add(classNameError)
            return false;
        }
        document.querySelector(selector).classList.remove(classNameError)
        return true;
    }    
}

