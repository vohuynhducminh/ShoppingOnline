var Product = function(
  id,
  name,
  type,
  producer,
  quantity,
  price,
  description
) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.producer = producer;
    this.quantity = quantity;
    this.price = price;
    this.description = description;
};

var Product_ = function (id, name, type, price, img, quantity) {
  this.id = id;
  this.name = name;  
  this.type = type;
  this.price = price;
  this.img = img;  
  this.quantity = quantity;  
}
