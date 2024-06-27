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
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Add Transaction</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl flex justify-center px-4 py-6 sm:px-6 lg:px-8">
            <form class="w-1/2">
                <div class="space-y-12">
                    <div class="border-b border-gray-900/10 pb-12">
                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div class="sm:col-span-3">
                                <label for="productCategory" class="block text-sm font-medium leading-6 text-gray-900">Select Product</label>
                                <div class="mt-2">
                                    <select v-model="productId" id="productList" name="productList" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        <option v-for="product in productList" :key="product.id" v-bind:value="product.id">{{ product.nama }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="stock" class="block text-sm font-medium leading-6 text-gray-900">Amount</label>
                                <div class="mt-2">
                                <input type="number" name="stock" id="stock" v-model="totalOrder" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex items-center justify-end gap-x-6">
                    <router-link :to="{ name : 'Transaction' }" class="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </router-link>
                    <a @click="saveDataOrder" class="cursor-pointer rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-200 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</a>
                </div>
            </form>
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
    name: "BarangList",
    components: { Disclosure, DisclosureButton, DisclosurePanel, Bars3Icon, XMarkIcon },
    setup() {
      return {
        navigation,
      }
    },
    data() {
      return {
        productList: [],
        productId: "",
        totalOrder: 0,
      };
    },

    created() {
        this.getAllDataProduct();
    },
  
    methods: {
        async getAllDataProduct() {
            try {
                const result = await axios.get("http://localhost:5000/api/v1/barang");
                this.productList = result.data;
            } catch (err) {
                console.log(err)
            }
        },
        async saveDataOrder() {
            try {
                await axios.post("http://localhost:5000/api/v1/transaksi", {
                    id_barang: this.productId,
                    jumlah: this.totalOrder
                });
                this.productId = "";
                this.totalOrder = "";
                this.$router.push("/transaction");
            } catch (err) {
                console.log(err)
            }
        }
    }
  }
  </script>