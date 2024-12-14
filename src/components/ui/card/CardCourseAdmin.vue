<template>

    <div
        class=" cursor-pointer rounded-lg p-3 bg-white shadow-md hover:shadow-lg hover:transition-all transition-all hover:duration-300 duration-300 group ">
        <div class="relative overflow-hidden">
            <!-- IMAGE  -->
            <div class="rounded-lg overflow-hidden">
                <img @click="navigateToDetail(data.id)"
                    class="group-hover:scale-105  scale-100 hover:transition-all transition-all hover:duration-300 duration-300 cursor-pointer object-cover w-full h-36"
                    :src="data.thumbnail" alt="Product Image" />
            </div>
            <!-- BODY  -->
            <div @click="navigateToDetail(data.id)" class="mt-2 flex flex-col gap-2">
                <div v-if="data.tag" class="flex justify-between items-center">
                    <span class="text-sm w-32">{{ data.creator }}</span>
                    <button v-if="data.tag !== 'none'" :class="data.tag === 'Mới nhất' ? 'bg-green-400' : 'bg-pink-400'"
                        class="text-sm border rounded-md px-2 py-0.5 text-white">{{ data.tag }}</button>
                </div>
                <h3 class="text-[16px] font-medium leading-6">{{ data.title }}</h3>
                <ul class="flex  gap-3">
                    <!-- <li class="flex items-center gap-1">
                        <ClockIcon class="h-4 w-4 text-gray-500" />
                        <span class="text-[12px]">120 Giờ</span>
                    </li> -->
                    <li class="flex items-center gap-1">
                        <BookOpenIcon class="h-4 w-4 text-gray-500" />
                        <span class="text-[12px]">{{ data.lectures_count }} Chương học</span>
                    </li>
                    <li class="flex items-center gap-1">
                        <RocketLaunchIcon class="h-4 w-4 text-gray-500" />
                        <span class="text-[12px]">{{ data.level }}</span>
                    </li>
                </ul>

                <div class="flex items-end gap-3">
                    <span class="text-lg text-gray-800 font-bold">{{ formatPrice(data.current_price) }}</span>
                    <del v-if="data.old_price" class="text-gray-500">{{ formatPrice(data.old_price) }}</del>
                </div>

                <div v-if="data.status === 'active'"
                    class="bg-green-400 rounded-md flex items-center justify-center py-1 font-medium text-white">Đã
                    duyệt </div>
                <div v-else
                    class="bg-yellow-200 rounded-md flex items-center justify-center py-1 font-medium text-gray-900">
                    Chờ
                    duyệt</div>
            </div>
            <div
                class="absolute  top-2 right-2 opacity-0 translate-x-11 group-hover:translate-x-0  hover:transition-all duration-300 group-hover:opacity-100  ">
                <div class="flex flex-col gap-2">
                    <button @click="navigateToEditPage(data.id)"
                        class="bg-indigo-500 hover:bg-indigo-600 hover:transition-all transition-all hover:duration-300 duration-300 p-2 rounded-full">
                        <ListBulletIcon class="h-5 w-5  text-white" />
                    </button>
                    <button v-if="userRole !== 'admin'" @click="openEditDialog(data)"
                        class="bg-indigo-500 hover:bg-indigo-600 hover:transition-all transition-all hover:duration-300 duration-300 p-2 rounded-full">
                        <PencilSquareIcon class="h-5 w-5  text-white" />
                    </button>
                    <button v-if="userRole !== 'admin'" @click="handleDelete(data.id)"
                        class="bg-indigo-500 hover:bg-indigo-600 hover:transition-all transition-all hover:duration-300 duration-300 p-2 rounded-full">
                        <TrashIcon class="h-5 w-5  text-white" />
                    </button>
                    <button v-if="userRole === 'admin'" @click="handleUpdateStatus(data.id)"
                        class="bg-indigo-500 hover:bg-indigo-600 hover:transition-all transition-all hover:duration-300 duration-300 p-2 rounded-full">
                        <PencilSquareIcon class="h-5 w-5  text-white" />
                    </button>

                </div>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogEditCourseVisible" title="Cập Nhật Khóa Học" width="70%">
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
                <!-- <el-upload list-type="picture-card" :auto-upload="false" :file-list="fileList"
                    :on-change="handleFileChange" :on-remove="handleRemoveImage" accept="image/*" :limit="1">
                    <el-icon>
                        <div v-if="typeof courseForm.thumbnail === 'string' && courseForm.thumbnail">
                            <img :src="courseForm.thumbnail" style="width: 100%;" />
                        </div>
                        <div v-else>
                            <Plus />
                        </div>
                    </el-icon>
                </el-upload> -->
                <el-upload list-type="picture-card" :auto-upload="false" :file-list="fileList"
                    :on-change="handleFileChange" :on-remove="handleRemoveImage" accept="image/*" :limit="1">
                    <el-icon>
                        <div v-if="typeof courseForm.image === 'string'">
                            <img :src="courseForm.image" />
                        </div>
                        <div v-else>
                            <Plus />
                        </div>
                    </el-icon>
                </el-upload>
                <!-- <el-upload list-type="picture-card" :auto-upload="false" :file-list="fileList"
                    :on-change="handleFileChange" :on-remove="handleRemoveImage" accept="image/*" :limit="1">
                    <div v-if="typeof courseForm.thumbnail === 'string' && courseForm.thumbnail">
                        <img :src="courseForm.thumbnail" style="width: 100%;" />
                    </div>
                    <div v-else>
                        <Plus />
                    </div>
                </el-upload> -->
            </el-form-item>

            <!-- Giá -->
            <el-form-item label="Giá" prop="price" class="block">
                <el-input v-model="courseForm.price" placeholder="Nhập giá khóa học" />
            </el-form-item>

            <!-- Giảm giá -->
            <el-form-item label="Giảm giá" prop="type_sale" class="block">
                <div class="!flex !flex-col">
                    <el-radio-group v-model="courseForm.type_sale" @change="handleDiscountChange">
                        <el-radio value="percent">Theo phần trăm</el-radio>
                        <el-radio value="price">Theo giá tiền</el-radio>
                    </el-radio-group>
                    <div v-if="courseForm.type_sale">
                        <el-input v-model="courseForm.sale_value"
                            :placeholder="courseForm.type_sale === 'percent' ? 'Nhập % giảm giá' : 'Nhập số tiền giảm giá'"
                            class="mt-2 " />
                    </div>
                </div>
            </el-form-item>

            <!-- level -->
            <el-form-item label="Cấp độ" prop="level_id" class="block">
                <el-select v-model="courseForm.level_id" placeholder="Chọn cấp độ">
                    <el-option v-for="level in apiStore.levels" :key="level.id" :label="level.name" :value="level.id" />
                </el-select>
            </el-form-item>
            <!-- Ngôn ngữ -->
            <el-form-item label="Ngôn ngữ" prop="language_id" class="block">
                <el-select v-model="courseForm.language_id" placeholder="Chọn ngôn ngữ">
                    <el-option v-for="language in apiStore.languagies" :key="language.id" :value="language.id"
                        :label="language.name" />
                </el-select>
            </el-form-item>
            <!-- Thể loại -->
            <el-form-item label="Thể loại" prop="category_id" class="block">
                <el-select v-model="courseForm.category_id" placeholder="Chọn thể loại">
                    <el-option v-for="category in apiStore.categories" :key="category.id" :value="category.id"
                        :label="category.name" />
                </el-select>
            </el-form-item>

            <!-- Nút cập nhật -->
            <div class="text-right">
                <el-button @click="resetForm">Đặt lại</el-button>
                <el-button type="primary" @click="submitUpdateForm">Cập nhật</el-button>
            </div>
        </el-form>
    </el-dialog>
    <Loading :active="loading" :is-full-page="true" />
</template>

<script setup lang="ts">
import { useCart } from '@/composables/user/useCart';
import { apisStore } from '@/store/apis';
import { useAuthStore } from '@/store/auth';
import { useCourseStore } from '@/store/course';
import { useWishlistStore } from '@/store/wishlist';
import { formatPrice } from '@/utils/formatPrice';
import { Plus } from '@element-plus/icons-vue';
import { TrashIcon } from "@heroicons/vue/20/solid";
import { BookOpenIcon, ListBulletIcon, PencilSquareIcon, RocketLaunchIcon } from "@heroicons/vue/24/outline";
import { ElMessage, ElNotification } from 'element-plus';
import { storeToRefs } from 'pinia';
import { defineProps, ref } from 'vue';
import Loading from 'vue-loading-overlay';
import { useRouter } from 'vue-router';
const props = defineProps<{ data: any }>();

const apiStore = apisStore()


// checkroute 
const authStore = useAuthStore()
const { state } = storeToRefs(authStore)
const userRole = state.value.user?.role
const router = useRouter();



const courseStore = useCourseStore()
const { listCourseTeacher, loading } = storeToRefs(courseStore)
const { fetchTeacherCourse, updateCourse, deleteCourse, updateStatusCourse } = courseStore
// const { navigateToDetail } = useCourseDetail()
const navigateToDetail = (id: number) => {
    router.push({ name: 'user.course.detail', params: { id: String(id) } });
};
const { handleAddToCart } = useCart();

const navigateToEditPage = (id: number) => {
    router.push({ name: 'CourseEditPage', params: { id: String(id) } });
};
// wishlist 
const wishlistStore = useWishlistStore();
const { addToWishlist, removeFromWishlist } = wishlistStore
const { wishlist } = storeToRefs(wishlistStore)

// Hàm kiểm tra nếu khóa học có trong wishlist
const isInWishlist = (id: number) => {
    return wishlist.value.some((item) => item.id === id);
};


const handleDelete = async (id: number) => {
    await deleteCourse(id)


}
// Hàm thêm/xóa khóa học khỏi wishlist
const toggleWishlist = (id: number) => {
    if (isInWishlist(id)) {
        removeFromWishlist(id);
        ElNotification({
            title: 'Thông báo',
            message: 'Đã xóa vào mục yêu thích',
            type: 'success',
            duration: 1000
        })
    } else {
        addToWishlist(id);
        ElNotification({
            title: 'Thông báo',
            message: 'Đã thêm vào mục yêu thích',
            type: 'success',
            duration: 1000
        })
    }
};



const courseForm = ref<any>({
    id: null,
    category_id: "",
    level_id: "",
    title: "",
    description: "",
    short_description: "",
    price: "",
    type_sale: "",
    sale_value: "",
    language_id: "",
    thumbnail: "",
    originalImage: '',
});
const dialogEditCourseVisible = ref(false);
const fileList = ref<any[]>([])
const courseFormRef = ref();
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
    fileList.value = [] // Xóa danh sách file
    courseForm.value.thumbnail = '' // Xóa file khỏi form
}
const rules = {
    title: [{ required: true, message: "Tiêu đề không được để trống", trigger: "blur" }],
    short_description: [{ required: true, message: "Mô tả ngắn không được để trống", trigger: "blur" }],
    description: [{ required: true, message: "Mô tả không được để trống", trigger: "blur" }],
    price: [{ required: true, message: "Giá không được để trống", trigger: "blur" }],
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
        originalImage: '',
    };
    fileList.value = [];
};

const openEditDialog = (course: any) => {
    dialogEditCourseVisible.value = true;
    courseForm.value = {
        id: course.id, // Gán ID khóa học
        category_id: course.category_id,
        level_id: course.level_id,
        title: course.title,
        description: course.description,
        short_description: course.short_description,
        price: course.current_price,
        type_sale: course.type_sale,
        sale_value: course.sale_value,
        language_id: course.language_id,
        thumbnail: course.thumbnail,
        originalImage: course.thumbnail,
    };
    if (typeof course.thumbnail === "string") {
        fileList.value = [{ name: "Current Image", url: course.thumbnail }];
    }
};
const handleDiscountChange = (value: string) => {
    courseForm.value.sale_value = "";
};

const submitUpdateForm = async () => {
    await courseFormRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            const formData = new FormData();

            if (courseForm.value.category_id) formData.append('category_id', courseForm.value.category_id)
            if (courseForm.value.level_id) formData.append('level_id', courseForm.value.level_id)
            if (courseForm.value.title) formData.append('title', courseForm.value.title)
            if (courseForm.value.description) formData.append('description', courseForm.value.description)
            if (courseForm.value.short_description) formData.append('short_description', courseForm.value.short_description)
            if (courseForm.value.price) formData.append('price', courseForm.value.price)
            if (courseForm.value.type_sale) formData.append('type_sale', courseForm.value.type_sale)
            if (courseForm.value.sale_value) formData.append('sale_value', courseForm.value.sale_value)
            if (courseForm.value.language_id) formData.append('language_id', courseForm.value.language_id)
            if (courseForm.value.thumbnail &&
                courseForm.value.thumbnail !== courseForm.value.originalImage) {
                if (courseForm.value.thumbnail instanceof File) {
                    formData.append('thumbnail', courseForm.value.thumbnail) // Thêm file nếu là File
                }
            } else {
                if (courseForm.value.thumbnail instanceof File) {
                    formData.append('thumbnail', courseForm.value.originalImage) // Thêm file nếu là File
                }
            }
            dialogEditCourseVisible.value = false;
            await updateCourse(courseForm.value.id, formData); // Gửi dữ liệu
            await fetchTeacherCourse();
            resetForm();
        }
    });
};



const handleUpdateStatus = async (id: number) => {
    // Lấy thông tin hiện tại của khóa học từ `data`
    const course = listCourseTeacher.value.find((item: any) => item.id === id);
    if (!course) {
        ElMessage.error("Không tìm thấy khóa học.");
        return;
    }

    // Đổi trạng thái giữa `active` và `inactive`
    const newStatus = course.status === "active" ? "inactive" : "active";

    await updateStatusCourse(id, newStatus)


};


</script>