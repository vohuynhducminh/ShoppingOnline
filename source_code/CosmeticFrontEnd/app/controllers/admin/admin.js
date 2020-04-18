var renderTableUser = function(result) {
  var content = "";
  var count = 0;
  for (var i = 0; i < result.data.length; i++) {
    count++;
    var user = result.data[i];
    content += `
            <tr>
                <td>${count}</td>
                <td>${user.username}</td>
                <td>${user.name}</td>
                <td>${user.number}</td>
                <td>${user.email}</td>
                <td>${user.address}</td>
                <td>${user.city_id}</td>
                <td>${getRole(user.role_id)}</td>  
                <td>
                  <button class='btn btn-sm btn-success' onclick="editUser('${
                    user.username
                  }')">Edit</button>
                  <button class='btn btn-danger btn-sm' onclick="removeUser('${
                    user.username
                  }')">Delete</button>
                </td>                                                            
            </tr>
        `;
  }
  document.querySelector("#tbodyUsers").innerHTML = content;
};
var getRole = function(role_id) {
  let role = "";
  role = role_id === "1" ? "Admin" : "User";
  return role;
};
var userServices = new UserServices();
var cityServices = new CityServices();
//Render to Table When We go Data
userServices
  .getUser()
  .then(renderTableUser)
  .catch(function(err) {
    console.log(err);
  });

userServices.getUser().then(function(rs) {
  var tbodyUsers = document.querySelector("#tbodyUsers");
  var tr = tbodyUsers.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    const trow = tr[i];
    const td = trow.getElementsByTagName("td");
    cityServices
      .getCityById(rs.data[i].city_id)
      .then(function(rs) {
        city = rs.data[0];
        td[6].innerHTML = city.cityName;
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
/*Scripting */
document.querySelector("#btnAddnewUser").onclick = function() {
  document.querySelector(".modal-title").innerHTML = "Add New User";
  document.querySelector("#feature").innerHTML = `
    <button type='submit' class='btn btn-success btn-sm' onclick='validateAdd()'>Save</button>
  `;
};
var editUser = function(id) {
  document.querySelector("#btnAddnewUser").click();

  document.querySelector(".modal-title").innerHTML =
    "Update User" + "'s" + " Infomation";
  document.querySelector("#feature").innerHTML = `
      <button type='submit' class='btn btn-success btn-sm' onclick='validateUpdate()'>Update</button>        
    `;
  document.querySelector("#inputUsername").setAttribute("readonly", "true");
  userServices
    .getUserById(id)
    .then(function(res) {
      var users = res.data;
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        document.querySelector("#inputUsername").value = user.username;
        document.querySelector("#inputPassword").value = user.password;
        document.querySelector("#inputAddress").value = user.address;
        document.querySelector("#inputFullName").value = user.name;
        document.querySelector("#inputPhone").value = user.number;
        document.querySelector("#inputEmail").value = user.email;
        document.querySelector("#inputRole").value = user.role_id;
        document.querySelector("#inputCity").value = user.city_id;
        cityServices.getCityById(user.city_id).then(function(result) {
          var city = result.data[0];
          document.querySelector("#inputZip").value = city.zipCode;
        });
      }
    })
    .catch(function(err) {
      console.log(err);
    });
};

/*Handle Data*/
var valid = true;
var validation = new Admin();
var validateAdd = function() {
  valid = validation.validateAdd();  
  if (valid) {
    var username = document.querySelector("#inputUsername").value;
    var password = document.querySelector("#inputPassword").value;
    var address = document.querySelector("#inputAddress").value;
    var name = document.querySelector("#inputFullName").value;
    var number = document.querySelector("#inputPhone").value;
    var email = document.querySelector("#inputEmail").value;
    var role_id = document.querySelector("#inputRole").value;
    var city_id = document.querySelector("#inputCity").value;
    var newUser = new User(
      username,
      password,
      name,
      address,
      email,
      number,
      role_id,
      city_id
    );
    console.log(newUser);
    userServices
      .addNewUser(newUser)
      .then(function() {
        userServices
          .getUser()
          .then(renderTableUser)
          .catch(function(err) {
            console.log(err);
          });
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};

var validateUpdate = function() {
  valid = validation.validateAdd();
  if (valid) {
    var username = document.querySelector("#inputUsername").value;
    var password = document.querySelector("#inputPassword").value;
    var address = document.querySelector("#inputAddress").value;
    var name = document.querySelector("#inputFullName").value;
    var number = document.querySelector("#inputPhone").value;
    var email = document.querySelector("#inputEmail").value;
    var role_id = document.querySelector("#inputRole").value;
    var city_id = document.querySelector("#inputCity").value;
    var userUpdate = new User(
      username,
      password,
      name,
      address,
      email,
      number,
      role_id,
      city_id
    );
    userServices
      .updateUser(userUpdate)
      .then(function() {      
        userServices
          .getUser()
          .then(renderTableUser)
          .catch(function(err) {
            console.log(err);
          });
        // location.reload();
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};

var removeUser = function(id) {
  var cfDialog = confirm(`Do you want to remove ${id}?`);
  if (cfDialog === true) {
    userServices
      .removeUser(id)
      .then(function(result) {
        userServices
          .getUser()
          .then(renderTableUser)
          .catch(function(err) {
            console.log(err);
          });
        // location.reload();
      })
      .catch(function(err) {
        alert("Delete Failed");
      });
  }
};

var resetContent = function() {
  var form = document.querySelector("#formAdd");
  form.reset();
  document.querySelector("#inputUsername").removeAttribute("readonly");
};

//----------------------------------------------------------------------------------------------------
//PRODUCT
var renderTableProduct = function(result) {
  var content = "";
  var count = 0;
  for (var i = 0; i < result.data.length; i++) {
    count++;
    var product = result.data[i];
    content += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.type}</td>
                <td>${product.producer}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td>${product.status}</td>  
                <td>
                  <button class='btn btn-sm btn-success' onclick="editProduct('${product.id}')">Edit</button>
                  <button class='btn btn-danger btn-sm' onclick="removeProduct('${product.id}')">Delete</button>
                </td>                                                            
            </tr>
        `;
  }
  document.querySelector("#tbodyProducts").innerHTML = content;
};
var productServices = new ProductServices();
productServices
  .getProduct()
  .then(renderTableProduct)
  .catch(function(err) {
    console.log(err);
  });


document.querySelector("#btnAddNewProduct").onclick = function() {
  document.querySelector(".product-title").innerHTML = "Add New Product";
  document.querySelector("#featureProduct").innerHTML = `
    <button type='submit' class='btn btn-success btn-sm' onclick='validateAddProduct()'>Save</button>
  `;
};

var editProduct = function(id) {
  document.querySelector("#btnAddNewProduct").click();

  document.querySelector(".product-title").innerHTML =
    "Update Product" + "'s" + " Infomation";
  document.querySelector("#featureProduct").innerHTML = `
      <button type='submit' class='btn btn-success btn-sm' onclick='validateUpdateProduct()'>Update</button>        
    `;
  document.querySelector("#inputProductID").setAttribute("readonly", "true");
  productServices
    .getProductById(id)
    .then(function(res) {
      var products = res.data;
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        document.querySelector("#inputProductID").value = product.id;
        document.querySelector("#inputProductName").value = product.name;
        document.querySelector("#inputProductType").value = product.type;
        document.querySelector("#inputProductProcedure").value =
          product.producer;
        document.querySelector("#inputProductDiscription").value =
          product.description;
        document.querySelector("#inputProductQuantity").value =
          product.quantity;
        document.querySelector("#inputProductPrice").value = product.price;
        document.querySelector("#inputProductStatus").value = product.status;
      }
    })
    .catch(function(err) {
      console.log(err);
    });
};
var validateUpdateProduct = function() {
  var productId = document.querySelector("#inputProductID").value;
  var productName = document.querySelector("#inputProductName").value;
  var productType = document.querySelector("#inputProductType").value;
  var productProcedure = document.querySelector("#inputProductProcedure").value;
  var productDes = document.querySelector("#inputProductDiscription").value;
  var productQuantity = document.querySelector("#inputProductQuantity").value;
  var productPrice = document.querySelector("#inputProductPrice").value;
  var productUpdate = new Product(
    productId,
    productName,
    productType,
    productProcedure,
    productQuantity,
    productPrice,
    productDes
  );
  console.log(productUpdate);
  productServices
    .updateProduct(productUpdate)
    .then(function() {
      productServices
        .getProduct()
        .then(renderTableProduct)
        .catch(function(err) {
          console.log(err);
        });
    })
    .catch(function(err) {
      console.log(err);
    });
};

var validateAddProduct = function() {
  var productId = document.querySelector("#inputProductID").value;
  var productName = document.querySelector("#inputProductName").value;
  var productType = document.querySelector("#inputProductType").value;
  var productProcedure = document.querySelector("#inputProductProcedure").value;
  var productDes = document.querySelector("#inputProductDiscription").value;
  var productQuantity = document.querySelector("#inputProductQuantity").value;
  var productPrice = document.querySelector("#inputProductPrice").value;
  var newProduct = new Product(
    productId,
    productName,
    productType,
    productProcedure,
    productQuantity,
    productPrice,
    productDes
  );
  productServices
    .addNewProduct(newProduct)
    .then(function() {
      productServices
        .getProduct()
        .then(renderTableProduct)
        .catch(function(err) {
          console.log(err);
        });
    })
    .catch(function(er) {
      console.log(er);
    });
};

var removeProduct = function(id) {
  var cfDialog = confirm(`Do you want to remove ${id}?`);
  if (cfDialog === true) {
    productServices
      .removeProduct(id)
      .then(function(result) {
        productServices
        .getProduct()
        .then(renderTableProduct)
        .catch(function(err) {
          console.log(err);
        });        
      })
      .catch(function(err) {
        alert("Delete Failed");
      });
  }
};


var searchByName = function () {
  var input = document.querySelector('#searchUserName');
  filter = input.value.toUpperCase();
  var tbodyUsers = document.querySelector("#tbodyUsers");
  var tr = tbodyUsers.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName('td')[1];
    if(td){
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

var searchProductByName = function () {
  var input = document.querySelector('#searchProductName');
  filter = input.value.toUpperCase();
  var tbodyUsers = document.querySelector("#tbodyProducts");
  var tr = tbodyUsers.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName('td')[1];
    if(td){
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}