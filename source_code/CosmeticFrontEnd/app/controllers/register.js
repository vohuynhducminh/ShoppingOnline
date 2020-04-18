var regisValid = true;
var validation = new Validation();
var regis = new UserServices();
bootstrapValidate("#inputEmail", "email:Enter a valid email address");
bootstrapValidate(
  "#cfmPass",
  "matches:#inputPassword:Your password should matche!"
);
bootstrapValidate("#inputUsername", "min:1:Please fill out your account");
bootstrapValidate("#inputPassword", "min:1:Please fill out your password");
document.querySelector("#resgis").onclick = function(e) {
  e.preventDefault();

  var username = document.querySelector("#inputUsername").value;
  var password = document.querySelector("#inputPassword").value;
  var cfmPass = document.querySelector("#cfmPass").value;
  var address = document.querySelector("#inputAddress").value;
  var name = document.querySelector("#inputFullName").value;
  var email = document.querySelector("#inputEmail").value;
  var city_id = document.querySelector("#inputCity").value;

  window.addEventListener("load", function() {});
  
  regisValid =
    validation.checkBlank(username, "#inputUsername", "is-invalid") & 
    validation.checkBlank(password, "#inputPassword", "is-invalid") & 
    validation.checkBlank(cfmPass, "#cfmPass", "is-invalid") & 
    validation.checkBlank(email, "#inputEmail", "is-invalid") &
    validation.checkEmail(email, "#inputEmail", "is-invalid") &
    // xxx.PromiseValue &
    (password === cfmPass)
      ? true
      : false;

 var checkDup = regis.getUser().then(function(res) {
      var usersDtb = res.data;    
      for (let i = 0; i < usersDtb.length; i++) {
          const userDtb = usersDtb[i];          
          if(username === userDtb.username){
              document.querySelector('#inputUsername').classList.add('is-invalid');
              document.querySelector('#taken').style.display = 'block';              
              return false;             
          }                   
      } 
      return true;      
    })
    .catch(function(err) {
      console.log(err);
    });
  
  
  if (regisValid) {
    var userRegis = new User(
      username,
      password,
      name,
      address,
      email,
      "",
      2,
      city_id
    );
    regis
      .register(userRegis)
      .then(function() {
        alert("Register Successfully!");        
        document.querySelector(".register-validation").reset();
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};

