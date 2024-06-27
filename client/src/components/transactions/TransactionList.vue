<template>
    <div class="min-h-full">
      <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
              <div class="hidden md:block">
                <div class="flex items-baseline space-x-4">
                  <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
                </div>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open main menu</span>
                <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
          </div>
        </div>
  
        <DisclosurePanel class="md:hidden">
          <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
          </div>
        </DisclosurePanel>
      </Disclosure>
  
      <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Transaction</h1>
        </div>
      </header>
      <main>

        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div class="relative flex flex-row justify-between items-center my-10">
            <router-link :to="{ name: 'Add Transaction' }" class="rounded-lg text-lg px-5 py-3 bg-[#000] text-[#ffffff] justify-center me-3">
                  + Add New
            </router-link>
          </div>
          <div class="card border-0 rounded shadow p-5 mb-5">
                <div class="card-body space-y-5">
                    <div class="flex items-center gap-x-5">
                        <div class="space-x-2">
                            <label class="form-label">Search</label>
                            <input type="text" class="form-input" placeholder="Search product by name" v-model="searchByProductName" @input="getAllDataTransaction" />
                        </div>
                        <div class="space-x-2">
                            <label class="form-label">Sort transaction by:</label>
                            <select class="form-select" v-model="sortBy" @change="getAllDataTransaction">
                                <option value="">Sort transaction</option>
                                <option value="nama_barang">Product name</option>
                                <option value="tanggal_transaksi">Transaction Date</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex items-center gap-x-5">
                        <div class="space-x-2">
                            <label class="form-label">Product Category</label>
                            <select class="form-select w-full" v-model="productCategoryId" @change="getAllDataTransactionComparison">
                                <option value="">Product Category</option>
                                <option v-for="item in productCategoryList" :key="item.id" v-bind:value="item.id">{{ item.nama }}</option>
                            </select>
                        </div>
                        <div class="space-x-2">
                            <label class="form-label">Sort by Amount Sold:</label>
                            <select class="form-select w-full" v-model="sortByAmount" @change="getAllDataTransactionComparison">
                                <option value="">Sort</option>
                                <option value="most_sold">Most Sold</option>
                                <option value="least_sold">Least Sold</option>
                            </select>
                        </div>
                        <div class="space-x-2">
                            <label class="form-label">Start Date</label>
                            <input type="date" class="form-input w-full" v-model="startDate" @input="getAllDataTransactionComparison" />
                        </div>
                        <div class="space-x-2">
                            <label class="form-label">End Date</label>
                            <input type="date" class="form-input w-full" v-model="endDate" @input="getAllDataTransactionComparison" />
                        </div>
                    </div>  
                    <div class="space-x-2">
                        <button class="rounded-lg text-lg px-5 py-2 bg-[#dfdfdf] text-[#000000] justify-center" @click="resetFilter()">
                            Reset Filter
                        </button>
                    </div>   
                </div>
          </div>
          <div class="relative shadow-md rounded-lg">
              <table class="table-fixed w-full text-left">
                <thead class="uppercase bg-[#000000] text-[#e5e7eb] h-16">
                      <tr>
                          <td class="py-1 border text-center p-4">Product Name</td>
                          <td class="py-1 border text-center p-4">Stock</td>
                          <td class="py-1 border text-center p-4">Amount Sold</td>
                          <td class="py-1 border text-center p-4">Transaction Date</td>
                          <td class="py-1 border text-center p-4">Product Category</td>
                          <td class="py-1 border text-center p-4">Action</td>
                      </tr>
                  </thead>
                  <tbody class="bg-white text-gray-500 bg-[#FFFFFF] text-[#6b7280]" style="background-color: #FFFFFF; color: #6b7280;">
                      <tr v-for="item in items" :key="item.id" class="py-5">
                          <td class="py-5 border text-center p-4">{{ item.nama_barang }}</td>
                          <td class="py-5 border text-center p-4">{{ item.stok }}</td>
                          <td class="py-5 border text-center p-4">{{ item.jumlah }}</td>
                          <td class="py-5 border text-center p-4">{{ item.tanggal_transaksi }}</td>
                          <td class="py-5 border text-center p-4">{{ item.jenis_barang }}</td>
                          <td class="py-5 border text-center p-4">
                            <router-link :to="{ name : 'Edit Transaction', params: {id: item.id} }" class="rounded-lg text-lg px-3 py-2 bg-[#0062ff] text-[#ffffff] justify-center me-3">
                                Edit
                            </router-link>
                            <button @click="deleteTransaction(item.id)" class="rounded-lg text-lg px-3 py-1 bg-[#ff4b4b] text-[#ffffff] justify-center">Delete</button>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
  import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
  import axios from 'axios'
  
  const navigation = [
    { name: 'Products', href: '/products', current: false },
    { name: 'Product Category', href: '/product-category', current: false },
    { name: 'Transaction', href: '/transaction', current: true },
  ];
  
  export default {
    name: "TransaksiList",
    components: { Disclosure, DisclosureButton, DisclosurePanel, Bars3Icon, XMarkIcon },
    setup() {
      return {
        navigation,
      }
    },
    data() {
      return {
        items: [],
        productCategoryList: [],
        searchByProductName: "",
        sortBy: "",
        productCategoryId: "",
        sortByAmount: "",
        startDate: "",
        endDate: "",
      };
    },
  
    created() {
      this.getProductCategory();
      this.getAllDataTransaction();
    },
  
    methods: {
        async getProductCategory() {
            try {
                const result = await axios.get("http://localhost:5000/api/v1/JenisBarang");
                this.productCategoryList = result.data;
            } catch (err) {
                console.log(err)
            }
        },

        async getAllDataTransaction() {
            try {
                let query = `?nama_barang=${this.searchByProductName}&sort_by=${this.sortBy}`;
                const result = await axios.get(`http://localhost:5000/api/v1/transaksi${query}`);
                this.items = result.data;
            } catch (err) {
                console.log(err)
            }
        },

        async getAllDataTransactionComparison() {
            try {
                let query = `?id_jenis_barang=${this.productCategoryId}&sort_by_amount=${this.sortByAmount}&start_date=${this.startDate}&end_date=${this.endDate}`;
                const result = await axios.get(`http://localhost:5000/api/v1/transaksi/comparison${query}`);
                this.items = result.data;
            } catch (err) {
                console.log(err)
            }
        },

        async deleteTransaction(id) {
            try {
                await axios.delete(`http://localhost:5000/api/v1/transaksi/${id}`);
                this.getAllDataTransaction();
            } catch (err) {
                console.log(err);
            }
        },

        resetFilter() {
            this.searchByProductName = "";
            this.sortBy = "";
            this.productCategoryId = "",
            this.sortByAmount = "",
            this.startDate = "",
            this.endDate = "",
            this.getAllDataTransaction();
        }
    }
  }
  </script>