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
                <CardCategory
                    image="https://demo.creativeitem.com/academy-laravel/public/uploads/category-logo/web-development-logo-1718273508.png"
                    name="Phát triển Web" :countCourse="10" />
                <CardCategory
                    image="https://demo.creativeitem.com/academy-laravel/public/uploads/category-logo/graphic-design-logo-1718524053.png"
                    name="Thiết kế đồ họa" :countCourse="10" />
                <CardCategory
                    image="https://demo.creativeitem.com/academy-laravel/public/uploads/category-logo/user-experience-logo-1718524065.png"
                    name="UI/UX" :countCourse="10" />
                <CardCategory
                    image="https://demo.creativeitem.com/academy-laravel/public/uploads/category-logo/3d-and-animation-logo-1718524102.png"
                    name="3D và hoạt hình" :countCourse="10" />
                <CardCategory
                    image="https://demo.creativeitem.com/academy-laravel/public/uploads/category-logo/music-logo-1718524117.png"
                    name="Âm nhạc" :countCourse="10" />
                <CardCategory
                    image="https://demo.creativeitem.com/academy-laravel/public/uploads/category-logo/web-development-logo-1718273508.png"
                    name="Phát triển Web" :countCourse="10" />

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

                    <ul class="sm:flex gap-3 hidden ">
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

                    </ul>
                    <div class="flex">
                        <RouterLink to="/course" class="sm:hidden block ">
                            <div class="px-3 py-3 flex items-center justify-center rounded-lg bg-indigo-600">
                                <FunnelIcon class="h-5  font-semibold w-5 text-white " />
                            </div>
                        </RouterLink>
                    </div>
                    <h3 class="mt-5 font-semibold text-2xl">
                        Giúp bạn có thêm cơ hội nghề nghiệp với Thiết kế đồ họa
                    </h3>
                </div>

                <div class="mt-5 gap-5 grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2">
                    <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                        lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training" lessons="12"
                        level="Mới bắt đầu" price="999.000" oldPrice="299.000" status="Bán chạy" />
                    <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                        lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training" lessons="12"
                        level="Mới bắt đầu" price="999.000" oldPrice="" status="Mới" />
                </div>
            </div>



            <div class="mt-16">
                <h3 class="mt-5 font-semibold text-2xl">
                    Khóa học hàng đầu
                </h3>
                <div class="mt-5 gap-5 grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2">
                    <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                        lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training" lessons="12"
                        level="Mới bắt đầu" price="999.000" oldPrice="299.000" status="Bán chạy" />
                    <CardCourse image="https://img-c.udemycdn.com/course/240x135/4993276_3452.jpg"
                        lecture="Nguyễn Hoàng Thông" name="Learn Figma - UI/UX Design Essential Training" lessons="12"
                        level="Mới bắt đầu" price="999.000" oldPrice="" status="Mới" />
                </div>
            </div>
        </section>

    </main>
    <div class="mt-16">
        <UserHero2 />
    </div>
    <div class="mt-16">
        <UserNewsLetter />
    </div>


</template>

<script lang="ts" setup>
import { FunnelIcon } from '@heroicons/vue/24/outline'
import UserHero from '@/components/user/UserHero.vue';
import UserCompany from '@/components/user/UserCompany.vue';
import CardCategory from '@/components/ui/card/CardCategory.vue';
import CardCourse from '@/components/ui/card/CardCourse.vue';
import { RouterLink } from 'vue-router';
import UserHero2 from '@/components/user/UserHero2.vue';
import UserNewsLetter from '@/components/user/UserNewsLetter.vue';
import { useI18n } from 'vue-i18n';
import api from '@/services/axiosConfig';
const { locale } = useI18n();
// const changeLanguage = (event: Event) => {
//     const selectedLanguage = (event.target as HTMLSelectElement).value;
//     locale.value = selectedLanguage;
// };

</script>