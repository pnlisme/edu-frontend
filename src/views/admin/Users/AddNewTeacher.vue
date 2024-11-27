<script setup lang="ts">
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
import SubmitButtonPrimary from '@/components/admin/Button/SubmitButtonPrimary.vue';
import { KeyIcon } from '@heroicons/vue/24/outline';


const sidebarStore = useSidebarStore()
const tabPosition = ref<TabsInstance['tabPosition']>('left')
const radioValue = ref(1)
const paid = ref('1')
const linkVideo = ref('1')

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
          <div class="font-bold size-lg ">
            Thông tin giáo viên
          </div>

          <div class="pt-4 pb-8">
            <el-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs gap-3 !h-auto md:flex-row-reverse flex-col-reverse ">
              <el-tab-pane>
                <template #label>
                  <span class="tab-items-style">
                    <DocumentDuplicateIcon class="w-5 font-bold "/>
                    <span>Thông tin</span>
                  </span>
                </template>  
                <div class="px-2">
                  <InputGroup
                    label="Tên "
                    required="*"
                    inputId="name"
                    inputPlaceHoder="Nhập tiêu đề khoá học"
                    customsClass="flex flex-row items-center"
                    customsClassChild="basis-2/12"
                    customsClassChild2="basis-10/12 w-full"
                  />
                  <DescriptionGroup
                    label="Tiểu sử"
                    inputId="description"
                    inputPlaceHoder="Nhập tiểu sử..."
                    customsClass="flex flex-row items-center"
                    customsClassChild="basis-2/12"
                    customsClassChild2="basis-10/12 w-full"
                    />
                    <InputGroup
                    label="Số điện thoại"
                    inputId="phone"
                    customsClass="flex flex-row items-center"
                    customsClassChild="basis-2/12"
                    customsClassChild2="basis-10/12 w-full"
                  />
                    <InputGroup
                    label="Địa chỉ"
                    inputId="phone"
                    customsClass="flex flex-row items-center"
                    customsClassChild="basis-2/12"
                    customsClassChild2="basis-10/12 w-full"
                  />
                  <UploadGroup
                  label="Hình ảnh cá nhân"
                  inputPlaceHoder="Nhập giá của khoá học đã giảm"
                  customsClass="flex flex-row items-center"
                  customsClassChild="basis-2/12"
                  customsClassChild2="basis-10/12 w-full"
                  />
                  <div class="flex pt-5 pb-2">
                    <SubmitButtonPrimary
                    title="Tạo thông tin"
                    />
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane>
                <template #label>
                  <span class="tab-items-style">
                    <BanknotesIcon class="w-5 font-bold "/>
                    <span>Thanh Toán</span>
                  </span>
                </template>  
                <div class="px-2">
                  <div class="font-bold">
                    Striper
                  </div>
                  <InputGroup
                  label="Key công khai"
                  required="*"
                  customsClass="flex flex-row items-center"
                  customsClassChild="basis-2/12"
                  customsClassChild2="basis-10/12 w-full"
                  />
    
                  <InputGroup
                  label="Key không công khai"
                  required="*"
                  customsClass="flex flex-row items-center"
                  customsClassChild="basis-2/12"
                  customsClassChild2="basis-10/12 w-full"
                  />
                  <div class="flex pt-5 pb-2">
                    <SubmitButtonPrimary
                    title="Tạo thông tin"
                    />
                  </div>
                </div>
              </el-tab-pane>

              <el-tab-pane>
                <template #label>
                  <span class="tab-items-style">
                    <KeyIcon class="w-5 font-bold "/>
                    <span>Đăng nhập</span>
                  </span>
                </template>  
                <div class="px-2">
                  <InputGroup
                  label="Email"
                  required="*"
                  customsClass="flex flex-row items-center"
                  customsClassChild="basis-2/12"
                  customsClassChild2="basis-10/12 w-full"
                  />
    
                  <InputGroup
                  label="Mật khẩu"
                  required="*"
                  customsClass="flex flex-row items-center"
                  customsClassChild="basis-2/12"
                  customsClassChild2="basis-10/12 w-full"
                  />
                  <div class="flex pt-5 pb-2">
                    <SubmitButtonPrimary
                    title="Tạo thông tin"
                    />
                  </div>
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
                  <InputGroup
                  label="Facebook"
                  customsClass="flex flex-row items-center"
                  customsClassChild="basis-2/12"
                  customsClassChild2="basis-10/12 w-full"
                  />
    
                  <InputGroup
                  label="Twitter"
                  customsClass="flex flex-row items-center"
                  customsClassChild="basis-2/12"
                  customsClassChild2="basis-10/12 w-full"
                  />
                  <InputGroup
                  label="Linkedin"
                  customsClass="flex flex-row items-center"
                  customsClassChild="basis-2/12"
                  customsClassChild2="basis-10/12 w-full"
                  />
                  <div class="flex pt-5 pb-2">
                    <SubmitButtonPrimary
                    title="Tạo thông tin"
                    />
                  </div>
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

