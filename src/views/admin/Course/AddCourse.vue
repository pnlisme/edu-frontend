<template>
  <div class="p-4">
    <HeaderNavbar
    namePage="Thêm khoá học mới"
    />
  </div>
  <div class="p-4 py-2">
    <div class="background-table ">
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 px-10 py-3 gap-10 ">
          <div class="">
            <InputGroup
            label="Tiêu đề"
            required="*"
            inputPlaceHoder="Nhập tiêu đề khoá học"
            v-model="formDataAddCourse.title"
            @input="console.log('Từ khoá (không bắt buộc):', formDataAddCourse.title)"
            />
            <DescriptionGroup
            label="Mô tả ngắn"
            inputPlaceHoder="Nhập mô tả..."
            v-model="formDataAddCourse.short_description"
            @input="console.log('Mô tả ngắn (không bắt buộc):', formDataAddCourse.short_description)"
            />
            
            <CkeditorGroup
              label="Mô tả"
              v-model="formDataAddCourse.description"
              @update:modelValue="updateDescription"
            />
            
            <!-- <RadioGroup
            label="Chọn"
            required="*"
            >
            <div class="mb-2 ml-4">
              <el-radio-group class="grid" v-model="formDataAddCourse.status">
                <el-radio value ="active" >Kích hoạt</el-radio>
                <el-radio value ="inactive" >Không kích hoạt</el-radio>
              </el-radio-group>
            </div>
            </RadioGroup> -->
          </div>
          <div class="">
            <SelectGroup
            inputPlaceHoder="Chọn danh mục cho khoá học"
            required="*"
            label="Danh mục"
            :optionsData="parentCategories.map(category => ({ label: category.name, value: category.id }))"
            v-model="formDataAddCourse.category_id"
          />

          <SelectGroup
            inputPlaceHoder="Chọn cấp độ cho khoá học"
            required="*"
            label="Cấp độ khoá học"
            :optionsData="courseLevels.map(level => ({ label: level.name, value: level.id }))"
            v-model="formDataAddCourse.level_id"
            @change="() => console.log('Cấp độ đã chọn:', formDataAddCourse.level_id)"
          />

          <SelectGroup
            inputPlaceHoder="Chọn ngôn ngữ cho khoá học"
            required="*"
            label="Ngôn ngữ"
            :optionsData="languages.map(language => ({ label: language.name, value: language.id }))"
            v-model="formDataAddCourse.language_id"
            @change="() => console.log('Ngôn ngữ đã chọn:', formDataAddCourse.language_id)"
          />
            <RadioGroup
            label="Loại giá"
            >
            <el-radio-group class="grid" v-model="paid">
                <el-radio value ="1">Có phí</el-radio>
                <el-radio value ="0">Miễn phí</el-radio>
            </el-radio-group>
            </RadioGroup>
            <template
            :class="{'block': paid == 1, 'hidden': paid == 0}"
            class="transition-opacity translate-y-2  duration-500 ease-in-out"
            >
              <InputGroup
            label="Giá (đơn vị vnđ)"
            required="*"
            inputPlaceHoder="Nhập giá của khoá học"
            v-model="formDataAddCourse.price"
            />
            <div v-show="checked2" class="relative">
              <el-tooltip
                class="box-item"
                effect="dark"
                content="Chuyển sang phần trăm"
                placement="top"
              >
                <ArrowPathIcon class="w-5 absolute top-0 left-[200px] bold color-primary"/>
              </el-tooltip>
              <InputGroup
              label="Giá giảm (đơn vị vnđ)"
              required="*"
              inputPlaceHoder="Nhập giá giảm của khoá học"
              v-model="formDataAddCourse.sale_value"
              />
            </div>
            <div class="mt-1">
              <el-checkbox v-model="checked2" label="Click nếu khoá học này có giảm giá" size="large" />
            </div>
          </template>
          <UploadGroup
            label="Tải lên hình ảnh thumbnail"
            inputId="upload"
            :imageUrl = "imageUrl"
            :handlePreviewImg="handlePreviewImg"
            />
          </div>
        </div>
        <!-- <input v-model="formDataAddCourse.created_by" type="hidden" name=""> -->
        <div class="flex justify-end p-10">
          <SubmitButtonPrimary title="Xác nhận" />
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import ButtonPrimary from '@/components/admin/Button/ButtonPrimary.vue';
import CkeditorGroup from '@/components/admin/Dialog/CkeditorGroup.vue';
import DescriptionGroup from '@/components/admin/Dialog/DescriptionGroup.vue';
import InputGroup from '@/components/admin/Dialog/InputGroup.vue';
import RadioGroup from '@/components/admin/Dialog/RadioGroup.vue';
import SelectGroup from '@/components/admin/Dialog/SelectGroup.vue';
import UploadGroup from '@/components/admin/Dialog/UploadGroup.vue';
import HeaderNavbar from '@/components/admin/Headernavbar/HeaderNavbar.vue';
import { useSidebarStore } from '@/store/sidebar';
import { onMounted, ref } from 'vue'
import useCourse from '@/composables/admin/useCourse';
// import useFetchCategories from '@/composables/admin/category/useCardCategory';
import type { TListCategories } from '@/interfaces/category.interface';
import ButtonPrimarySm from '@/components/admin/Button/ButtonPrimarySm.vue';
import SubmitButtonPrimary from '@/components/admin/Button/SubmitButtonPrimary.vue';
import { ArrowPathIcon } from '@heroicons/vue/24/outline';
import { useCategoryStore } from '@/store/category';


const { formDataAddCourse, courseLevels, fetchCourseLevels, fetchLanguages, languages, submitForm , handlePreviewImg, imageUrl} = useCourse();
// const { categories, fetchCategories } = useFetchCategories();

const {categories, fetchCategoriesCRUD} = useCategoryStore()

const parentCategories = ref([]);

// Lọc danh mục có parent_id là null
onMounted(async() => {
  await fetchCategoriesCRUD();
  fetchCourseLevels()
  fetchLanguages()
  parentCategories.value = categories.value.filter((category: TListCategories) => category.parent_id === null);
});
const sidebarStore = useSidebarStore()


//ck editor

const updateDescription = (newDescription: string) => {
  formDataAddCourse.value.description = newDescription;
};
//ck editor




// Biến cho phần "Có phí" và "Miễn phí"
const paid = ref('1')
const radio2 = ref('1')
const checked2 = ref(false)

</script>
