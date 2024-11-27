<script setup lang="ts">
import SubmitButtonPrimary from '@/components/admin/Button/SubmitButtonPrimary.vue';
import RadioGroup from '@/components/admin/Dialog/RadioGroup.vue';
import HeaderNavbar from '@/components/admin/Headernavbar/HeaderNavbar.vue';


</script>
<template>
  <div>
    <div class="p-4">
      <HeaderNavbar  namePage="Cài đặt thanh toán" >
      </HeaderNavbar>
    <div class="py-4">
        <div class="background-table">
          <div class="py-4 px-2">
            <span class="p-2 font-bold">Cài đặt phần trăm danh thu</span>
            <div class="p-2">
              <RadioGroup
              label="Phần trăm danh thu của giáo viên"
              >
                <el-input
                  style="max-width: 600px"
                  class="cursor-move py-4"
                >
                  <template #title>Chương 1 nè</template>
                  <template #append>
                    %
                  </template>
                </el-input>
              </RadioGroup>
              <RadioGroup
              label="Phần trăm danh thu của admin"
              >
                <el-input
                  style="max-width: 600px"
                  class="cursor-move py-4"
                >
                  <template #title>Chương 1 nè</template>
                  <template #append>
                    %
                  </template>
                </el-input>
              </RadioGroup>
              <div class="flex">
                <SubmitButtonPrimary
                title="Cập nhật"
                />
              </div>
            </div>
          </div>
        </div>

    </div>

    </div>
  </div>
</template>

