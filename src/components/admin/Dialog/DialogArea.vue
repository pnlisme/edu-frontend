
<script setup lang="ts">
import ButtonSecondary from '@/components/admin/Button/ButtonSecondary.vue';
import SubmitButtonPrimary from '@/components/admin/Button/SubmitButtonPrimary.vue';
import { ref, defineProps, toRefs } from 'vue';
import { ElDialog } from 'element-plus'

const props = defineProps<{
  dialogVisible: boolean;
  title: string;
  submitForm: (data: object) => Promise<void>;
}>();
</script>
<template>
  <el-dialog 
  v-model="props.dialogVisible"  
  width="500"
  >
    <template #title >
      <span class="custom-dialog-title text-lg font-bold">{{ props.title }}</span>
    </template>
    <form @submit.prevent="submitForm">
      <div class="border-t-2 border-primary-sidebar dark:border-bg-primary">
        <slot>
        </slot>
      </div>
        <div class="flex mt-5">
          <SubmitButtonPrimary
          title="Xác nhận"
          />
        </div>
    </form>
    <!-- <template #footer>
      <div class="dialog-footer pt-5 border-t-2 border-primary-sidebar dark:border-bg-primary flex justify-end">
        <ButtonSecondary
          link="#"
          title="Đóng"
        />
      </div>
    </template> -->
  </el-dialog>

</template>

