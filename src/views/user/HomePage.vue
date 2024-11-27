<template>
    <!-- <div class="">
        <h1>{{ $t('home.title') }}</h1>
        <p>{{ $t('home.welcomeMessage') }}</p>
        <button>{{ $t('home.buttonText') }}</button>
    </div>
    <select @change="changeLanguage($event)">
        <option value="vi">Tiếng Việt</option>
        <option value="en">English</option>
    </select> -->

    <main class="pb-16">
        <UserHero />
        <UserCompany />
        <!-- CATEGORY -->
        <section class="container-user mt-16">
            <div class="text-center">
                <span class="text-lg font-medium text-indigo-600">Thể loại</span>
                <h3 class="text-3xl font-medium">Khám phá các khóa học hàng đầu</h3>
            </div>
            <div class="grid  md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                <CardCategory v-for="category in apiStore.categories" :key="category.id" :name="category.name"
                    :image="category.image || 'https://demo.creativeitem.com/academy-laravel/public/uploads/category-logo/web-development-logo-1718273508.png'"
                    :courses_count="category.id" />

            </div>
        </section>

        <!-- PRODUCT -->
        <section class="container-user mt-16">
            <div class="flex flex-col gap-3">
                <h1 class="text-4xl font-semibold">Tuyển tập khóa học rộng lớn</h1>
                <span class="text-lg w-1/2 text-gray-500">Lựa chọn trong số hơn 250000 khóa học video online với nhiều
                    nội dung bổ
                    sung mới
                    được
                    xuất bản
                    hàng tháng</span>
            </div>

            <div class="mt-5">
                <!-- FILTER -->
                <div class="">

                    <!-- <ul class="sm:flex gap-3 hidden ">
                        <li class="text-lg font-medium p-2  border-indigo-600 border-b-4 text-indigo-600">Thiết kế đồ
                            họa
                        </li>
                        <li
                            class="text-md font-medium p-2 hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 cursor-pointer animation text-gray-500">
                            Phát triển web</li>
                        <li
                            class="text-md font-medium p-2 hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 cursor-pointer animation text-gray-500">
                            Javascript</li>
                        <li
                            class="text-md font-medium p-2 hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 cursor-pointer animation text-gray-500">
                            Khoa học máy tính</li>
                        <li
                            class="text-md font-medium p-2 hover:text-indigo-600 hover:border-b-4 hover:border-indigo-600 cursor-pointer animation text-gray-500">
                            Vẽ</li>

                    </ul> -->
                    <div class="flex">
                        <RouterLink to="/course" class="sm:hidden block ">
                            <div class="px-3 py-3 flex items-center justify-center rounded-lg bg-indigo-600">
                                <FunnelIcon class="h-5  font-semibold w-5 text-white " />
                            </div>
                        </RouterLink>
                    </div>
                    <h3 class="mt-5 font-semibold text-2xl">
                        Giúp bạn có thêm cơ hội nghề nghiệp với những khóa học phổ biến
                    </h3>
                </div>

                <div class="mt-5 gap-5 grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2">

                    <CardCourse v-for="course in apiStore.coursesPopular" :key="course.id" :id="course.id"
                        :title="course.title"
                        :thumbnail="course.thumbnail || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                        :creator="course.creator" :tag="course.tag" :lectures_count="course.lectures_count"
                        :level="course.level" :current_price="course.current_price" :old_price="course.old_price" />
                </div>
            </div>



            <div class="mt-16">
                <h3 class="mt-5 font-semibold text-2xl">
                    Khóa học hàng đầu
                </h3>
                <div class="mt-5 gap-5 grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2">
                    <CardCourse v-for="course in apiStore.coursesRate" :key="course.id" :id="course.id"
                        :title="course.title"
                        :thumbnail="course.thumbnail || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                        :creator="course.creator" :tag="course.tag" :lectures_count="course.lectures_count"
                        :level="course.level" :current_price="course.current_price" :old_price="course.old_price" />
                </div>
            </div>
        </section>

    </main>
    <div class="mt-16">
        <UserHero2 />
    </div>
    <div class="my-16">
        <UserNewsLetter />
    </div>



</template>

<script lang="ts" setup>
import { FunnelIcon } from '@heroicons/vue/24/outline'
import UserHero from '@/components/user/UserHero.vue';
import UserCompany from '@/components/user/UserCompany.vue';
import CardCategory from '@/components/ui/card/CardCategory.vue';
import CardCourse from '@/components/ui/card/CardCourse.vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import UserHero2 from '@/components/user/UserHero2.vue';
import UserNewsLetter from '@/components/user/UserNewsLetter.vue';
import { useI18n } from 'vue-i18n';
import { onMounted, ref } from 'vue';
import { apisStore } from '@/store/apis';
import api from '@/services/axiosConfig';
import { ElNotification } from 'element-plus';
const { locale } = useI18n();
// const changeLanguage = (event: Event) => {
//     const selectedLanguage = (event.target as HTMLSelectElement).value;
//     locale.value = selectedLanguage;
// };
// const { categories, getCourses, fetchCate, fetchCourse } = useHome()
// onMounted(() => {
//     fetchCate();
//     fetchCourse()
// });
const route = useRoute();
const router = useRouter()
const apiStore = apisStore()
const session_id = ref<string | undefined>('')
const status = ref<'success' | 'error'>('error');
const message = ref('');
const loading = ref(true);

onMounted(async () => {
    apiStore.fetchCate()
    apiStore.fetchCourse()
    apiStore.fetchPopularCourse()
    apiStore.fetchRateCourse()

    const sessionId = route.query.session_id as string | undefined;
    session_id.value = sessionId
    if (session_id.value) {
        try {
            await api.get('/orders/verify-payment/', {
                params: { session_id: session_id.value },
            });
            ElNotification({
                title: 'Thành công ',
                message: 'Thanh toán của bạn thành công ',
                type: 'success'
            })
            router.push('/')
        } catch (error: any) {
            ElNotification({
                title: 'Thông báo',
                message: 'Thanh toán của bạn chưa giải quyết ',
                type: 'warning'
            })
            router.push('/')

        }
    }
    loading.value = false;
})
</script>