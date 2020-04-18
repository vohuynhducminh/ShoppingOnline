var OrderServices = function () {
  this.addOrder = function (order) {
    return axios({
      url: "http://localhost:5000/api/Order/AddOrder",
      method: "POST",
      data: order,
    });
  };
};
