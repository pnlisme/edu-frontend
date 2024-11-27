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



const couponData = [
  {
    id: 1,
    code: "VWGNQETFP2",
    discount: "18%",
    expiry: "07-Apr-2024",
    status: "Active"
  },
  {
    id: 2,
    code: "AKGMRMFRU3",
    discount: "52%",
    expiry: "10-May-2024",
    status: "Active"
  },
  {
    id: 3,
    code: "XTLZROOQQD",
    discount: "96%",
    expiry: "07-Aug-2024",
    status: "Active"
  },
  {
    id: 4,
    code: "GOX6BZYZ0P",
    discount: "20%",
    expiry: "16-Jul-2024",
    status: "Active"
  },
  {
    id: 5,
    code: "L4E1EVDKDP",
    discount: "74%",
    expiry: "10-Sep-2024",
    status: "Active"
  },
  {
    id: 6,
    code: "HHJUINCTTX",
    discount: "99%",
    expiry: "15-Oct-2024",
    status: "Inactive"
  },
  {
    id: 7,
    code: "SDFTHSRDFASD",
    discount: "12%",
    expiry: "27-Apr-2024",
    status: "Active"
  }
];

</script>
<template>
  <div class="p-4">
    <HeaderNavbar namePage="Phiếu giảm giá">
      <ButtonPrimary 
      :icon="TicketIcon" 
      link="#" 
      title="Thêm mã giảm"
          @click="AddNewCoupon" 
      
      />
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
          @click="AddNewCoupon" 
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
            <el-table class="!dark:el-table w-full overflow-x-auto" ref="tableRef" row-key="date" :data="couponData">
              <el-table-column label="Stt" width="50">
                <template v-slot="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="code" label="Mã giảm" />
              <el-table-column prop="discount" label="Phần trăm giảm" />
              <el-table-column prop="expiry" label="Ngày hết hạn" sortable column-key="date" :filters="[
                  { text: '2016-05-01', value: '2016-05-01' },
                  { text: '2016-05-02', value: '2016-05-02' },
                  { text: '2016-05-03', value: '2016-05-03' },
                  { text: '2016-05-04', value: '2016-05-04' },
                ]" :filter-method="filterHandler" />
              <el-table-column prop="status" label="Trạng thái" :filters="[
                  { text: 'Active', value: 'Active' },
                  { text: 'Inactive', value: 'Inactive' },
                ]" :filter-method="filterTag" filter-placement="bottom-end">
                <template #default="scope">
                  <el-tag :type="scope.row.status === 'Active' ? 'success' : 'danger'" disable-transitions>{{
                    scope.row.status }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="Option" >
                <template #default="scope">
                  <el-dropdown trigger="click" placement="bottom-start">
                    <!-- <el-button>  -->
                    <EllipsisVerticalIcon class="el-dropdown-link cursor-pointer w-5" />
                    <!-- </el-button> -->
                    <template #dropdown>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click="deactivate">Deactivate</el-dropdown-item>
                        <el-dropdown-item @click="edit">Edit</el-dropdown-item>
                        <el-dropdown-item @click="deleteCoupon">Delete</el-dropdown-item>
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

