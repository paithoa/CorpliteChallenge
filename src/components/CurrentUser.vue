<template lang="html">

  <v-btn color="primary" depressed to="/user">
    {{currentUser}}
  </v-btn>

</template>

<script lang="js">

  export default  {
    name: 'CurrentUser',
    props: [],
    mounted () {
      this.getUserDetails().then(res => this.currentUser = res)
    },
    data () {
      return {
        currentUser: null
      }
    },
    methods: {
      getUserDetails: function () {
        return fetch('https://fakestoreapi.com/users/1')
          .then(res => res.json())
          .then(res => `${res.name.firstname} ${res.name.lastname}`)
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .components-current-user {

  }
</style>
