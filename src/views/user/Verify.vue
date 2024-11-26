<template>
    <div>
        <Loading :active="loading" :is-full-page="true" />
    </div>
</template>

<script setup lang="ts">
import { useVerifyEmail } from '@/composables/user/useVerifyEmail';
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
const { loading } = useVerifyEmail()
</script>
