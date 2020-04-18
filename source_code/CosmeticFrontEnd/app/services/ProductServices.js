var ProductServices = function() {
  this.getProduct = function() {
    return axios({
      url: "http://localhost:5000/api/Product/GetAllProduct",
      method: "GET"
    });
  };
  this.getProductById = function(id) {
    return axios({
      url: "http://localhost:5000/api/Product/GetProductByID/" + id,
      method: "GET",
      data: id
    });
  };
  this.updateProduct = function(product) {
    return axios({
      url: "http://localhost:5000/api/Product/UpdateProduct",
      method: "PUT",
      data: product
    });
  };
  this.addNewProduct = function(product) {
    return axios({
      url: "http://localhost:5000/api/Product/AddProduct",
      method: "POST",
      data: product
    });
  };
  this.removeProduct = function(id) {
    return axios({
      url: "http://localhost:5000/api/Product/DeleteProduct/" + id,
      method: "DELETE"
    });
  };
};
