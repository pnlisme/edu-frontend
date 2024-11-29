<script setup lang="ts">
import { ref } from 'vue';
import ButtonSecondarySm from '@/components/admin/Button/ButtonSecondarySm.vue';
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

const toggleActive = ref(false);

const ActiveToggle = (val: string[]) => {
  toggleActive.value = !toggleActive.value; 
  console.log(val);
};

</script>
<template>
  <el-collapse v-model="toggleActive" @change="ActiveToggle">
      <el-collapse-item name="1" 
      class="group style-input hover:opacity-100 "
    >
        <template
        #title>
          1. Bài học thứ 1
          <div 
          class="gap-2 el-collapse-item__btn flex transition-opacity duration-200 group-hover:opacity-100 opacity-0 "
          :class="{'opacity-100': toggleActive, 'opacity-0': !toggleActive}"
          >
            <ButtonSecondarySm 
            title="Sắp xếp bài học"
            />
            <ButtonSecondarySm 
            :icon="PencilIcon"
            />
            <ButtonSecondarySm 
            :icon="TrashIcon"
            />
          </div>
        </template>
        <div class="py-2 border-b-2 last:border-none">
          Không có bài học nào
        </div>
        <slot></slot>
      </el-collapse-item>
    </el-collapse>
</template>

<style scoped>
.custom-dropdown {
  width: 200px; /* Chiều rộng của dropdown */
}
.el-dropdown-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;
}
.el-dropdown__icon {
  margin-left: 5px;
}
</style>