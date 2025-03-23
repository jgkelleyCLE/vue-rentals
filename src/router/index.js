import Admin from "@/views/Admin.vue";
import AllSearches from "@/views/AllSearches.vue";
import Cart from "@/views/Cart.vue";
import Gallery from "@/views/Gallery.vue";
import Home from "@/views/Home.vue";
import Location from "@/views/Location.vue";
import OrderDetails from "@/views/OrderDetails.vue";
import ProductCategory from "@/views/ProductCategory.vue";
import ProductDetails from "@/views/ProductDetails.vue";
import Products from "@/views/Products.vue";
import Search from "@/views/Search.vue";
import SearchDetails from "@/views/SearchDetails.vue";
import Thanks from "@/views/Thanks.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/product",
            name: "Products",
            component: Products
        },
        {
            path: "/product/:id",
            name: "Product Details",
            component: ProductDetails
        },
        {
            path: '/location',
            name: 'Location',
            component: Location
        },
        {
            path: '/gallery',
            name: 'Gallery',
            component: Gallery
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin
        },
        {
            path: '/search',
            name: 'Search Results',
            component: Search
        },
        {
            path: '/category/:slug',
            name: 'Category',
            component: ProductCategory
        },
        {
            path: '/thank-you',
            name: 'Thank You',
            component: Thanks
        },
        {
            path: '/order/:id',
            name: 'Order',
            component: OrderDetails
        },
        {
            path: '/admin/search-details/:id',
            name: 'Admin Search Details',
            component: SearchDetails
        },
        {
            path: '/admin/all-searches',
            name: 'All Searches',
            component: AllSearches
        }
    ]
        
})

export default router