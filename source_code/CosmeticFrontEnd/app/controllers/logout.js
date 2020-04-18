var logOut = function () {
    if(localStorage.getItem("loginList")){
        localStorage.removeItem("loginList");        
    }
    window.location = "http://127.0.0.1:5001/app/view/login.html";    
}