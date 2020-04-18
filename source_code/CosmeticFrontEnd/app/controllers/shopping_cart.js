var renderTable = function (list) {
  var tblTable = "";
  // var tblPopup = "";
  var subtotal = 0;
  for (let i = 0; i < list.length; i++) {
    const pro = list[i];
    var newProduct = new Product_(
      pro.id,
      pro.name,
      pro.price,
      pro.img,
      pro.quantity
    );
    var info = `
        <tr>
        <td class="cart-pic first-row"><img width="170px" height="170px" src="${pro.img}" alt=""></td>
        <td class="cart-title first-row">
            <h5>${pro.name}</h5>
        </td>
        <td class="p-price first-row">$${pro.price}</td>
        <td class="qua-col first-row">
            <div class="quantity">
                <div class="pro-qty">
                    <span class="dec qtybtn">-</span>                
                    <input type="text" value="${pro.quantity}">
                    <span class="inc qtybtn">+</span>
                </div>
            </div>
        </td>
        <td class="total-price first-row">$${pro.price * pro.quantity}</td>
        <td class="close-td first-row"><i class="ti-close" onclick="deteleLocalStorage('${pro.id}')"></i></td>
    </tr>
        `;
    //   var popup = `
    //   <tr>
    //   <td class="si-pic">
    //     <img
    //       width="74px"
    //       height="74px" 
    //       src="${pro.img}"
    //       alt=""
    //     />
    //   </td>
    //   <td class="si-text">
    //     <div class="product-selected">
    //       <p>$${pro.price}.00 x ${pro.quantity}</p>
    //       <h6>${pro.name}</h6>
    //     </div>
    //   </td>
    //   <td class="si-close">
    //     <i class="ti-close"></i>
    //   </td>
    // </tr>
    //   `;
    subtotal += pro.price * pro.quantity;
    tblTable += info;
    // tblPopup += popup;
  }
  if(document.querySelector("#shopping-cart-body")){
    document.querySelector("#shopping-cart-body").innerHTML = tblTable;
  }
  // if(document.querySelector(".tblPopup")){
  //   document.querySelector(".tblPopup").innerHTML = tblPopup;
  // }
  if(document.querySelector("#subtol") && document.querySelector("#tol")){
    document.querySelector("#subtol").innerHTML = "$" + subtotal;
    document.querySelector("#tol").innerHTML = "$" + subtotal;
  }
  
};

var getProductList = function () {
  if (localStorage.getItem("proList")) {
    var tmp = localStorage.getItem("proList");
    List = JSON.parse(tmp);    
    renderTable(List);
  }
};


var deteleLocalStorage = function (id) {
  if (localStorage.getItem("proList")) {
    var proList = localStorage.getItem("proList");
    var tmp = JSON.parse(proList);
    for (let i = tmp.length - 1; i >= 0; i--) {
      const pro = tmp[i];
      if (pro.id === id) {
        tmp.splice(i, 1);        
      }
    }
    saveDataToLocalStorage(tmp);
    renderTable(tmp);
    if (tmp.length === 0) {
      localStorage.removeItem("proList");
    }
  }
};

var saveDataToLocalStorage = function (list) {
  var stdList = JSON.stringify(list);
  localStorage.setItem("proList", stdList);
};
getProductList();
