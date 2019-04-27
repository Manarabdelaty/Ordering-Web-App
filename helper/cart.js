/*
  Reference : https://gabrieleromanato.name/nodejs-how-to-create-an-e-commerce-shopping-cart
*/

class Cart {
   constructor() {
      this.data = {};
      this.data.items = [];
      this.data.totals = 0;
   }

   inCart(config_id = 0,item_id = 0, rest_id = 0, menue_type = 0) {
    let found = false;
    console.log('incart');
    this.data.items.forEach(item => {
       if(item.config_id === item.config_id && item.item_id === item_id && item.rest_id === rest_id && item.menue_type === menue_type) {
           found = true;
       }
    });
    return found;
   }
   calculateTotals() {
    this.data.totals = 0;
    this.data.items.forEach(item => {
        let price = item.price;
        let qty = item.qty;
        let amount = price * qty;
        this.data.totals += amount;
    });
   }

   addToCart(item = null, qty = 1) {
    if(!this.inCart(item.config_id, item.item_id, item.rest_id, item.menue_type)) {
        var item_info = {
          config_id: item.config_id,
          item_id: item.item_id,
          name: item.name,
          price: item.price,
          rest_id: item.rest_id,
          menue_type: item.menue_type,
          qty: qty,
          comment: item.comment
        };
        this.data.items.push(item_info);
        this.calculateTotals();
        return 1;
    }
    console.log(' not found');
    return 0;
  }
  removeFromCart(config_id = 0,item_id =0 , rest_id=0, menue_type = 0) {

    for(let i = 0; i < this.data.items.length; i++){
        let item = this.data.items[i];
        if(item.config_id === config_id && item.item_id === item_id && item.rest_id === rest_id && item.menue_type === menue_type) {
            this.data.items.splice(i, 1);
            this.calculateTotals();
        }
    }
  }
  emptyCart(request) {
    this.data.items = [];
    this.data.totals = 0;
    this.data.formattedTotals = '';
    if(request.session) {
        request.session.cart.items = [];
        request.session.cart.totals = 0;
        request.session.cart.formattedTotals = '';
    }
  }

  editQty(itemInfo) {
    for(let i = 0; i < this.data.items.length; i++){
        let item = this.data.items[i];
        console.log(item);
        if(item.config_id === itemInfo.config_id && item.item_id === itemInfo.item_id && item.rest_id === itemInfo.rest_id && item.menue_type === itemInfo.menue_type) {
            console.log('found');
            this.data.items[i].qty = itemInfo.qty;
            this.calculateTotals();
        }
    }
  }
  editComm(itemInfo) {
    for(let i = 0; i < this.data.items.length; i++){
        let item = this.data.items[i];
        if( item.config_id === itemInfo.config_id && item.item_id === itemInfo.item_id && item.rest_id === itemInfo.rest_id && item.menue_type === itemInfo.menue_type) {
            this.data.items[i].comment = itemInfo.comm;
        }
    }
  }
  saveCart(request) {
    if(request.session) {
        console.log(' saved');
        request.session.cart = this.data;
    }
    else console.log('not saved');
  }
  getItems(){
    var items = [];
    for (var i=0; i< this.data.items.length; i++){
      var item = this.data.items[i];
      items.push([0,item.rest_id, item.menue_type, item.item_id, item.config_id]);
    }
    return items;
  }
}

module.exports = new Cart();
