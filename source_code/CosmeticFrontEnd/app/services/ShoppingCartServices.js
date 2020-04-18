var ShoppingCartServices = function () {
  this.addShoppingCart = function (shopping_cart) {
    return axios({
      url: "http://localhost:5000/api/ShoppingCart/AddShoppingCart",
      method: "POST",
      data: shopping_cart,
    });
  };
};
