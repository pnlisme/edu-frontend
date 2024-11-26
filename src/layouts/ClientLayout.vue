<template>
    <div>
        <UserHeaderDesktop />
        <UserHeaderMobile />
        <main>
            <router-view />
            <!-- <slot></slot> -->
        </main>
        <UserFooter />
    </div>
</template>
<script lang="ts" setup>
import UserHeaderDesktop from '@/components/user/UserHeaderDesktop.vue';
import UserFooter from '@/components/user/UserFooter.vue';
import UserHeaderMobile from '@/components/user/UserHeaderMobile.vue';

</script>