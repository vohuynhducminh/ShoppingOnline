var domUserPage = function (username, selector, clsBtn) {
    document.querySelector(selector).innerHTML = username;
    document.querySelector(clsBtn).innerHTML = `
        <button onclick="logOut()" class='btn btn-sm btn-danger mt-3 ml-2'>Log out</button>
    `;    
}
var domUser = function (username) {
    document.querySelector('#userName').innerHTML = username;
}
var getLocalItem = function () {
    if(localStorage.getItem("loginList")){
        var loginList = localStorage.getItem("loginList");
        var userList = JSON.parse(loginList);  
        domUserPage("Hello " + userList[0].username, ".login-panel", ".out");
    }    
}

getLocalItem();