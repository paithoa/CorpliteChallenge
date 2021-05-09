import Vue from 'vue';
import VueRouter from 'vue-router';
import StoreItems from '../views/StoreItems.vue';
import UserDetails from '../views/UserDetails.vue';
import CartDetails from '../views/CartDetails.vue';

Vue.use(VueRouter);

const routes = [{ path: '/', component: StoreItems }, { path: '/user', component: UserDetails }, { path: '/cart', component: CartDetails }]

export default new VueRouter({
    routes
});