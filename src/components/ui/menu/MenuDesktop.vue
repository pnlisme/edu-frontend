<template>

    <div>
        <el-menu class="text" mode="horizontal" :ellipsis="false">
            <!-- Workspace Menu -->
            <el-sub-menu class="" index="2">
                <!-- Just display the text 'Workspace' -->
                <template #title>
                    <RouterLink to="/course">

                        <p class="">Thể loại</p>
                    </RouterLink>
                    <!-- <span
                class="hover:text-indigo-600 text-gray-700">Workspace</span> -->
                </template>


                <!-- Lặp qua các danh mục từ dữ liệu -->
                <el-menu-item v-for="(category, index) in apiStore.categoriesWithoutChildren" :key="category.id"
                    :index="`2-${index}`">
                    {{ category.name }}
                </el-menu-item>

                <!-- Hiển thị các danh mục con bên trong nếu có -->
                <el-sub-menu v-for="(category, index) in apiStore.categoriesWithChildren" :key="`sub-${category.id}`"
                    :index="`2-${index}-sub`">
                    <template #title>{{ category.name }}</template>
                    <el-menu-item v-for="(child, childIndex) in category.children" :key="child.id"
                        :index="`2-${index}-${childIndex}`">
                        {{ child.name }}
                    </el-menu-item>
                </el-sub-menu>

                <!-- <el-menu-item index="2-1">item
                    one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-sub-menu index="2-4-4">
                        <template #title>item four</template>
                        <el-menu-item index="2-4-4-1">item one</el-menu-item>
                        <el-menu-item index="2-4-4-2">item two</el-menu-item>
                        <el-menu-item index="2-4-4-3">item three</el-menu-item>
                    </el-sub-menu>
                </el-sub-menu> -->
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { apisStore } from '@/store/apis';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

// const { categories, fetchCate } = useHome()
const apiStore = apisStore()
onMounted(() => {
    apiStore.fetchCate()
    apiStore.fetchCourse()
})

// const categoriesWithChildren = computed(() => {
//     return categories.value.filter((category) => category.children && category.children.length > 0);
// });
// const categoriesWithoutChildren = computed(() => {
//     return categories.value.filter((category) => !category.children || category.children.length === 0);
// });
// onMounted(() => {
//     fetchCate();
// });
</script>

<style scoped>
.el-menu--horizontal.el-menu {
    border: none;
}
</style>