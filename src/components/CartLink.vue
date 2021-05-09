<template lang="html">

  
    <v-btn color="primary" depressed to="/cart">
      <v-badge :content="itemsInLatestCart" :value="itemsInLatestCart" overlap color="red">
      <v-icon dark>
        mdi-cart
      </v-icon>
      </v-badge>
    </v-btn>
  

</template>

<script lang="js">

  export default  {
    name: 'CartLink',
    props: [],
    mounted () {
      this.getLatestCart().then(res => this.cart = res);
    },
    data () {
      return {
        cart: null
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
      }
    },
    computed: {
      itemsInLatestCart: function(){
        return this.cart ? this.cart.products.length : 0
      }
    }
}


</script>

<style scoped lang="scss">
  .src-components-cart-details {

  }
</style>
