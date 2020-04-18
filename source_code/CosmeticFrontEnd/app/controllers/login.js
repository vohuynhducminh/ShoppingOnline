var valid = true;
var validation = new Validation();
var userList = [];
document.querySelector("#signin").onclick = function (e) {
  e.preventDefault();
  username = document.querySelector("#username").value;
  password = document.querySelector("#password").value;

  valid =
    validation.checkBlank(username, "#loginForm", "was-validated") &
    validation.checkBlank(password, "#loginForm", "was-validated");

  if (valid) {
    var userServices = new UserServices();
    userServices
      .login(username, password)
      .then(saveDataToLocalStorage)
      .catch(function (err) {
        console.log(err);
      });
  }
};

var searchAccountById = function (id) {
  if (userList.length == 0) {
    return -1;
  }
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].username === id) {
      return i;
    }
  }
  return -1;
};
var saveDataToLocalStorage = function (result) {
  if (result.data.length !== 0) {
    var usn = result.data[0].username;
    var flname = result.data[0].name;
    var role = result.data[0].role_id;
    var pos = searchAccountById(usn);
    if (pos === -1) {
      var person = new User_(usn, flname, role);
      userList.push(person);
      if (!localStorage.getItem("loginList")) {
        tmpLocalStorage(userList);
      }
      if (role == 1) {
        alert("Hello " + person.username);
        window.location = "http://127.0.0.1:5001/app/view/admin/admin.html";
      }
      if (role == 2) {
        alert("Hello " + person.username);
        window.location = "http://127.0.0.1:5001/app/view/index.html";
      }
    }
  } else {
    alert("Invalid username or password");
  }
};
var tmpLocalStorage = function (list) {
  var loginList = JSON.stringify(list);
  localStorage.setItem("loginList", loginList);
};
