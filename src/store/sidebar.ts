import { defineStore } from 'pinia' // Hàm tạo store trong pinia
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'


// =========ADMIN ZONE======== //

// Định nghĩa một store có tên là 'sidebar'.
export const useSidebarStore = defineStore('sidebar', () => {
  const isSidebarOpen = ref(false);
  const selected = useStorage('selected', ref('eCommerce'));
  const page = useStorage('page', ref('dashboard'))

  //Hàm sử lý bật tắt SidebarItem 
  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
  }



  return {isSidebarOpen, toggleSidebar, selected, page};
})

// =========END ADMIN ZONE======== //
// width: 200px;
// left: 75px;
// top: -22px;
// border-radius: 8px;