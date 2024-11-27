<script lang="ts" setup>
import { ElDialog } from 'element-plus'

const props = defineProps<{
  dialogVisible: boolean;
  title: string;
}>();
</script>

<template>
  <el-dialog 
  v-model="props.dialogVisible" 
  :show-close="true" 
  width="500"
  @close="$emit('close')"
  >
    <template #header >
      <div class="my-header">
        <h4>{{ props.title }}</h4>
      </div>
    </template>
    <slot></slot>
  </el-dialog>
</template>



<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}
</style>



