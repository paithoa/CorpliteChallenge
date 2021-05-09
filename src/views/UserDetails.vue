<template lang="html">
  <v-card v-if="user">
    <v-card-title>User details for {{fullName}}</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="user.name.firstname" label="First Name"></v-text-field>
        <v-text-field v-model="user.name.lastname" label="Last Name"></v-text-field>
        <v-text-field v-model="user.username" label="Username" disabled></v-text-field>
        <v-text-field v-model="user.email" label="Email"></v-text-field>
        <v-text-field v-model="user.password" label="Password" type="password"></v-text-field>
        <v-text-field v-model="user.phone" label="Phone number"></v-text-field>
        <v-divider></v-divider>
        <h4>Address</h4>
        <v-text-field v-model="user.address.number" label="Street number"></v-text-field>
        <v-text-field v-model="user.address.street" label="Street"></v-text-field>
        <v-text-field v-model="user.address.city" label="City"></v-text-field>
        <v-text-field v-model="user.address.zipcode" label="ZIP Code"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="update">Update</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">

  export default  {
    name: 'UserDetails',
    props: [],
    mounted () {
      this.getUser().then(res => this.user = res);
    },
    data () {
      return {
        user: null,
        updateSuccessful: null,
      }
    },
    methods: {
      getUser: function() {
        return fetch("https://fakestoreapi.com/users/1").then(res => res.json())
      },
      updateUser: function(model){
        return fetch("https://fakestoreapi.com/users/1", {method: "PUT", body: JSON.stringify(model, (k,v) => k.startsWith("_") ? undefined: v)})
                    .then(res => res.json())
      },
      update: function() {
        this.updateUser(this.user).then(() => this.updateSuccessful = true, () => this.updateSuccessful = false)
      }
    },
    computed: {
      fullName: function () {
        return this.user ? this.user.name.firstname + ' ' + this.user.name.lastname : ""; 
      }
    }
}


</script>

<style scoped lang="scss">
</style>
