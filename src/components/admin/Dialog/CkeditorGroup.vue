<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import type { CkeditorGroupProps } from '@/interfaces/admin.interface';


const props = defineProps<CkeditorGroupProps>();
const emit = defineEmits(['update:modelValue']);

const editor = ClassicEditor;
const editorInstance = ref<any>(null);

// Initial value for editor
const editorData = ref(props.modelValue || '');

// Config CKEditor
const editorConfig = {
  toolbar: [
    'undo', 'redo', '|',
    'heading', '|',
    'bold', 'italic', 'link', '|',
    'imageUpload', 'bulletedList', 'numberedList', 'blockQuote'
  ]
};

// Hàm xử lý khi nội dung CKEditor thay đổi
const onInput = () => {
  if (editorInstance.value) {
    const data = editorInstance.value.getData(); // Lấy dữ liệu hiện tại của CKEditor
    emit('update:modelValue', data); // Phát sự kiện để gửi giá trị lên component cha
  }
};

// Hàm để lấy instance khi CKEditor đã sẵn sàng
const onReady = (instance: any) => {
  editorInstance.value = instance;
};

</script>

<template>
  <div class="mt-3" :class="customsClass">
    <label :for="inputId" class="label-input" :class="customsClassChild">
      {{ label }}
    </label>
    <ckeditor
      :editor="editor"
      :modelValue="modelValue"
      @input="onInput"
      class="w-full !h-[400px]"
      :config="editorConfig"
      rows="4"
      :class="customsClassChild2"
      @ready="onReady"
    />
    
  </div>
</template>

<style>
.ck-editor__editable {
  min-height: 150px;
  width: 100%;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 0rem 0rem 0.375rem 0.375rem !important;
}

.ck-toolbar {
  background-color: #7c7b7b;
  border-bottom: 1px solid #ccc;
}

.ck-editor {
  flex-basis: 83.333333%;
}
</style>
