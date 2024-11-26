<template>
    <div>
        <!-- HEADER -->
        <UserHeaderCourse />
        <!-- MAIN -->
        <main class="">
            <router-view />
        </main>
        <!-- FOOTER -->
        <UserNewsLetter class="mb-16" />
        <UserFooter />
    </div>
</template>

<script setup lang="ts">
import UserFooter from '@/components/user/UserFooter.vue';
import UserHeaderCourse from '@/components/user/UserHeaderCourse.vue';
import UserHero2 from '@/components/user/UserHero2.vue';
import UserNewsLetter from '@/components/user/UserNewsLetter.vue';


</script>

<style scoped></style>