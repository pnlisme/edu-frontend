<template>
    <div>
        hihi
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { useCart } from '@/composables/user/useCart';
import { useAuthStore } from '@/store/auth';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/vue/24/outline";
import { ElNotification, type DrawerProps } from 'element-plus';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import logo from '../../assets/images/logo1.svg';

const direction = ref<DrawerProps['direction']>('ltr')
const isOpenNav = ref(false)
const isOpenCart = ref(false)
const searchOpen = ref(false)
const searchDirection = ref<DrawerProps['direction']>('ttb')
const toggleMenu = () => {
    isOpenNav.value = !isOpenNav.value
}
const { cart, loading } = useCart();
const toggleCart = () => {
    isOpenCart.value = !isOpenCart.value
}
const router = useRouter()
const authStore = useAuthStore()
const { state } = storeToRefs(authStore)
const { userData } = authStore;
const currentPath = router.currentRoute.value.fullPath
localStorage.setItem('redirectAfterLogin', currentPath);
onMounted(async () => {
    const res = await userData()
})


</script>
