var CartServices = function () {
  this.addCart = function (cart) {
    return axios({
      url: "http://localhost:5000/api/Cart/AddCart",
      method: "POST",
      data: cart,
    });
  };
};
