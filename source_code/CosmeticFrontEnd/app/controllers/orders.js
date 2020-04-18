var shpServices = new ShoppingCartServices();
var cartServices = new CartServices();
var orderServices = new OrderServices();
var shpCart_id = 4;
document.querySelector("#checkout").onclick = function (e) {
  e.preventDefault();
  checkLogin();
};

var checkLogin = function () {
  if (!localStorage.getItem("loginList")) {
    alert("You have to Login first!");
    window.location = "http://127.0.0.1:5001/app/view/login.html";
  } else {
    shpCart();
    //   orderAccount();
    // cartOrder();
  }
};
var shpCart = function () {
  var shop = new Shopping_Cart(shpCart_id, 502);
  shpServices
    .addShoppingCart(shop)
    .then(orderAccount)
    .catch(function (err) {
      console.log(err);
    });
};

var orderAccount = function () {
  if (localStorage.getItem("loginList")) {
    var data = JSON.parse(localStorage.getItem("loginList"));
    user_id = data[0].username;
    order_id = Math.floor(Math.random() * 1000);
    id = order_id.toString();
    var today = new Date();
    var day =
      today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
    var order = new Order(
      id,
      user_id,
      day,
      "An Giang",
      "1",
      "1",
      "1",
      "true",
      "1"
    );
    console.log(order);
    orderServices
      .addOrder(order)
      .then(cartOrder)
      .catch(function (err) {
        console.log(err);
      });
  }
};

var cartOrder = function () {
  if (localStorage.getItem("proList")) {
    var cartData = JSON.parse(localStorage.getItem("proList"));
    for (let i = 0; i < cartData.length; i++) {
      var quantity = cartData[i].quantity;
      var product_id = cartData[i].id;
      var cartId = Math.floor(Math.random() * 1000);
      cart_id = cartId.toString();
      var carts = new Cart(cart_id, product_id, 1, 1, quantity);
      // console.log(carts);
      cartServices
        .addCart(carts)
        .then(function () {
          alert("Add Cart Successfully!");
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }
};

// var renderListProduct = function (list) {
//   var tblTable = "";
//   var subtotal = 0;
//   for (let i = 0; i < list.length; i++) {
//     const pro = list[i];
//     var newProduct = new Product_(
//       pro.id,
//       pro.name,
//       pro.price,
//       pro.img,
//       pro.quantity
//     );
//     var info = `    
//     <li class="fw-normal">
//       ${pro.name} x ${pro.quantity} <span>$${pro.price}</span>
//     </li>        
//           `;
//     subtotal += pro.price * pro.quantity;
//     tblTable += info;
//   }
//   document.querySelector("#odtbl").innerHTML = tblTable;
//   document.querySelector("#fw").innerHTML = "$" + subtotal;
//   document.querySelector("#ttPrice").innerHTML = "$" + subtotal;
// };

// var getProductList = function () {
//     if (localStorage.getItem("proList")) {
//       var tmp = localStorage.getItem("proList");
//       proList = JSON.parse(tmp);
//       renderListProduct(proList);
//     }
//   };

//   getProductList();