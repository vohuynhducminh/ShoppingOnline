var productList = [];

var checkDuplicate = function (id) {
  if (productList.length == 0) {
    return -1;
  }
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].id === id) {
      return i;
    }
  }
  return -1;
};
var bookProduct = function (
  productId,
  productName,
  productType,
  productPrice,
  productImg
) {
  if (!localStorage.getItem("proList")) {
    var product = new Product_(
      productId,
      productName,
      productType,
      productPrice,
      productImg,
      1
    );
    productList.push(product);
    addToCart(productList);
    getProductList();
  } else {
    var pos = checkDuplicate(productId);
    productList = JSON.parse(localStorage.getItem("proList"));
    if (pos == -1) {
      var product = new Product_(
        productId,
        productName,
        productType,
        productPrice,
        productImg,
        1
      );

      productList.push(product);
      addToCart(productList);
      getProductList();
    } else {
      if (localStorage.getItem("proList")) {
        productList[pos].quantity++;
        // productList[pos].price *= productList[pos].quantity;
        addToCart(productList);
        getProductList();
      }
    }
  }
};

var addToCart = function (list) {
  var proList = JSON.stringify(list);
  localStorage.setItem("proList", proList);
  alert("Add Successfully!");
};

var renderPopup = function (list) {
  var tblOrderTable = "";
  var tblTable = "";
  var tblPopup = "";
  var subtotal = 0;
  var quantity_bag = 0;
  for (let i = 0; i < list.length; i++) {
    const pro = list[i];
    var newProduct = new Product_(
      pro.id,
      pro.name,
      pro.price,
      pro.type,
      pro.img,
      pro.quantity
    );
    var popup = `
      <tr>
      <td class="si-pic">
        <img
          width="74px"
          height="74px" 
          src="${pro.img}"
          alt=""
        />
      </td>
      <td class="si-text">
        <div class="product-selected">
          <p>$${pro.price}.00 x ${pro.quantity}</p>
          <h6>${pro.name}</h6>
        </div>
      </td>
      <td class="si-close">
        <i onclick="detelePopup('${pro.id}')" class="ti-close"></i>
      </td>
    </tr>
      `;
    var info = `
        <tr>
        <td class="cart-pic first-row"><img width="170px" height="170px" src="${
          pro.img
        }" alt=""></td>
        <td class="cart-title first-row">
            <h5>${pro.name}</h5>
        </td>
        <td class="p-price first-row">$${pro.price}.00</td>
        <td class="qua-col first-row">
            <div class="quantity">
                <div class="pro-qty">
                    <span onclick="decrement('${pro.id}')" class="qtybtn">-</span>                
                    <input type="text" value="${pro.quantity}">
                    <span onclick="increment('${
                      pro.id
                    }')" class="qtybtn">+</span>
                </div>
            </div>
        </td>
        <td class="total-price first-row">$${pro.price * pro.quantity}.00</td>
        <td class="close-td first-row"><i class="ti-close" onclick="detelePopup('${
          pro.id
        }')"></i></td>
    </tr>
        `;
    var tmpOrder = `    
        <li class="fw-normal">
          ${pro.name} x ${pro.quantity} <span>$${pro.price}</span>
        </li>        
              `;
    subtotal += pro.price * pro.quantity;
    tblPopup += popup;
    quantity_bag += pro.quantity;
    tblTable += info;
    tblOrderTable += tmpOrder;
  }
  if (document.querySelector("#shopping-cart-body")) {
    document.querySelector("#shopping-cart-body").innerHTML = tblTable;
  }
  if (document.querySelector("#subtol") && document.querySelector("#tol")) {
    document.querySelector("#subtol").innerHTML = "$" + subtotal + ".00";
    document.querySelector("#tol").innerHTML = "$" + subtotal + ".00";
  }
  if (document.querySelector(".tblPopup")) {
    document.querySelector(".tblPopup").innerHTML = tblPopup;
  }
  if (document.querySelector(".quantity_bag")) {
    document.querySelector(".quantity_bag").innerHTML = quantity_bag;
  }
  if (document.querySelector(".cart-price")) {
    document.querySelector(".cart-price").innerHTML = "$" + subtotal + ".00";
  }
  if (document.querySelector(".total_footer")) {
    document.querySelector(".total_footer").innerHTML = "$" + subtotal + ".00";
  }
  if (
    document.querySelector("#odtbl") &&
    document.querySelector("#fw") &&
    document.querySelector("#ttPrice")
  ) {
    document.querySelector("#odtbl").innerHTML = tblOrderTable;
    document.querySelector("#fw").innerHTML = "$" + subtotal + ".00";
    document.querySelector("#ttPrice").innerHTML = "$" + subtotal + ".00";
  }
};

var getProductList = function () {
  if (localStorage.getItem("proList")) {
    var tmp = localStorage.getItem("proList");
    proList = JSON.parse(tmp);
    renderPopup(proList);
  }
};

// var detelePopup = function (id) {
//   if (localStorage.getItem("proList")) {
//     var tmp = JSON.parse(localStorage.getItem("proList"));
//     for (let i = tmp.length - 1; i >= 0; i--) {
//       const pro = tmp[i];
//       if (pro.id === id) {
//         tmp.splice(i, 1);
//       }
//     }
//     localStorage.setItem("proList", JSON.stringify(tmp));
//     renderPopup(tmp);
//     if (tmp.length === 0) {
//       localStorage.removeItem("proList");
//     }
//   }
// };

var detelePopup = function (id) {
  if (localStorage.getItem("proList")) {
    productList = JSON.parse(localStorage.getItem("proList"));
    for (let i = productList.length - 1; i >= 0; i--) {
      const pro = productList[i];
      if (pro.id === id) {
        productList.splice(i, 1);
      }
    }
    localStorage.setItem("proList", JSON.stringify(productList));
    renderPopup(productList);
    if (productList.length === 0) {
      localStorage.removeItem("proList");
    }
  }
};



var tmpIndex = function (id, array) {
  if (array.length == 0) {
    return -1;
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      return i;
    }
  }
  return -1;
};
var increment = function (id) {
  // var valueee = document.querySelector(".qtybtn");
  if (localStorage.getItem("proList")) {
    productList = JSON.parse(localStorage.getItem("proList"));
    // var index = tmpIndex(id, productList);
    // var quan = productList[index].quantity;        
    var index = productList.findIndex((item) => item.id === id);    
    if (index !== -1 && productList[index].quantity > 0) {
      ++productList[index].quantity;
      productList = JSON.stringify(productList);
      localStorage.setItem("proList", productList);
      renderPopup(JSON.parse(localStorage.getItem("proList")));            
    }
  }
};

var decrement = function (id) {
  if (localStorage.getItem("proList")) {
    productList = JSON.parse(localStorage.getItem("proList"));           
    var index = productList.findIndex((item) => item.id === id);    
    if (index !== -1 && productList[index].quantity > 0) {
      productList[index].quantity === 1 ? 1 : --productList[index].quantity;
      productList = JSON.stringify(productList);
      localStorage.setItem("proList", productList);
      renderPopup(JSON.parse(localStorage.getItem("proList")));            
    }
  }
}

getProductList();
// var proRenderList = [
//   {
//     id: "1",
//     name: "Pure Pineapple",
//     type: "Coat",
//     price: 33,
//     img: "../../assets/img/products/product-1.jpg",
//     quantity: 1,
//   },
//   {
//     id: "2",
//     name: "Guangzhou sweater",
//     type: "Coat",
//     price: 34,
//     img: "../../assets/img/products/product-2.jpg",
//     quantity: 1,
//   },
//   {
//     id: "3",
//     name: "Guangzhou sweater",
//     type: "Jacket",
//     price: 34,
//     img: "../../assets/img/products/product-3.jpg",
//     quantity: 1,
//   },
//   {
//     id: "4",
//     name: "Microfiber Wool",
//     type: "Scarf",
//     price: 64,
//     img: "../../assets/img/products/product-4.jpg",
//     quantity: 1,
//   },
//   {
//     id: "5",
//     name: "Men Painted",
//     type: "Hat",
//     price: 74,
//     img: "../../assets/img/products/product-5.jpg",
//     quantity: 1,
//   },
//   {
//     id: "6",
//     name: "Converse Yellow",
//     type: "Warm Clothes",
//     price: 40,
//     img: "../../assets/img/products/product-6.jpg",
//     quantity: 1,
//   },
//   {
//     id: "7",
//     name: "Yellow Bag",
//     type: "Bag",
//     price: 84,
//     img: "../../assets/img/products/product-7.jpg",
//     quantity: 1,
//   },
//   {
//     id: "8",
//     name: "Layer Windbreaker",
//     type: "Coat",
//     price: 44,
//     img: "../../assets/img/products/product-8.jpg",
//     quantity: 1,
//   },
//   {
//     id: "9",
//     name: "Converse Shoes",
//     type: "Shoes",
//     price: 54,
//     img: "../../assets/img/products/product-9.jpg",
//     quantity: 1,
//   },
// ];

// var push = function () {
//   localStorage.setItem("productRenderList", JSON.stringify(proRenderList));
// }
