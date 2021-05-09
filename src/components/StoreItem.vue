<template lang="html">

  <v-card class="StoreItem">
    <v-img contain v-bind:src="item.image" max-height="200px"></v-img>
    <v-card-title>{{item.title}}</v-card-title>
    <v-card-subtitle>${{item.price}}</v-card-subtitle>
    <v-card-text> {{item.description}} <br><v-spacer></v-spacer><v-divider></v-divider><b>Category: </b>{{item.category}}</v-card-text>
  </v-card>

</template>

<script lang="js">

  export default  {
    name: 'StoreItem',
    props: {item: Object},
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped>
  .StoreItem {

  }
</style>
