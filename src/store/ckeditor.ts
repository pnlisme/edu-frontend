import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const useCkeditorStore = defineStore('ckeditor', () => {
  const editor = ClassicEditor;
  const editorData = ref('');

  const onChange = (event: any) => {
    editorData.value = event.editor.getData();
    console.log('Content changed:', editorData.value);
  };

  return {
    editor,
    editorData,
    onChange,
  };
});
