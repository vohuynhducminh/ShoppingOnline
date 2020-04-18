var User = function (email, password, address, number) {
    this.email = email;
    this.password = password;
    this.address = address;
    this.number = number;
}

var User = function (username, password, name, address, email, number, role_id, city_id) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.address = address;
    this.email = email;
    this.number = number;
    this.role_id = role_id;
    this.city_id = city_id;
}

var User_ = function (username, name, role_id) {
    this.username = username;
    this.name = name;
    this.role_id = role_id;
}
