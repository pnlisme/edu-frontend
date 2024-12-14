<template>

    <div>
        <el-menu class="text" mode="horizontal" :ellipsis="false">
            <!-- Workspace Menu -->
            <el-sub-menu class="" index="2">

                <template #title>
                    <RouterLink to="/course">

                        <p class="">Thể loại</p>
                    </RouterLink>

                </template>


                <!-- Lặp qua các danh mục từ dữ liệu -->
                <el-menu-item v-for="(category, index) in apiStore.categoriesWithoutChildren" :key="category.id"
                    :index="`2-${index}`" 
                    @click="filterByCategory(category.id || 0)">
                    {{ category.name }}
                </el-menu-item>

                <!-- Hiển thị các danh mục con bên trong nếu có -->
                <el-sub-menu v-for="(category, index) in apiStore.categoriesWithChildren" :key="`sub-${category.id}`"
                    :index="`2-${index}-sub`">
                    <template #title>{{ category.name }}</template>
                    <el-menu-item v-for="(child, childIndex) in category.children" :key="child.id"
                        :index="`2-${index}-${childIndex}`" 
                        @click="filterByCategory(child.id || 0)">
                        {{ child.name }}
                    </el-menu-item>
                </el-sub-menu>


            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { apisStore } from '@/store/apis';
import { onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

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
const router = useRouter();
const filterByCategory = (categoryId: number) => {
    router.push({
        name: 'Course',
        query: { category_ids: categoryId }, // Truyền ID danh mục vào query
    });
};
</script>

<style scoped>
.el-menu--horizontal.el-menu {
    border: none;
}
</style>