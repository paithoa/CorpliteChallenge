<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-btn color="primary" depressed to="/">
        <v-icon dark >mdi-home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <CurrentUser></CurrentUser>
      <CartLink></CartLink>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import CurrentUser from './components/CurrentUser.vue';
import CartLink from './components/CartLink.vue';
export default {
  name: 'App',

  components: {
    CurrentUser,
    CartLink
  },

  data: () => ({
    //
  }),
};
</script>
