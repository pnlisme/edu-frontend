<template>
    <div class="p-6 bg-gray-50 min-h-screen">
        <div class="mx-auto bg-white shadow-lg rounded-lg flex flex-col gap-5 p-6 space-y-2">
            <!-- Bộ lọc -->
            <div class="flex flex-col gap-4 bg-gray-100 p-4 rounded-md">
                <el-row :gutter="20">
                    <!-- Từ khóa -->
                    <el-col :span="6">
                        <el-input v-model="filters.keyword" placeholder="Tìm kiếm theo từ khóa" clearable />
                    </el-col>

                    <!-- Thể loại -->
                    <el-col :span="6">
                        <el-select v-model="filters.category_id" placeholder="Chọn thể loại" clearable>
                            <el-option v-for="category in apiStore.categories" :key="category.id" :label="category.name"
                                :value="category.id" />
                        </el-select>
                    </el-col>

                    <!-- Ngôn ngữ -->
                    <el-col :span="6">
                        <el-select v-model="filters.language_id" placeholder="Chọn ngôn ngữ" clearable>
                            <el-option v-for="language in apiStore.languagies" :key="language.id" :label="language.name"
                                :value="language.id" />
                        </el-select>
                    </el-col>

                    <!-- Cấp độ -->
                    <el-col :span="6">
                        <el-select v-model="filters.level_id" placeholder="Chọn cấp độ" clearable>
                            <el-option v-for="level in apiStore.levels" :key="level.id" :label="level.name"
                                :value="level.id" />
                        </el-select>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <!-- Trạng thái -->
                    <el-col :span="6">
                        <el-select v-model="filters.status" placeholder="Chọn trạng thái" clearable>
                            <el-option label="Đã duyệt" value="active" />
                            <el-option label="Chờ phê duyệt" value="inactive" />
                        </el-select>
                    </el-col>

                    <!-- Sắp xếp theo giá -->
                    <el-col :span="6">
                        <el-select v-model="filters.order_price" placeholder="Sắp xếp theo giá" clearable>
                            <el-option label="Tăng dần" value="asc" />
                            <el-option label="Giảm dần" value="desc" />
                        </el-select>
                    </el-col>
                </el-row>

                <!-- Nút hành động -->
                <div class="flex justify-end gap-4 mt-4">
                    <el-button type="default" @click="resetFilters">Đặt lại</el-button>
                    <el-button type="primary" @click="applyFilters">Lọc</el-button>
                </div>
            </div>
            <div class="flex items-center justify-between mb-10">
                <h3 class="text-md font-semibold mb-4">Nội dung bài học</h3>
                <div class="flex gap-2">
                    <el-button type="primary" @click="openDialogCreateCourse">+ Thêm khóa học</el-button>
                    <!-- <el-button type="success">
                        <ArrowPathIcon class="mr-1 h-4 w-4 text-white" />
                        Khôi phục
                    </el-button> -->
                </div>
            </div>
            <div class="mt-5 gap-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                <!-- <div class="" v-for="course in listCourseTeacher" :key="course.id" :id="course.id">


                    {{ course }}
                </div> -->
                <CardCourseAdmin v-for="course in listCourseTeacher" :key="course.id" :data="course" />
                <!-- <CardCourseAdmin v-for="course in listCourseTeacher" :key="course.id" :id="course.id"
                    :title="course.title"
                    :thumbnail="course.thumbnail || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                    :creator="course.creator" :tag="course.tag" :lectures_count="course.lectures_count"
                    :level="course.level" :current_price="course.current_price" :old_price="course.old_price" /> -->
            </div>
            <div class="flex justify-center">
                <el-pagination background layout="prev, pager, next" v-model:current-page="pagination.currentPage"
                    :page-size="pagination.perPage" :total="pagination.total" @current-change="handlePageChange" />
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogCreateCourseVisible" title="Tạo Khóa Học" width="70%">
        <el-form :model="courseForm" :rules="rules" ref="courseFormRef">
            <!-- Tiêu đề khóa học -->
            <el-form-item label="Tiêu đề" prop="title" class="block">
                <el-input v-model="courseForm.title" placeholder="Nhập tiêu đề khóa học" />
            </el-form-item>

            <!-- Mô tả ngắn -->
            <el-form-item label="Mô tả ngắn" prop="short_description" class="block">
                <el-input v-model="courseForm.short_description" type="textarea" placeholder="Nhập mô tả ngắn" />
            </el-form-item>

            <!-- Mô tả chi tiết -->
            <el-form-item label="Mô tả" prop="description" class="block">
                <el-input v-model="courseForm.description" type="textarea" placeholder="Nhập mô tả chi tiết" />
            </el-form-item>

            <!-- Tải ảnh lên -->
            <el-form-item label="Hình ảnh" prop="thumbnail" class="block">
                <el-upload list-type="picture-card" :auto-upload="false" :file-list="fileList"
                    :on-change="handleFileChange" :on-remove="handleRemoveImage" :before-upload="handleFileChange"
                    accept="image/*" :limit="1">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>

            <!-- Giá -->
            <el-form-item label="Giá" prop="price" class="block">
                <el-input v-model="courseForm.price" placeholder="Nhập giá khóa học" />
            </el-form-item>

            <!-- Giảm giá -->
            <el-form-item label="Giảm giá" prop="type_sale" class="block">
                <div class="!flex !flex-col">

                    <el-radio-group v-model="courseForm.type_sale" @change="handleDiscountChange">
                        <el-radio label="percent">Theo phần trăm</el-radio>
                        <el-radio label="price">Theo giá tiền</el-radio>
                    </el-radio-group>
                    <div v-if="courseForm.type_sale">
                        <el-input v-model="courseForm.sale_value"
                            :placeholder="courseForm.type_sale === 'percent' ? 'Nhập % giảm giá' : 'Nhập số tiền giảm giá'"
                            class="mt-2 " />
                    </div>
                </div>
            </el-form-item>

            <!-- Trạng thái -->
            <!-- <el-form-item label="Trạng thái" prop="status" class="block">
                <el-select v-model="courseForm.status" placeholder="Chọn trạng thái">
                    <el-option label="Hoạt động" value="active" />
                    <el-option label="Không hoạt động" value="inactive" />
                </el-select>
            </el-form-item> -->

            <!-- level -->
            <el-form-item label="Cấp độ" prop="level_id" class="block">
                <el-select v-model="courseForm.level_id" placeholder="Chọn cấp độ">
                    <el-option v-for="level in apiStore.levels" v-bind:key="level.id" :label="level.name"
                        :value="level.id" />
                </el-select>
            </el-form-item>
            <!-- Ngôn ngữ -->
            <el-form-item label="Thể loại" prop="category_id" class="block">
                <el-select v-model="courseForm.category_id" placeholder="Chọn ngôn ngữ">
                    <el-option v-for="category in apiStore.categories" v-bind:key="category.id" :value="category.id"
                        :label="category.name" />

                </el-select>
            </el-form-item>
            <!-- Ngôn ngữ -->
            <el-form-item label="Ngôn ngữ" prop="language_id" class="block">
                <el-select v-model="courseForm.language_id" placeholder="Chọn ngôn ngữ">
                    <el-option v-for="language in apiStore.languagies" v-bind:key="language.id" :value="language.id"
                        :label="language.name" />

                </el-select>
            </el-form-item>

            <!-- Nút tạo khóa học -->
            <div class="text-right">
                <el-button @click="resetForm">Đặt lại</el-button>
                <el-button type="primary" @click="submitForm">Tạo khóa học</el-button>
            </div>
        </el-form>

    </el-dialog>
    <Loading :active="loading" :is-full-page="true" />
</template>

<script setup lang="ts">
import CardCourseAdmin from '@/components/ui/card/CardCourseAdmin.vue';
import { apisStore } from '@/store/apis';
import { useCourseStore } from '@/store/course';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue';
import Loading from 'vue-loading-overlay';

const apiStore = apisStore()


const courseStore = useCourseStore()
const { listCourseTeacher, loading, totalCourse } = storeToRefs(courseStore)
const { fetchAdminCourse, createCourse, } = courseStore


const dialogCreateCourseVisible = ref(false)
const courseForm = ref({
    category_id: "",
    level_id: "",
    title: "",
    description: "",
    short_description: "",
    price: "",
    type_sale: "",
    sale_value: "",
    // status: "active",
    language_id: "",
    thumbnail: "",
});




const fileList = ref([]);
const courseFormRef = ref();

const rules = {
    title: [{ required: true, message: "Tiêu đề không được để trống", trigger: "blur" }],
    short_description: [{ required: true, message: "Mô tả ngắn không được để trống", trigger: "blur" }],
    description: [{ required: true, message: "Mô tả không được để trống", trigger: "blur" }],
    price: [{ required: true, message: "Giá không được để trống", trigger: "blur" }],
    type_sale: [{ required: false }],
    sale_value: [
        { required: false, validator: validateDiscountValue, trigger: "blur" },
    ],
};
const handleFileChange = (file: any) => {
    // Kiểm tra kích thước tệp
    const maxFileSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxFileSize) {
        ElMessage.error("Kích thước ảnh đại diện không được vượt quá 2MB.");
        return false; // Không thêm file vào danh sách
    }

    courseForm.value.thumbnail = file.raw;
    return true;
};
const handleRemoveImage = () => {
    courseForm.value.thumbnail = "";
};


function validateDiscountValue(rule: any, value: any, callback: any) {
    if (courseForm.value.type_sale && !value) {
        return callback(new Error("Giảm giá không được để trống"));
    }
    callback();
}

const handleDiscountChange = (value: string) => {
    courseForm.value.sale_value = "";
};


const resetForm = () => {
    courseForm.value = {
        category_id: "",
        level_id: "",
        title: "",
        description: "",
        short_description: "",
        price: "",
        type_sale: "",
        sale_value: "",
        // status: "active",
        language_id: "",
        thumbnail: "",
    };
    fileList.value = [];
};

const openDialogCreateCourse = () => {
    dialogCreateCourseVisible.value = true
}

const submitForm = async () => {
    await courseFormRef.value?.validate(async (valid: boolean) => {
        const formData = new FormData();
        Object.keys(courseForm.value).forEach((key) => {
            formData.append(key, (courseForm.value as any)[key]);
        });
        dialogCreateCourseVisible.value = false
        await createCourse(formData);
        await fetchAdminCourse()
        resetForm();
    });
};

// boô loc 
const filters = reactive({
    keyword: '',
    category_id: '',
    language_id: '',
    level_id: '',
    status: '',
    order_price: '',
});

// Reset bộ lọc
const resetFilters = () => {
    Object.assign(filters, {
        keyword: '',
        category_id: '',
        language_id: '',
        level_id: '',
        status: '',
        order_price: '',
    });
    pagination.currentPage = 1; // Reset trang
    fetchCourses();
};

// Áp dụng bộ lọc
const applyFilters = () => {
    pagination.currentPage = 1; // Reset trang
    fetchCourses();
};
const pagination = reactive({
    currentPage: 1,
    perPage: 8,
    total: 0, // Tổng số dữ liệu, sẽ được API cập nhật
});
// Fetch khóa học
const fetchCourses = async () => {
    const params = {
        page: pagination.currentPage, // Trang hiện tại
        per_page: pagination.perPage,
        keyword: filters.keyword,
        category_id: filters.category_id,
        language_id: filters.language_id,
        level_id: filters.level_id,
        status: filters.status,
        order_price: filters.order_price,
    };

    await fetchAdminCourse(params); // Gọi API
    pagination.total = totalCourse.value; // Cập nhật tổng số lượng
};
// Thay đổi trang
const handlePageChange = (page: number) => {
    pagination.currentPage = page;
    fetchCourses();
};
onMounted(async () => {
    await fetchCourses();
    // await fetchTeacherCourse()
    await apiStore.fetchCate()
    await apiStore.fetchLevel()
    await apiStore.fetchLang()
})
</script>




<style scoped></style>