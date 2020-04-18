var UserServices = function() {
  this.getUser = function() {
    return axios({
      url: "http://localhost:5000/api/User/GetAllUser",
      method: "GET"
    });
  };
  this.getUserById = function(userId) {
    return axios({
      url: "http://localhost:5000/api/User/GetUserByID/" + userId,
      method: "GET",
      data: userId
    });
  };
  this.addNewUser = function(user) {
    return axios({
      url: "http://localhost:5000/api/User/AddUser",
      method: "POST",
      data: user
    });
  };
  this.removeUser = function(id) {
    return axios({
      url: "http://localhost:5000/api/User/Delete/" + id,
      method: "DELETE"
    });
  };
  this.updateUser = function(user) {
    return axios({
      url: "http://localhost:5000/api/User/UpdateUser",
      method: "PUT",
      data: user
    });
  };
  this.register = function(user) {
    return axios({
      url: "http://localhost:5000/api/User/AddUser",
      method: "POST",
      data: user
    });
  };
  this.login = function(username, password) {
    return axios({
      url: "http://localhost:5000/api/User/GetLogin/" + username + "/" + password,
      method: "GET",
      data: username, password
    });
  };
};
