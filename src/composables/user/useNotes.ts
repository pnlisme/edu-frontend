import { ref, onMounted } from 'vue'
import { useNotesStore } from '@/store/note'
import type { Note } from '@/interfaces/note.interface'

export function useNotes(course_id: number) {
  const notesStore = useNotesStore()
  const noteForm = ref<Note>({
    course_id: course_id,
    section_id: 0,
    lecture_id: 0,
    current_time: 0,
    lecture_title: '',
    content: ''
  })

  onMounted(async () => {
    await notesStore.fetchNotes(course_id) // Lấy danh sách notes khi mount
  })

  const handleCreateNote = async () => {
    await notesStore.createNote(noteForm.value)
  }

  const handleUpdateNote = async (id: number) => {
    await notesStore.updateNote(id, noteForm.value)
  }

  const handleDeleteNote = async (id: number) => {
    await notesStore.deleteNote(id, noteForm.value.course_id)
  }

  const loadNoteDetail = async (id: number) => {
    await notesStore.fetchNoteDetail(id)
  }

  return {
    notesStore,
    noteForm,
    handleCreateNote,
    handleUpdateNote,
    handleDeleteNote,
    loadNoteDetail
  }
}
type UseNotesReturn = ReturnType<typeof useNotes>
