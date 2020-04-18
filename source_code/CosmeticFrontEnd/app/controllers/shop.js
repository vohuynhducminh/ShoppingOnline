var afterList = [];
var searchProductByName = function () {
  var input = document.querySelector("#category");
  var keyword = input.value.toLowerCase();
  if (localStorage.getItem("productRenderList")) {
    var tmp = JSON.parse(localStorage.getItem("productRenderList"));    
    afterList = tmp.filter(
      (item) => item.name.toLowerCase().indexOf(keyword) !== -1
    );    
    renderCartList(afterList);
  }
};

var searchProductByPrice = function () {
    var min = document.querySelector("#minamount").value.slice(1,3);
    var max = document.querySelector('#maxamount').value.slice(1,3);
    if (localStorage.getItem("productRenderList")) {
      var tmp = JSON.parse(localStorage.getItem("productRenderList"));  
      // console.log(tmp[1].price.indexOf(min));  
      afterList = tmp.filter(
        (item) => item.price < max
      );    
      // console.log(afterList);
      renderCartList(afterList);
    }  
}
var viewData = function () {
  //   var min = document.querySelector("#minamount").value.slice(1,3);
  //   console.log(min);
  getProductRenderList();
};

var renderCartList = function (list) {
  var cpl = "";
  for (let i = 0; i < list.length; i++) {
    const pro = list[i];
    var cplInfo = `
    <div class="col-lg-4 col-sm-6">
    <div class="product-item">
        <div class="pi-pic">
            <img src="${pro.img}" alt="">
            <div class="sale pp-sale">Sale</div>
            <div class="icon">
                <i class="icon_heart_alt"></i>
            </div>
            <ul>
                <li class="w-icon active"><a style="cursor: pointer;"><i onclick="bookProduct('${pro.id}', '${pro.name}', '${pro.type}', ${pro.price},  '${pro.img}')" class="icon_bag_alt"></i></a></li>
                <li class="quick-view"><a href="#">+ Quick View</a></li>
                <li class="w-icon"><a href="#"><i class="fa fa-random"></i></a></li>
            </ul>
        </div>
        <div class="pi-text">
            <div class="catagory-name">${pro.type}</div>
            <a href="#">
                <h5>${pro.name}</h5>
            </a>
            <div class="product-price">
                $${pro.price}.00
                <span>$135.00</span>
            </div>
        </div>
    </div>
</div>
    `;
    cpl += cplInfo;
  }
  document.querySelector("#cpl").innerHTML = cpl;
};

var getProductRenderList = function () {
  if (localStorage.getItem("productRenderList")) {
    var productRenderList = JSON.parse(
      localStorage.getItem("productRenderList")
    );
    renderCartList(productRenderList);
  }
};

getProductRenderList();
