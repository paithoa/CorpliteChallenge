<template lang="html">

  <v-container v-if="loadingDone === true">
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Product Image</th>
          <th>Quantity</th>
          <th>Product Price</th>
          <th>Subtotal Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.products" v-bind:key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.title}}</td>
            <td><v-img v-bind:src="item.image" max-width="50px" contain></v-img></td>
            <td>{{item.quantity}}</td>
            <td>${{item.price}}</td>
            <td>${{+item.quantity * +item.price}}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Total Price</td>
            <td>${{totalPrice}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>

</template>

<script lang="js">

  export default  {
    name: 'CartDetails',
    props: [],
    mounted () {
      this.getLatestCart()
      .then(res => this.cart = res)
      .then(res => Promise.all(res.products.map(x => this.getIndividualProduct(x))))
      .then(res => res.sort((x,y) => {
        if(x.id > y.id){
          return 1;
        } else if (x.id < y.id){
          return -1;
        } else {
          return 0;
        }
      }))
      .then(res => this.cart.products = res)
      .then(() => this.loadingDone = true);
    },
    data () {
      return {
        cart: null,
        loadingDone: false,
      }
    },
    methods: {
      getLatestCart: function() {
        return fetch("https://fakestoreapi.com/carts/user/1").then(res => res.json()).then(res => res.sort((x, y) => {
          if(new Date(x.date) > new Date(y.date)){
            return 1;
          }
          if (new Date(x.date) < new Date(y.date)){
            return -1;
          }
          return 0;
        })[0]);
      },
      getIndividualProduct: function(product){
        return fetch(`https://fakestoreapi.com/products/${product.productId}`).then(res => res.json()).then(res => ({...res, ...product}));
      }
    },
    computed: {
      totalPrice: function () {
        return this.cart.products.reduce((acc, currentItem) => acc + (currentItem.quantity * currentItem.price), 0);
      }
    }
}


</script>

<style scoped lang="scss">
  .src-views-cart-details {

  }
</style>
