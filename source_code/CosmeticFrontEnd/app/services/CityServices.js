var CityServices = function() {
  this.getCity = function() {
    return axios({
      url: "http://localhost:5000/api/City/GetAllCity",
      method: "GET"
    });
  };
  this.getCityById = function(id) {
    return axios({
      url: "http://localhost:5000/api/City/GetCityById/" + id,
      method: "GET",
      data: id
    });
  };
};
