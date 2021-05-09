<template lang="html">

  <div class="views-store-items">
      <v-container v-if="products!=null">
        <v-row v-if="categories!=null">
          <v-col>
            <v-chip-group v-model="currentCategory" multiple>
              <v-chip v-for="item in categories" v-bind:key="item" v-bind:value="item" filter outlined>{{item}}</v-chip>
            </v-chip-group>
          </v-col>
          <v-col>
            <v-chip-group v-model="sortOrder">
              <v-chip v-for="(item, i) in sortOrders" v-bind:key="i" v-bind:value="item.key" filter outlined><v-icon>{{item.iconName}}</v-icon>{{item.name}}</v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
            label="Search"
            solo
            v-model="searchQuery"
            placeholder="Find a product..."
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="item in paginatedProduct" v-bind:key="item.id" md="3" class="d-flex">
            <StoreItem contain v-bind:item="item" class="flex-grow-1"></StoreItem>
          </v-col>  
        </v-row>
        <v-row>
          <v-col>
            <v-pagination :length="paginationLength" v-model="currentPage"></v-pagination>
          </v-col>
        </v-row>
      </v-container>
  </div>

</template>

<script lang="js">
  import StoreItem from '../components/StoreItem.vue';

  export default  {
    name: 'StoreItems',
    props: [],
    mounted () {
      this.getCategories().then(res => this.categories = res);
      this.getProducts().then(res => this.products = res);
    },
    components: {
      StoreItem,
    },
    data () {
      return {
        products: null,
        allProducts: null,
        categories: null,
        currentCategory:[],
        sortOrder: null,
        sortOrders: [{key: 'ASC', name: 'Low to High', iconName: 'mdi-sort-ascending'},
        {key: 'DESC', name: 'High to Low', iconName:'mdi-sort-descending'}],
        searchQuery: "",
        currentPage: 1
      }
    },
    methods: {
      getProducts() {return fetch("https://fakestoreapi.com/products").then(res=> res.json()).then(res=> this.allProducts = res)},
      getCategories() {return fetch("https://fakestoreapi.com/products/categories").then(res=>res.json())},
      sortById() {this.products = this.products.sort((x,y) => {
        if(x.id > y.id){
          return 1;
        } else if (x.id < y.id){
          return -1;
        } else {
          return 0;
        }
      })},
      sortByPrice() {
        if(!this.sortOrder) {
          this.sortById();
          return;
        }
        this.products = this.products.sort((a,b) => {
        if (a.price === b.price) {
          return 0;
        }
        let sortOrder;
        if(a.price > b.price){
          sortOrder = 1;
        } else {
          sortOrder = -1;
        }
        return this.sortOrder === "DESC" ? -sortOrder : sortOrder;
      })},
      filterBySearch() {
        this.products = this.products
        .filter(x => 
          x.title.toLowerCase().includes(this.searchQuery.toLowerCase())
          ||
          x.description.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
    },
    computed: {
      paginatedProduct: function(){
        let start = 4 * (this.currentPage -1);
        let end = start + 4;
        return this.products.slice(start, end);  
      },
      paginationLength: function() {
        return  this.products.length / 4 < 1 ? 1 : this.products.length /4 ;
      }
    },
    watch: {
      currentCategory: function (newCategory) {
        this.currentPage = 1;
        if(newCategory.length > 0){
          this.products = this.allProducts.filter(x => newCategory.includes(x.category));
        } else {
          this.products = this.allProducts;
        }
        this.sortByPrice();
        this.filterBySearch();
      },
      sortOrder: function () {
        this.currentPage = 1;
        this.sortByPrice();
        this.filterBySearch();
      },
      searchQuery: function() {
        this.currentPage = 1;
        this.currentCategory = [];
        this.sortOrder = null;
        this.filterBySearch();
      }
    }
}


</script>

<style scoped>
</style>
