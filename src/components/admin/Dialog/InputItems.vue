<script setup lang="ts">
import type { InputItemsProps } from '@/interfaces/admin.interface';
import { defineProps } from 'vue';
import ButtonSecondary from '../Button/ButtonSecondary.vue';
const props = defineProps<InputItemsProps>();
</script>
<template>
  
<div>
  <div class="flex flex-row gap-2">
    <input 
      type="text" 
      :name="inputId" 
      :id="inputId"
      :placeholder="inputPlaceHoder"
      :v-model="modelValue"
      class="input-style basis-11/12" 
    />
    <ButtonSecondary
      :icon="icon"
      :link="link"
      customStyle="basis-1/12 justify-center gap-0 px-1.5"
    />
  </div>
</div>
  
</template>

