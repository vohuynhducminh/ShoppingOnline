var domAdmin = function (username, fullname) {
    document.querySelector('#adminAccount').innerHTML = username;
    document.querySelector('#adminName').innerHTML = fullname;
}
var domUser = function (username) {
    document.querySelector('#userName').innerHTML = username;
}
var getLocalItem = function () {
    if(localStorage.getItem("loginList")){
        var loginList = localStorage.getItem("loginList");
        var userList = JSON.parse(loginList);  
        domAdmin(userList[0].username, userList[0].name);         
        // domUser(userList[0].username);
    }    
}

getLocalItem();