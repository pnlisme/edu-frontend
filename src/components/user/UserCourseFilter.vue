<template>
    <div>
        <span @click="clearFilters" class=" cursor-pointer text-indigo-600 font-medium">Clear filters</span>
        <div class="flex flex-col gap-5 mt-5">
            <!-- RATE -->
            <div>
                <h3 class="font-medium text-lg">Đánh giá</h3>
                <el-radio-group class="flex flex-col items-start" v-model="selectedRate" @change="applyFilters">
                    <el-radio class="" :value="3">
                        <div class="flex gap-1">
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                        </div>
                    </el-radio>
                    <el-radio :value="4">
                        <div class="flex gap-1">
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                        </div>
                    </el-radio>
                    <el-radio :value="5">
                        <div class="flex gap-1">
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                        </div>
                    </el-radio>
                </el-radio-group>
            </div>

            <!-- Category Filter (Checkboxes) -->
            <div class="font-medium text-lg">
                <h3 class="font-semibold text-lg mb-2">Danh mục</h3>
                <el-checkbox-group v-model="selectedCategories" class="flex flex-col items-start"
                    @change="applyFilters">
                    <el-checkbox v-for="category in apiStore.categories" v-bind:key="category.id"
                        :value="category.id">{{
                            category.name }}</el-checkbox>


                </el-checkbox-group>
            </div>
            <!-- Video Duration (Checkboxes) -->
            <div class="font-medium text-lg">
                <h3 class="font-semibold text-lg mb-2">Thời gian khóa học</h3>
                <el-checkbox-group v-model="selectedDurations" class="flex flex-col items-start" @change="applyFilters">
                    <el-checkbox :value="'0-48'">0-48 giờ</el-checkbox>
                    <el-checkbox :value="'0-128'">48-128 giờ</el-checkbox>
                    <el-checkbox :value="'128+'">128+ giờ</el-checkbox>
                </el-checkbox-group>
            </div>
            <!-- Level (Checkboxes) -->
            <div class="font-medium text-lg">
                <h3 class="font-semibold text-lg mb-2">Trình độ</h3>
                <el-checkbox-group v-model="selectedLevels" class="flex flex-col items-start" @change="applyFilters">

                    <el-checkbox v-for="level in apiStore.levels" v-bind:key="level.id" :value="level.id">{{
                        level.name }}</el-checkbox>

                </el-checkbox-group>
            </div>
            <!-- Language (Checkboxes) -->
            <div class="font-medium text-lg">
                <h3 class="font-semibold text-lg mb-2">Ngôn ngữ</h3>
                <el-checkbox-group v-model="selectedLanguage" class="flex flex-col items-start" @change="applyFilters">

                    <el-checkbox class="!text-gray-900" v-for="language in apiStore.languagies" v-bind:key="language.id"
                        :value="language.id">{{
                            language.name }}</el-checkbox>
                    <!-- <el-checkbox class="!text-gray-900" :value="'vietnamese'">Tiếng việt</el-checkbox>
                    <el-checkbox class="!text-gray-900" :value="'english'">Tiếng anh</el-checkbox>
                    <el-checkbox class="!text-gray-900" :value="'#'">Tiếng pháp</el-checkbox> -->
                </el-checkbox-group>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { StarIcon } from "@heroicons/vue/20/solid";
import { useHome } from '@/composables/user/useHome';
import { apisStore } from '@/store/apis';

const apiStore = apisStore()
onMounted(() => {
    apiStore.fetchCate()
    apiStore.fetchLevel()
    apiStore.fetchLang()
})
const emit = defineEmits(['updateFilters']);
const selectedRate = ref<number | null>(null);
const selectedCategories = ref<number[]>([]);
const selectedDurations = ref<string[]>([]);
const selectedLevels = ref<number[]>([]);
const selectedLanguage = ref<string[]>([]);
const applyFilters = () => {
    emit('updateFilters', {
        max_rating: selectedRate.value,
        category_ids: selectedCategories.value,
        duration_range: selectedDurations.value,
        level_ids: selectedLevels.value,
        language_ids: selectedLanguage.value,
    });
};
const clearFilters = () => {
    selectedRate.value = null;
    selectedCategories.value = [];
    selectedDurations.value = [];
    selectedLevels.value = [];
    selectedLanguage.value = [];

    // Gọi lại hàm applyFilters để cập nhật bộ lọc
    applyFilters();
};
</script>
