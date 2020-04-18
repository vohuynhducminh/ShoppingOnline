var Admin = function() {
  var valid = true;
  var validation = new Validation();
  this.validateAdd = function() {
    username = document.querySelector("#inputUsername").value;
    password = document.querySelector("#inputPassword").value;
    address = document.querySelector("#inputAddress").value;
    fullname = document.querySelector("#inputFullName").value;
    email = document.querySelector("#inputEmail").value;

    valid =
      validation.checkBlank(username, ".add-validation", "was-validated") &
      validation.checkBlank(password, ".add-validation", "was-validated") &
      validation.checkBlank(address, ".add-validation", "was-validated") &
      validation.checkBlank(fullname, ".add-validation", "was-validated") &      
      validation.checkEmail(email, ".add-validation", "was-validated");   
    return valid; 
  };
};
