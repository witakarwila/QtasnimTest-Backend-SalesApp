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
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div class="relative flex flex-row justify-between items-center my-10">
          <router-link :to="{ name: 'Add Product' }" class="rounded-lg text-lg px-5 py-3 bg-[#000] text-[#ffffff] justify-center me-3">
                + Add New
          </router-link>
        </div>
        <div class="relative shadow-md rounded-lg">
            <table class="table-fixed w-full text-left">
              <thead class="uppercase bg-[#000000] text-[#fafafa] h-16">
                    <tr>
                        <td class="py-1 border text-center  p-4">Product Name</td>
                        <td class="py-1 border text-center  p-4">Stock</td>
                        <td class="py-1 border text-center  p-4">Action</td>
                    </tr>
                </thead>
                <tbody class="bg-white text-gray-500 bg-[#FFFFFF] text-[#6b7280]" style="background-color: #FFFFFF; color: #6b7280;">
                    <tr v-for="item in items" :key="item.id" class="py-5">
                        <td class="py-5 border text-center  p-4">{{ item.nama }}</td>
                        <td class="py-5 border text-center  p-4">{{ item.stok }}</td>
                        <td class="py-5 border text-center  p-4">
                          <router-link :to="{ name : 'Edit Product', params: {id: item.id} }" class="rounded-lg text-lg px-3 py-2 bg-[#0062ff] text-[#ffffff] justify-center me-3">
                              Edit
                          </router-link>
                          <a @click="deleteBarang(item.id)" class="rounded-lg text-lg px-3 py-2 bg-[#ff4b4b] text-[#ffffff] justify-center">Delete</a>
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
  { name: 'Products', href: '/products', current: true },
  { name: 'Product Category', href: '/product-category', current: false },
  { name: 'Transaction', href: '/transaction', current: false },
]
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
      items: [],
    };
  },

  created() {
    this.getAll();
  },

  methods: {
    async getAll() {
      try {
        const result = await axios.get("http://localhost:5000/api/v1/Barang");
        this.items = result.data;
      } catch (err) {
        console.log(err)
      }
    },

    async deleteBarang(id) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/Barang/${id}`);
        this.getAll();
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>