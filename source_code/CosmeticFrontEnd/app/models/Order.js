var Order = function (id, user_id, date, place, city_id, delivery_id, payment_id, status, shoppingcart_id) {
    this.id = id;
    this.user_id = user_id;
    this.date = date;
    this.place = place;
    this.city_id = city_id;
    this.delivery_id = delivery_id;
    this.payment_id = payment_id;
    this.status = status;
    this.shoppingcart_id = shoppingcart_id;
}