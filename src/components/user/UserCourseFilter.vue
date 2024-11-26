<template>
    <div>
        <div class="flex flex-col gap-5">
            <!-- RATE -->
            <div class="">
                <h3 class="font-medium text-lg">Đánh giá</h3>
                <el-radio-group class="flex flex-col items-start " v-model="selectedRate" @change="applyFilters">

                    <el-radio class="" :label="3">
                        <div class="flex gap-1">
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                        </div>
                    </el-radio>
                    <el-radio :label="4">
                        <div class="flex gap-1">
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                            <StarIcon class="h-4 w-4 text-yellow-300" />
                        </div>
                    </el-radio>
                    <el-radio :label="5">
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
                <el-checkbox-group class="flex flex-col items-start ">
                    <el-checkbox class="!text-gray-900" :label="'#'">Thiết kế đồ họa</el-checkbox>
                    <el-checkbox class="!text-gray-900" :label="'#'">Phát triển web</el-checkbox>
                    <el-checkbox class="!text-gray-900" :label="'#'">Javascript</el-checkbox>
                    <el-checkbox class="!text-gray-900" :label="'#'">Khoa học máy tính</el-checkbox>
                    <el-checkbox class="!text-gray-900" :label="'#'">Vẽ</el-checkbox>
                    <el-checkbox class="!text-gray-900" :label="'#'">Javascript</el-checkbox>
                </el-checkbox-group>
            </div>
            <!-- Video Duration (Checkboxes) -->
            <div class="font-medium text-lg">
                <h3 class="font-semibold text-lg mb-2">Thời gian khóa học</h3>
                <el-checkbox-group class="flex flex-col items-start ">
                    <el-checkbox class="!text-gray-900" :label="'#'">0-48 giờ</el-checkbox>
                    <el-checkbox class="!text-gray-900" :label="'#'">48-128 giờ</el-checkbox>
                    <el-checkbox class="!text-gray-900" :label="'#'">128+ giờ</el-checkbox>
                </el-checkbox-group>
            </div>
            <!-- Level (Checkboxes) -->
            <div class="font-medium text-lg">
                <h3 class="font-semibold text-lg mb-2">Trình độ</h3>
                <el-checkbox-group class="flex flex-col items-start ">
                    <el-checkbox class="!text-gray-900" :label="'#'">Mới bắt đầu</el-checkbox>
                    <el-checkbox class="!text-gray-900" :label="'#'">Trung cấp</el-checkbox>
                    <el-checkbox class="!text-gray-900" :label="'#'">Nâng cao</el-checkbox>
                </el-checkbox-group>
            </div>
            <!-- Language (Checkboxes) -->
            <div class="font-medium text-lg">
                <h3 class="font-semibold text-lg mb-2">Ngôn ngữ</h3>
                <el-checkbox-group class="flex flex-col items-start ">
                    <el-checkbox class="!text-gray-900" :label="'#'">Tiếng việt</el-checkbox>
                    <el-checkbox class="!text-gray-900" :label="'#'">Tiếng anh</el-checkbox>
                    <el-checkbox class="!text-gray-900" :label="'#'">Tiếng pháp</el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { StarIcon } from "@heroicons/vue/20/solid";


const selectedRate = ref<number | null>(null);

const applyFilters = () => {
    console.log("Rate:", selectedRate.value);
    //   console.log("Categories:", selectedCategories.value);
    //   console.log("Prices:", selectedPrices.value);
    // Emit or process the filter values based on your logic
};
</script>
