<script setup lang="ts">
import ButtonPrimary from '@/components/admin/Button/ButtonPrimary.vue';
import ButtonSecondary from '@/components/admin/Button/ButtonSecondary.vue';
import InputSearch from '@/components/admin/Button/InputSearch.vue';
import DialogArea from '@/components/admin/Dialog/DialogArea.vue';
import InputGroup from '@/components/admin/Dialog/InputGroup.vue';
import RadioGroup from '@/components/admin/Dialog/RadioGroup.vue';
import SelectGroup from '@/components/admin/Dialog/SelectGroup.vue';
import HeaderNavbar from '@/components/admin/Headernavbar/HeaderNavbar.vue';
import { useSidebarStore } from '@/store/sidebar';
import { ArrowUpOnSquareIcon, FunnelIcon } from '@heroicons/vue/24/outline';
import { DocumentPlusIcon, EllipsisVerticalIcon, TicketIcon } from '@heroicons/vue/24/solid';
import { fa } from 'element-plus/es/locale/index.mjs';
import { ref } from 'vue';
// Dialog
const visiableCoupon = ref<boolean>(false)
const AddNewCoupon = () => {
  visiableCoupon.value = true
}
// End Dialog

const sidebarStore = useSidebarStore()

const deactivate = () => {
  console.log('Deactivate clicked');
};
const edit = () => {
  console.log('Edit clicked');
};
const deleteCoupon = () => {
  console.log('Delete clicked');
};



const studentData = ref([
  {
    id: 1,
    name: "Amber Domore",
    email: "student5@example.com",
    phone: "0346 348 834",
    courseCount: 44,
  },
  {
    id: 2,
    name: "Amber Domore",
    email: "student5@example.com",
    phone: null, // Nếu không có số điện thoại, có thể để null
    courseCount: 3,
  },
  {
    id: 3,
    name: "Amber Domore",
    email: "student5@example.com",
    phone: null,
    courseCount: 3,
  },
  {
    id: 4,
    name: "Amber Domore",
    email: "student5@example.com",
    phone: null,
    courseCount: 3,
  },
]);


</script>
<template>
  <div class="p-4">
    <HeaderNavbar namePage="Danh sách giáo viên">
    </HeaderNavbar>
  </div>
  <div class="px-4 py-2">
    <div class="background-table">
      <div class="lg:flex justify-between pb-2">
        <div class="p-3 flex gap-2">
          <ButtonSecondary 
          :icon="ArrowUpOnSquareIcon" 
          link="#" 
          title="Xuất" 
          customStyle="flex-row-reverse"           
          />
        </div>
        <div class="p-3 flex gap-2">
          <InputSearch 
          title="Tìm kiếm" 
          inputPlaceHoder="Nhập để tìm kiếm..." 
          />
        </div>
      </div>
      <div class="py-3">
        <div class="overflow-x-auto flex">
          <el-table class="!dark:el-table w-full overflow-x-auto" ref="tableRef" row-key="id" :data="studentData">
              <el-table-column label="#" width="50">
                <template v-slot="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="Tên" />
              <el-table-column prop="phone" label="Điện thoại" />
              <el-table-column prop="courseCount" label="Số lượng khóa học" />
              <el-table-column label="Tùy chọn">
                <template #default="scope">
                  <el-dropdown trigger="click" placement="bottom-start">
                    <EllipsisVerticalIcon class="el-dropdown-link cursor-pointer w-5" />
                    <template #dropdown>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click="viewCourse(scope.row.id)">Xem khóa học</el-dropdown-item>
                        <el-dropdown-item @click="edit(scope.row.id)">Chỉnh sửa</el-dropdown-item>
                        <el-dropdown-item @click="deleteCoupon(scope.row.id)">Xóa</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
        </div>
      </div>
    </div>
    <div class="demo-pagination-block mt-5 ">
      <el-pagination class="flex justify-between" v-model:current-page="currentPage3" v-model:page-size="pageSize3"
        :size="size" :disabled="disabled" :background="background" layout="prev, pager, next, jumper" :total="1000"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
  <DialogArea 
  title="Thêm mã giảm" 
  :dialogVisible="visiableCoupon">
    <div class="p-4">
        <InputGroup label="Mã giảm" required="*" inputPlaceHoder="Nhập mã giảm" />
        <InputGroup label="Phần trăm giảm" required="*" inputPlaceHoder="Nhập phần trăm giảm" />
        <RadioGroup 
          label="Ngày hết hạn" 
          required="*" 
          inputPlaceHoder="Nhập ngày hết hạn" >
          <input type="date" name="" class="input-style pr-3" id="">
        </RadioGroup>
        <SelectGroup
          label="Chọn trạng thái" 
          required="*" 
          inputPlaceHoder="Nhập trạng thái" 
          :optionsData="[
            { value: 'Kích hoạt', label: 'Kích hoạt' },
            { value: 'Không kích hoạt', label: 'Không kích hoạt' }
          ]"
        />
    </div>
  </DialogArea>
</template>

