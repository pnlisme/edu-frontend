<template>
  <div>
    <div class="p-4">
      <HeaderNavbar :namePage="formDataEditCourse.title">
        <ButtonSecondary :icon="ArrowLeftIcon" link="#" title="Trước" />
        <ButtonSecondary :icon="ArrowTopRightOnSquareIcon" link="#" title="Hỗ trợ" />
      </HeaderNavbar>
    </div>
    <div class="p-4 py-2">
      <div class="background-table">
        <div class="p-3">
          <form @submit.prevent="submitFormEdit">
            <div class="flex justify-between gap-2 lg:flex-row flex-col">
              <div class="flex gap-5">
                <ButtonSecondary
                  :icon="ArrowTopRightOnSquareIcon"
                  link="#"
                  title="Xem trước giao diện"
                  customStyle="!flex-row-reverse font-normal"
                />
                <ButtonSecondary
                  :icon="ArrowTopRightOnSquareIcon"
                  link="#"
                  title="Trình phát khoá học"
                  customStyle="!flex-row-reverse font-normal"
                />
              </div>
              <div class="flex">
                <SubmitButtonPrimary title="Lưu thay đổi" />
              </div>
            </div>
            <div class="pt-4 pb-8">
              <el-tabs
                :tab-position="tabPosition"
                style="height: 200px"
                class="demo-tabs gap-3 !h-auto md:flex-row-reverse flex-col-reverse"
              >
                <el-tab-pane>
                  <template #label>
                    <span class="tab-items-style">
                      <PencilSquareIcon class="w-5 font-bold" />
                      <span>Chương trình giảng dạy</span>
                    </span>
                  </template>
                  <div class="px-2">
                    <div class="my-2 flex gap-2">
                      <!-- button dialog 1 new section -->
                      <ButtonPrimarySm
                        title="Thêm chương"
                        dialogVisible="dialogAddnewSection"
                        link="#"
                        @click="addChapter"
                      />
                      <!-- button dialog 2 new lesson -->
                      <template v-if="section.length > 0">
                        <ButtonPrimarySm
                          title="Thêm bài học"
                          dialogVisible="dialogAddnewLesson"
                          link="#"
                          @click="addLesson"
                        />
                        <!-- button dialog 3 new quiz -->
                        <ButtonPrimarySm
                          title="Thêm quiz"
                          dialogVisible="dialogAddnewQuiz"
                          link="#"
                          @click="addQuiz"
                        />
                        <!-- button dialog 4 sort section -->
                        <ButtonPrimarySm
                          title="Sắp xếp chương"
                          dialogVisible="dialogSortSection"
                          link="#"
                          @click="sortSection"
                        />
                      </template>
                    </div>
                    <template v-if="section.length == 0">
                      <div class="flex flex-row mt-6">
                        <div class="mt-4 basis-8/12">
                          <ButtonAddObject title="Thêm chương mới" />
                        </div>
                      </div>
                    </template>

                    <template v-else>
                      <!-- Dropdown items -->
                      <div class="mt-6">
                        <template
                          v-for="(itemSection, index) in section.slice().reverse()"
                          :key="itemSection.id"
                        >
                          <el-collapse class="mb-2" @change="ActiveToggle">
                            <el-collapse-item
                              name="1"
                              class="group style-input hover:opacity-100"
                              @click.stop
                            >
                              <template #title>
                                {{ index + 1 }}. {{ itemSection.name }}
                                <div
                                  class="gap-2 el-collapse-item__btn flex transition-opacity duration-200 group-hover:opacity-100 opacity-0"
                                  :class="{
                                    'opacity-100': toggleActive,
                                    'opacity-0': !toggleActive
                                  }"
                                >
                                  <ButtonSecondarySm title="Sắp xếp bài học" />
                                  <ButtonSecondarySm
                                    link="#"
                                    :icon="PencilIcon"
                                    @click.prevent="itemSection.id !== undefined && EditChapter(itemSection.id)"
                                  />
                                  <ButtonSecondarySm
                                    link="#"
                                    :icon="TrashIcon"
                                    @click.prevent="itemSection.id !== undefined && handleDeleteSection(itemSection.id)"
                                  />
                                </div>
                              </template>
                              <template
                                v-if="
                                  itemSection.lectures &&
                                  Array.isArray(itemSection.lectures) &&
                                  itemSection.lectures.length > 0
                                "
                              >
                                <template
                                  v-for="itemLecture in itemSection.lectures"
                                  :key="itemLecture.id"
                                >
                                  <div
                                    class="py-2 border-b-2 last:border-none flex justify-between"
                                  >
                                    {{ itemLecture.title }}
                                    <div class="flex gap-2">
                                      <ButtonSecondarySm :icon="PencilIcon" />
                                      <ButtonSecondarySm :icon="TrashIcon" />
                                    </div>
                                  </div>
                                </template>
                              </template>
                              <template v-else>
                                <div class="py-2 border-b-2 last:border-none">
                                  Không có bài học nào
                                </div>
                              </template>
                            </el-collapse-item>
                          </el-collapse>
                        </template>
                      </div>
                    </template>
                  </div>
                </el-tab-pane>

                <el-tab-pane>
                  <template #label>
                    <span class="tab-items-style">
                      <DocumentDuplicateIcon class="w-5 font-bold" />
                      <span>Nền tảng</span>
                    </span>
                  </template>
                  <div class="px-2">
                    <InputGroup
                      label="Tiêu đề"
                      required="*"
                      inputId="name"
                      customsClass="flex flex-row items-center"
                      customsClassChild="basis-2/12"
                      customsClassChild2="basis-10/12 w-full"
                      v-model="formDataEditCourse.title"
                    />

                    <DescriptionGroup
                      label="Mô tả ngắn"
                      inputId="description"
                      inputPlaceHoder="Nhập mô tả..."
                      customsClass="flex flex-row items-center"
                      customsClassChild="basis-2/12"
                      customsClassChild2="basis-10/12 w-full"
                      v-model="formDataEditCourse.short_description"
                    />
                    <CkeditorGroup
                      label="Nội dung"
                      customsClass="flex flex-row items-center"
                      customsClassChild="basis-2/12"
                      customsClassChild2="basis-10/12 w-full"
                      v-model="formDataEditCourse.description"
                    />

                    <SelectGroup
                      inputPlaceHoder="Chọn danh mục cho khoá học"
                      required="*"
                      label="Danh mục"
                      customsClass="flex flex-row items-center"
                      customsClassChild="basis-2/12"
                      customsClassChild2="basis-10/12 w-full"
                      v-model="formDataEditCourse.category_id"
                      :optionsData="categories"
                    />
                    <SelectGroup
                      inputPlaceHoder="Chọn cấp độ cho khoá học"
                      required="*"
                      label="Cấp độ"
                      customsClass="flex flex-row items-center"
                      customsClassChild="basis-2/12"
                      customsClassChild2="basis-10/12 w-full"
                      :optionsData="courseLevels"
                      v-model="formDataEditCourse.level_id"
                    />
                    <SelectGroup
                      inputPlaceHoder="Chọn ngôn ngữ cho khoá học"
                      required="*"
                      label="Ngôn ngữ"
                      customsClass="flex flex-row items-center"
                      customsClassChild="basis-2/12"
                      customsClassChild2="basis-10/12 w-full"
                      :optionsData="languages"
                      v-model="formDataEditCourse.language_id"
                    />
                    <RadioGroup
                      label="Chọn"
                      required="*"
                      customsClass="flex flex-row items-center"
                      customsClassChild="basis-2/12"
                      customsClassChild2="basis-10/12 w-full"
                    >
                      <div class="mb-2 ml-4">
                        <el-radio-group class="grid" v-model="formDataEditCourse.status">
                          <el-radio value="active">Kích hoạt</el-radio>
                          <el-radio value="inactive">Không kích hoạt</el-radio>
                        </el-radio-group>
                      </div>
                    </RadioGroup>
                  </div>
                </el-tab-pane>

                <el-tab-pane>
                  <template #label>
                    <span class="tab-items-style">
                      <BanknotesIcon class="w-5 font-bold" />
                      <span>Loại giá</span>
                    </span>
                  </template>
                  <div class="px-2">
                    <RadioGroup
                      label="Loại giá"
                      customsClass="flex flex-row items-center"
                      customsClassChild="basis-2/12"
                      customsClassChild2="basis-10/12 w-full"
                    >
                      <el-radio-group class="grid" v-model="paid">
                        <el-radio value="1">Có phí</el-radio>
                        <el-radio value="0">Miễn phí</el-radio>
                      </el-radio-group>
                    </RadioGroup>
                    <template
                      :class="{ block: paid == 1, hidden: paid == 0 }"
                      class="transition-opacity translate-y-2 duration-500 ease-in-out"
                    >
                      <InputGroup
                        label="Giá (đơn vị vnđ)"
                        required="*"
                        inputPlaceHoder="Nhập giá của khoá học"
                        customsClass="flex flex-row items-center"
                        customsClassChild="basis-2/12"
                        customsClassChild2="basis-10/12 w-full"
                        v-model="formDataEditCourse.price"
                      />
                      <div v-show="checked2" class="relative">
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="Chuyển sang phần trăm"
                          placement="top"
                        >
                          <ArrowPathIcon
                            class="w-5 absolute top-0 left-[100px] bold color-primary"
                          />
                        </el-tooltip>
                        <InputGroup
                          label="Giá giảm"
                          required="*"
                          inputPlaceHoder="Nhập giá giảm của khoá học"
                          customsClass="flex"
                          customsClassChild="basis-2/12"
                          customsClassChild2="basis-10/12 w-full"
                          v-model="formDataEditCourse.sale_value"
                        />
                      </div>
                      <div class="mt-1 flex justify-end">
                        <el-checkbox
                          class="basis-10/12"
                          v-model="checked2"
                          label="Click nếu khoá học này có sử dụng mã giảm giá"
                          size="large"
                        />
                      </div>
                    </template>
                  </div>
                </el-tab-pane>

                <el-tab-pane>
                  <template #label>
                    <span class="tab-items-style">
                      <InformationCircleIcon class="w-5 font-bold" />
                      <span>Thông tin</span>
                    </span>
                  </template>
                  <div class="px-2">
                    <RadioGroup
                      label="Faq"
                      required="*"
                      inputPlaceHoder="Nhập đường dẫn video"
                      customsClass="flex flex-row"
                      customsClassChild="basis-2/12"
                      customsClassChild2="basis-10/12 w-full"
                      :inputId="inputId"
                    >
                      <div class="">
                        <InputItems :icon="PlusIcon" inputPlaceHoder="Câu hỏi" />
                        <textarea
                          :id="inputId"
                          :name="inputId"
                          placeholder="Trả lời"
                          :value="value"
                          :v-model="modelValue"
                          rows="2"
                          class="block p-2.5 input-style mt-2"
                          :class="customsClassChild2"
                        >
                        </textarea>
                      </div>
                    </RadioGroup>
                    <RadioGroup
                      label="Yêu cầu"
                      required="*"
                      customsClass="flex flex-row"
                      customsClassChild="basis-2/12"
                      customsClassChild2="basis-10/12 w-full"
                    >
                      <div class="">
                        <InputItems :icon="PlusIcon" inputPlaceHoder="Nhập yêu cầu" />
                        <InputItems :icon="MinusIcon" inputPlaceHoder="Nhập yêu cầu" class="mt-2" />
                      </div>
                    </RadioGroup>

                    <RadioGroup
                      label="Kết quả"
                      required="*"
                      customsClass="flex flex-row"
                      customsClassChild="basis-2/12"
                      customsClassChild2="basis-10/12 w-full"
                    >
                      <div class="">
                        <InputItems :icon="PlusIcon" inputPlaceHoder="Nhập kết quả" />
                        <InputItems :icon="MinusIcon" inputPlaceHoder="Nhập kết quả" class="my-2" />
                      </div>
                    </RadioGroup>
                  </div>
                </el-tab-pane>

                <el-tab-pane>
                  <template #label>
                    <span class="tab-items-style">
                      <LinkIcon class="w-5 font-bold" />
                      <span>Phương tiện truyền thông</span>
                    </span>
                  </template>
                  <div class="px-2">
                    <UploadGroup
                      label="Hình ảnh thumbnail"
                      inputPlaceHoder="Nhập giá của khoá học đã giảm"
                      customsClass="flex flex-row items-center"
                      customsClassChild="basis-2/12"
                      customsClassChild2="basis-10/12 w-full"
                      :handlePreviewImg="handlePreviewImg"
                    />
                    <UploadGroup
                      label="Hình ảnh banner"
                      inputPlaceHoder="Nhập giá của khoá học đã giảm"
                      customsClass="flex flex-row items-center"
                      customsClassChild="basis-2/12"
                      customsClassChild2="basis-10/12 w-full"
                    />
                    <div class="border mt-7 mb-5"></div>

                    <RadioGroup
                      label="Video intro"
                      customsClass="flex flex-row items-center"
                      customsClassChild="basis-2/12"
                      customsClassChild2="basis-10/12 w-full"
                    >
                      <el-radio-group class="flex" v-model="linkVideo">
                        <el-radio value="1">Đường dẫn video</el-radio>
                        <el-radio value="0">Tải lên file video</el-radio>
                      </el-radio-group>
                    </RadioGroup>
                    <UploadGroup
                      label="Video file"
                      required="*"
                      customsClass="flex flex-row items-center"
                      customsClassChild="basis-2/12"
                      customsClassChild2="basis-10/12 w-full"
                      :class="{ hidden: linkVideo == 1 }"
                    />
                    <InputGroup
                      label="Video link"
                      inputId="video"
                      required="*"
                      inputPlaceHoder="Nhập đường dẫn video"
                      customsClass="flex flex-row items-center"
                      customsClassChild="basis-2/12"
                      customsClassChild2="basis-10/12 w-full"
                      :class="{ hidden: linkVideo == 0 }"
                    />
                  </div>
                </el-tab-pane>

                <el-tab-pane>
                  <template #label>
                    <span class="tab-items-style">
                      <TagIcon class="w-5 font-bold" />
                      <span>SEO</span>
                    </span>
                  </template>
                  <div class="px-2">
                    <InputGroup
                      label="Tiêu đề SEO (Tên khoá học)"
                      required="*"
                      inputId="name"
                      inputPlaceHoder="Nhập tiêu đề SEO"
                    />
                    <InputOptionGroup
                      label="Từ khoá SEO"
                      required="*"
                      inputId="name"
                      inputPlaceHoder="Nhập từ khoá seo"
                    />
                    <DescriptionGroup
                      label="Mô tả SEO"
                      required="*"
                      inputId="name"
                      inputPlaceHoder="Nhập từ khoá seo"
                    />
                    <InputGroup
                      label="Robot SEO"
                      required="*"
                      inputId="name"
                      inputPlaceHoder="Robot SEO"
                    />
                    <InputGroup
                      label="URL SEO"
                      required="*"
                      inputId="name"
                      inputPlaceHoder="https://demo.edunity.com/edunity-laravel"
                    />
                    <InputGroup
                      label="Tiêu đề Og"
                      required="*"
                      inputId="name"
                      inputPlaceHoder="Responsive Web Design Essentials - HTML5 CSS Bootstrap"
                    />
                    <DescriptionGroup
                      label="Mô tả Og"
                      required="*"
                      inputId="name"
                      inputPlaceHoder="Khóa học tốt nhất để học những kiến ​thức cơ bản về HTML5 và CSS3 từ đầu. Bao gồm 5 dự án, hoàn hảo cho người mới bắt đầu."
                    />
                    <RadioGroup label="Hình ảnh SEO">
                      <img
                        v-if="imageUrl"
                        :src="imageUrl"
                        alt="Uploaded Image"
                        class="mt-2 w-full"
                      />
                      <UploadGroup @update:image="updateImage" />
                    </RadioGroup>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Dialog thêm chương -->
  <DialogArea
    :dialogVisible="dialogAddnewSection"
    title="Thêm chương mới"
    @close="dialogAddnewSection = false"
    :submitForm="handelFormSection"
  >
    <InputGroup
      label="Tên chương"
      inputId="nameSection"
      inputPlaceHoder="Nhập tên chương"
      v-model="formDataAddSection.name"
    />
  </DialogArea>
  <!-- End Dialog thêm chương -->
  <!-- Dialog Chỉnh sửa chương -->
  <DialogArea
    :dialogVisible="dialogEditSection"
    title="Chỉnh sửa chương"
    @close="dialogEditSection = false"
    :submitForm="() => handleEditSection(selectedSectionId)"
  >
    <InputGroup
      label="Chỉnh sửa tên chương"
      inputId="nameEditSection"
      inputPlaceHoder="Nhập tên chương"
      v-model="formDataEditSection.name"
    />
  </DialogArea>
  <!-- End Dialog Chỉnh sửa chương -->

  <!-- Dialog thêm bài học -->
  <DialogArea
    :dialogVisible="dialogAddnewLesson"
    title="Thêm bài học mới"
    @close="dialogAddnewLesson = false"
  >
    <InputGroup inputId="nameLesson" label="Tên bài học" inputPlaceHoder="Nhập tên bài học" />
    <CkeditorGroup label="Nội dung bài học" />
    <InputGroup inputId="duration" label="Thời lượng" inputPlaceHoder="Nhập thời lượng bài học" />
    <InputGroup
      inputId="videoLesson"
      label="Video bài học"
      inputPlaceHoder="Nhập đường dẫn video"
    />
  </DialogArea>
  <!-- Dialog thêm quiz -->
  <DialogArea
    :dialogVisible="dialogAddnewQuiz"
    title="Thêm quiz mới"
    @close="dialogAddnewQuiz = false"
  >
    <InputGroup inputId="nameQuiz" label="Tên quiz" inputPlaceHoder="Nhập tên quiz" />
    <InputGroup
      inputId="timeQuiz"
      label="Thời gian làm bài"
      inputPlaceHoder="Nhập thời gian làm bài"
    />
    <InputGroup inputId="numberQuestion" label="Số câu hỏi" inputPlaceHoder="Nhập số câu hỏi" />
  </DialogArea>
  <!-- End Dialog thêm quiz -->

  <DialogArea
    :dialogVisible="dialogSortSection"
    title="Sắp xếp các chương"
    @close="dialogSortSection = false"
    :submitForm="() => handleSortSection(section)"
  >
      <draggable 
      v-model="section" 
        @start="onDragStart"
        @end="onDragEnd"
      item-key="id">
      <template #item="{ element }">
        <div>
          <el-input
          style="max-width: 600px"
          class="cursor-move py-2"
          :placeholder="element.name"

          >
            <template #title>{{ element.name }}</template>
            <template #append>
              <ArrowsUpDownIcon class="w-5 cursor-move" />
            </template>
          </el-input>
        </div>
      </template>
    </draggable>
    <rawDisplayer class="col-3" :value="section" title="List" />
  </DialogArea>
  <!-- End Dialog Sắp xếp các chương -->
</template>
<script setup lang="ts">
import ButtonPrimary from '@/components/admin/Button/ButtonPrimary.vue'
import ButtonPrimarySm from '@/components/admin/Button/ButtonPrimarySm.vue'
import ButtonSecondary from '@/components/admin/Button/ButtonSecondary.vue'
import HeaderNavbar from '@/components/admin/Headernavbar/HeaderNavbar.vue'
import { useSidebarStore } from '@/store/sidebar'
import draggable from 'vuedraggable';


import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  BanknotesIcon,
  DocumentDuplicateIcon,
  InformationCircleIcon,
  LinkIcon,
  PencilIcon,
  PencilSquareIcon,
  PlusIcon,
  TagIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'
import InputGroup from '@/components/admin/Dialog/InputGroup.vue'
import DescriptionGroup from '@/components/admin/Dialog/DescriptionGroup.vue'
import CkeditorGroup from '@/components/admin/Dialog/CkeditorGroup.vue'
import SelectGroup from '@/components/admin/Dialog/SelectGroup.vue'
import RadioGroup from '@/components/admin/Dialog/RadioGroup.vue'
import UploadGroup from '@/components/admin/Dialog/UploadGroup.vue'
import InputItems from '@/components/admin/Dialog/InputItems.vue'
import { ArrowPathIcon, ArrowsUpDownIcon, MinusIcon } from '@heroicons/vue/24/solid'
import ButtonAddObject from '@/components/admin/Button/ButtonAddObject.vue'
import InputOptionGroup from '@/components/admin/Dialog/InputOptionGroup.vue'
import DropdownItems from '@/components/admin/Dialog/DropdownItems.vue'
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import DialogArea from '@/components/admin/Dialog/DialogArea.vue'
import useCourse from '@/composables/admin/useCourse'
// import useFetchCategories from '@/composables/admin/category/useCardCategory'
import { ElDropdownItem } from 'element-plus'
import type { Option, TListCategories, TSection } from '@/interfaces'
import SubmitButtonPrimary from '@/components/admin/Button/SubmitButtonPrimary.vue'
import ButtonSecondarySm from '@/components/admin/Button/ButtonSecondarySm.vue'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '@/store/category'

const {
  formDataEditCourse,
  fetchCourseData,
  courseLevels,
  fetchCourseLevels,
  fetchLanguages,
  languages,
  submitFormEdit,
  section,
  handlePreviewImg,
  formDataAddSection,
  handelFormSection,
  handleDeleteSection,
  handleEditSection,
  handleSortSection,
  formDataEditSection,
  fetchSectionId,
  dialogEditSection
} = useCourse()

const { categories, fetchCategoriesCRUD } = useCategoryStore()
console.log('đay là categories', categories)

const toggleActive = ref(false)

const ActiveToggle = (val: string[]) => {
  toggleActive.value = !toggleActive.value
}
//

const sidebarStore = useSidebarStore()
const tabPosition = ref<TabsInstance['tabPosition']>('left')
const radioValue = ref(1)
const paid = ref('1')
const linkVideo = ref<number| string>('1')
const checked2 = ref(false)

//dialog thêm chương
const dialogAddnewSection = ref<boolean>(false)
const addChapter = () => {
  dialogAddnewSection.value = true
}
//end dialog chương

const selectedSectionId = ref<number | string>('')
const EditChapter = (id: number | string) => {
  fetchSectionId(id) // Lấy dữ liệu chương theo id
  selectedSectionId.value = id // Lưu id vào selectedSectionId
  dialogEditSection.value = true // Mở dialog\
}

//end dialog chương

//dialog bài học
const dialogAddnewLesson = ref<boolean>(false)
const addLesson = () => {
  dialogAddnewLesson.value = true
}
//end dialog bài học

//dialog quiz
const dialogAddnewQuiz = ref<boolean>(false)
const addQuiz = () => {
  dialogAddnewQuiz.value = true
}
//end dialog quiz

//dialog sắp xếp chương
const dialogSortSection = ref<boolean>(false)
const sortSection = () => {
  dialogSortSection.value = true
}
//end dialog Sort

// upload img
const imageUrl = ref<string>('') // Lưu URL hình ảnh

const updateImage = (url: string) => {
  imageUrl.value = url // Cập nhật URL hình ảnh khi nhận từ UploadGroup
}

// Hàm để xử lý khi bắt đầu kéo
const onDragStart = (event:any) => {
  console.log('Started dragging:', event);
  console.log('Item being dragged:', event.item); // Thông tin về item đang được kéo
};

// Hàm để xử lý khi kết thúc kéo
const onDragEnd = (event:any) => {
  console.log('Drag ended:', event.newIndex);
};

defineProps({
  inputId: {
    type: [String, Number],
    required: true
  }
})

onMounted(() => {
  fetchCategoriesCRUD()
  fetchCourseLevels()
  fetchLanguages()
})
</script>
