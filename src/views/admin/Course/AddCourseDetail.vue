<script setup lang="ts">
import ButtonPrimary from '@/components/admin/Button/ButtonPrimary.vue';
import ButtonPrimarySm from '@/components/admin/Button/ButtonPrimarySm.vue';
import ButtonSecondary from '@/components/admin/Button/ButtonSecondary.vue';
import HeaderNavbar from '@/components/admin/Headernavbar/HeaderNavbar.vue';
import { useSidebarStore } from '@/store/sidebar';
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon, BanknotesIcon, DocumentDuplicateIcon, InformationCircleIcon, LinkIcon, PencilSquareIcon, PlusIcon, TagIcon } from '@heroicons/vue/24/outline';
import InputGroup from '@/components/admin/Dialog/InputGroup.vue';
import DescriptionGroup from '@/components/admin/Dialog/DescriptionGroup.vue';
import CkeditorGroup from '@/components/admin/Dialog/CkeditorGroup.vue';
import SelectGroup from '@/components/admin/Dialog/SelectGroup.vue';
import RadioGroup from '@/components/admin/Dialog/RadioGroup.vue';
import UploadGroup from '@/components/admin/Dialog/UploadGroup.vue';
import InputItems from '@/components/admin/Dialog/InputItems.vue';
import { ArrowsUpDownIcon, MinusIcon } from '@heroicons/vue/20/solid';
import ButtonAddObject from '@/components/admin/Button/ButtonAddObject.vue';
import InputOptionGroup from '@/components/admin/Dialog/InputOptionGroup.vue';
import DropdownItems from '@/components/admin/Dialog/DropdownItems.vue';
import { ref } from 'vue'

import DialogArea from '@/components/admin/Dialog/DialogArea.vue';
import { ElDropdownItem } from 'element-plus';


const sidebarStore = useSidebarStore()
const tabPosition = ref<TabsInstance['tabPosition']>('left')
const radioValue = ref(1)
const paid = ref('1')
const linkVideo = ref('1')

//dialog thêm chương
const dialogAddnewSection = ref<boolean>(false); 
const addChapter = () => {
  dialogAddnewSection.value = true;
};
//end dialog chương

//dialog bài học
const dialogAddnewLesson = ref<boolean>(false); 
const addLesson = () => {
  dialogAddnewLesson.value = true;
};
//end dialog bài học

//dialog quiz
const dialogAddnewQuiz = ref<boolean>(false); 
const addQuiz = () => {
  dialogAddnewQuiz.value = true;
};
//end dialog quiz

//dialog sắp xếp chương
const dialogSortSection = ref<boolean>(false); 
const sortSection = () => {
  dialogSortSection.value = true;
};
//end dialog Sort

// upload img
const imageUrl = ref<string>(''); // Lưu URL hình ảnh

const updateImage = (url: string) => {
  imageUrl.value = url; // Cập nhật URL hình ảnh khi nhận từ UploadGroup
};
// end upload img


const radioOptions = [
  { value: 1, label: 'Kích hoạt' },
  { value: 2, label: 'Riêng tư' },
  { value: 3, label: 'Sắp tới' },
  { value: 4, label: 'Đang xử lý' },
  { value: 5, label: 'Lưu bản nháp' },
];
const optionsLang = [
  {
    value: 1,
    label: 'Tiếng Việt',
  },
  {
    value: 2,
    label: 'English',
  },
  {
    value: 3,
    label: '简体中文',
  },
]
const optionsLevel = [
  {
    value: 1,
    label: 'Dễ',
  },
  {
    value: 2,
    label: 'Trung bình',
  },
  {
    value: 3,
    label: 'Nâng cao',
  },
]
const optionsData = [
  {
    value: 'Option1',
    label: 'Đây là danh mục 1',
  },
  {
    value: 'Option2',
    label: 'Đây là danh mục 2',
  },
  {
    value: 'Option3',
    label: 'Đây là danh mục 3',
  },
  {
    value: 'Option4',
    label: 'Đây là danh mục 4',
  },
  {
    value: 'Option5',
    label: 'Đây là danh mục 5',
  },
]
</script>
<template>
  <div>
    <div class="p-4">
      <HeaderNavbar
      namePage="Thêm khoá học chi tiết"
      >
      <ButtonSecondary
      :icon="ArrowLeftIcon"
      link="#"
      title="Trước"
      />
      <ButtonSecondary
      :icon="ArrowTopRightOnSquareIcon"
      link="#"
      title="Hỗ trợ"
      />
      </HeaderNavbar>
    </div>
    <div class="p-4 py-2">
      <div class="background-table ">
        <div class="p-3">
          <div class="flex justify-between gap-2 lg:flex-row flex-col">
            <div class="flex gap-5">
              <ButtonSecondary
                :icon="ArrowTopRightOnSquareIcon"
                link="#"
                title="Xem trước giao diện"
                customStyle="!flex-row-reverse"
                />
                <ButtonSecondary
                :icon="ArrowTopRightOnSquareIcon"
                link="#"
                title="Trình phát khoá học"
                customStyle="!flex-row-reverse"
                />
            </div>
            <div class="flex">
              <ButtonPrimary
                link="#"
                title="Lưu thay đổi"
                />
            </div>
          </div>

          <div class="pt-4 pb-8">
            <el-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs gap-3 !h-auto md:flex-row-reverse flex-col-reverse ">
              <el-tab-pane>
                <template #label>
                  <span class="tab-items-style">
                    <PencilSquareIcon class="w-5 font-bold "/>
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
                  </div>
                  
                  <!-- <div class="flex flex-row mt-6">
                    <div class="mt-4 basis-8/12">
                      <ButtonAddObject
                      title="Thêm chương mới"
                      />
                    </div>
                  </div> -->
                  <!-- Dropdown items -->
                  <DropdownItems
                  class="mt-6"
                  />
                </div>  
              </el-tab-pane>

              <el-tab-pane>
                <template #label>
                  <span class="tab-items-style">
                    <DocumentDuplicateIcon class="w-5 font-bold "/>
                    <span>Nền tảng</span>
                  </span>
                </template>  
                <div class="px-2">
                  <InputGroup
                    label="Tiêu đề"
                    required="*"
                    inputId="name"
                    inputPlaceHoder="Nhập tiêu đề khoá học"
                    customsClass="flex flex-row items-center"
                    customsClassChild="basis-2/12"
                    customsClassChild2="basis-10/12 w-full"
                  />
                  <DescriptionGroup
                    label="Mô tả ngắn"
                    inputId="description"
                    inputPlaceHoder="Nhập mô tả..."
                    customsClass="flex flex-row items-center"
                    customsClassChild="basis-2/12"
                    customsClassChild2="basis-10/12 w-full"
                    />
                  <CkeditorGroup
                    label="Nội dung"
                    customsClass="flex flex-row items-center"
                    customsClassChild="basis-2/12"
                    customsClassChild2="basis-10/12 w-full"
                  />
                  <SelectGroup
                    inputPlaceHoder="Chọn danh mục cho khoá học"
                    required="*"
                    label="Danh mục"
                    customsClass="flex flex-row items-center"
                    customsClassChild="basis-2/12"
                    customsClassChild2="basis-10/12 w-full"
                    :optionsData="optionsData"
                    />
                    <SelectGroup
                    inputPlaceHoder="Chọn cấp độ cho khoá học"
                    required="*"
                    label="Cấp độ"
                    customsClass="flex flex-row items-center"
                    customsClassChild="basis-2/12"
                    customsClassChild2="basis-10/12 w-full"
                    :optionsData="optionsLevel"
                    />
                    <SelectGroup
                    inputPlaceHoder="Chọn ngôn ngữ cho khoá học"
                    required="*"
                    label="Ngôn ngữ"
                    customsClass="flex flex-row items-center"
                    customsClassChild="basis-2/12"
                    customsClassChild2="basis-10/12 w-full"
                    :optionsData="optionsLang"
                    />
                    <RadioGroup
                    label="Chọn"
                    required="*"
                    customsClass="flex flex-row items-center"
                    customsClassChild="basis-2/12"
                    customsClassChild2="basis-10/12 w-full"
                    >
                    <div class="mb-2 ml-4">
                      <el-radio-group class="grid" v-model="radioValue">
                        <el-radio v-for="option in radioOptions" :key="option.value" :value="option.value">
                          {{ option.label }}
                        </el-radio>
                      </el-radio-group>
                    </div>
                  </RadioGroup>
                </div>
              </el-tab-pane>

              <el-tab-pane>
                <template #label>
                  <span class="tab-items-style">
                    <BanknotesIcon class="w-5 font-bold "/>
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
                  customsClass="flex flex-row items-center"
                  customsClassChild="basis-2/12"
                  customsClassChild2="basis-10/12 w-full"
                  />
                  <div class="mt-1 flex justify-end">
                    <el-checkbox class="basis-10/12" v-model="checked2" label="Click nếu khoá học này có sử dụng mã giảm giá" size="large" />
                  </div>
                  <InputGroup
                  label="Giá khoá học đã giảm (đơn vị vnđ)"
                  required="*"
                  inputPlaceHoder="Nhập giá của khoá học đã giảm"
                  customsClass="flex flex-row items-center"
                  customsClassChild="basis-2/12"
                  customsClassChild2="basis-10/12 w-full"
                  />
                </template>
                </div>
              </el-tab-pane>

              <el-tab-pane>
                <template #label>
                  <span class="tab-items-style">
                    <InformationCircleIcon class="w-5 font-bold "/>
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
                  >
                    <div class="">
                      <InputItems
                      :icon="PlusIcon"
                      inputPlaceHoder="Câu hỏi"
                      />
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
                      <InputItems
                      :icon="PlusIcon"
                      inputPlaceHoder="Nhập yêu cầu"
                      />
                      <InputItems
                      :icon="MinusIcon"
                      inputPlaceHoder="Nhập yêu cầu"
                      class="mt-2"
                      />
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
                      <InputItems
                      :icon="PlusIcon"
                      inputPlaceHoder="Nhập kết quả"
                      />
                      <InputItems
                      :icon="MinusIcon"
                      inputPlaceHoder="Nhập kết quả"
                      class="my-2"
                      />
                    </div>
                  </RadioGroup>
                  
                </div>
              </el-tab-pane>

              <el-tab-pane>
                <template #label>
                  <span class="tab-items-style">
                    <LinkIcon class="w-5 font-bold "/>
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
                        <el-radio value ="1">Đường dẫn video</el-radio>
                        <el-radio value ="0">Tải lên file video</el-radio>
                    </el-radio-group>
                  </RadioGroup>
                  <UploadGroup
                  label="Video file"
                  required="*"
                  customsClass="flex flex-row items-center"
                  customsClassChild="basis-2/12"
                  customsClassChild2="basis-10/12 w-full"
                  :class="{'hidden': linkVideo ==1}"
                  />
                  <InputGroup
                  label="Video link"
                  required="*"
                  inputPlaceHoder="Nhập đường dẫn video"
                  customsClass="flex flex-row items-center"
                  customsClassChild="basis-2/12"
                  customsClassChild2="basis-10/12 w-full"
                  :class="{'hidden': linkVideo ==0}"
                  />
                </div>
                  
              </el-tab-pane>

              <el-tab-pane>
                <template #label>
                  <span class="tab-items-style">
                    <TagIcon class="w-5 font-bold "/>
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
                    inputPlaceHoder="Khóa học tốt nhất để học những kiến ​​thức cơ bản về HTML5 và CSS3 từ đầu. Bao gồm 5 dự án, hoàn hảo cho người mới bắt đầu."
                  />
                  <RadioGroup
                    label="Hình ảnh SEO"
                    >
                    <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" class="mt-2 w-full" />
                    <UploadGroup
                    @update:image="updateImage"
                    />
                  </RadioGroup>

                </div>
              </el-tab-pane>

            </el-tabs>
          </div>
            
        </div>
      </div>
    </div>
  </div>
  <!-- Dialog thêm chương -->
  <DialogArea
    :dialogVisible="dialogAddnewSection"
    title="Thêm chương mới"
    @close="dialogAddnewSection = false"
    >
    <InputGroup
    label="Tên chương"
    inputPlaceHoder="Nhập tên chương"
    />
  </DialogArea>
  <!-- End Dialog thêm chương -->

  <!-- Dialog thêm bài học -->
  <DialogArea
    :dialogVisible="dialogAddnewLesson"
    title="Thêm bài học mới"
    @close="dialogAddnewLesson = false"
    >
    <InputGroup
    label="Tên bài học"
    inputPlaceHoder="Nhập tên bài học"
    />
    <CkeditorGroup
    label="Nội dung bài học"
    />
    <InputGroup
    label="Thời lượng"
    inputPlaceHoder="Nhập thời lượng bài học"
    />
    <InputGroup
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
    <InputGroup
    label="Tên quiz"
    inputPlaceHoder="Nhập tên quiz"
    />
    <InputGroup
    label="Thời gian làm bài"
    inputPlaceHoder="Nhập thời gian làm bài"
    />
    <InputGroup
    label="Số câu hỏi"
    inputPlaceHoder="Nhập số câu hỏi"
    />

  </DialogArea>
  <!-- End Dialog thêm quiz -->
   
  <!-- Dialog Sắp xếp các chương -->
  <DialogArea
    :dialogVisible="dialogSortSection"
    title="Sắp xếp các chương"
    @close="dialogSortSection = false"
    >
    <el-input
      style="max-width: 600px"

      class="cursor-move py-4"
      placeholder="Chương 1"
    >
      <template #title>Chương 1 nè</template>
      <template #append>
        <ArrowsUpDownIcon class="w-5 cursor-move"/>
      </template>
    </el-input>
  </DialogArea>
  <!-- End Dialog Sắp xếp các chương -->

</template>

