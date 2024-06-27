import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/products/ProductList.vue';
import AddProduct from '../components/products/AddProduct.vue';
import EditProduct from '../components/products/EditProduct.vue';
import ProductCategoryList from '../components/productCategories/ProductCategoryList.vue';
import AddProductCategory from '../components/productCategories/AddProductCategory.vue';
import EditProductCategory from '../components//productCategories/EditProductCategory.vue';
import TransactionList from '../components/transactions/TransactionList.vue';
import AddTransaction from '../components/transactions/AddTransaction.vue';
import EditTransaction from '../components/transactions/EditTransaction.vue';

const routes = [
  {
    path: '/',
    redirect: '/products'
  },
  {
    path: '/products',
    name: 'Product List',
    component: ProductList
  },
  {
    path: '/add-product',
    name: 'Add Product',
    component: AddProduct
  },
  {
    path: '/edit-product/:id',
    name: 'Edit Product',
    component: EditProduct
  },
  {
    path: '/product-category',
    name: 'Product Categories',
    component: ProductCategoryList
  },
  {
    path: '/add-product-category',
    name: 'Add Product Category',
    component: AddProductCategory
  },
  {
    path: '/edit-product-category/:id',
    name: 'Edit Product Category',
    component: EditProductCategory
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: TransactionList
  },
  {
    path: '/add-transaction',
    name: 'Add Transaction',
    component: AddTransaction
  },
  {
    path: '/edit-transaction/:id',
    name: 'Edit Transaction',
    component: EditTransaction
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
