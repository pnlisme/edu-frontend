import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia' // Hàm tạo store trong pinia
import { computed, ref } from 'vue'
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import * as brandsIcons from '@fortawesome/free-brands-svg-icons';

type IconEntry = {
  icon: any; 
  title: string;
};


export const useIconPickerStore = defineStore('IconPicker', () => {
  const showDropdown = ref(false)
  const search = ref('');
  const selectedIcon = ref('');
  const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value
  }


  const icons = ref<IconEntry[]>([
    ...Object.entries(solidIcons).map(([key, icon]) => ({ icon, title: key })),
    ...Object.entries(regularIcons).map(([key, icon]) => ({ icon, title: key })),
    ...Object.entries(brandsIcons).map(([key, icon]) => ({ icon, title: key })),
  ]);
  
  const filteredIcons = computed<IconEntry[]>(() => {
    return icons.value.filter(icon => icon.title.toLowerCase().includes(search.value.toLowerCase()))
  });
  
  const selectIcon = (icon: string) => {
    selectedIcon.value = icon; 
    showDropdown.value = false;
  };

  return {showDropdown, toggleDropdown, filteredIcons, selectIcon, search, selectedIcon, icons}
})