// ======  INTERFACE MENU SIDEBAR ======
export interface SidebarItemChildren2 {
  label: string
  route?: string
}
export interface SidebarItemChildren {
  label: string
  route?: string
  children?: SidebarItemChildren2[]
}
export interface SidebarItem {
  label: string
  route?: string
  icon?: any
  children?: SidebarItemChildren[]
}
export interface MenuGroup {
  menuItems: SidebarItem[]
}
// ====== END INTERFACE MENU SIDEBAR ======

// ====== INTERFACE FORM INPUT DIALOG ======

export interface TBaseInputProps {
  label: string
  inputId?: string
  inputPlaceHoder?: string
  modelValue?: string
  required?: string
  customsClass?: string
  customsClassChild?: string
  customsClassChild2?: string
}
export interface SelectGroupProps extends TBaseInputProps {
  // value: string | number
  optionsData: Option[]
}
interface Option {
  value: any
  label: string
}

export interface InputGroupProps extends TBaseInputProps {}
export interface InputOpionGroupProps extends SelectGroupProps {}
export interface UploadGroupProps extends TBaseInputProps {
  imageUrl: any
  handlePreviewImg: (event: any) => void
}

export interface RadioGroupProps extends TBaseInputProps {


}
export interface InputItemsProps extends Omit<TBaseInputProps, 'label'> {
  icon: any
  link?: string
}

export interface ContentGroupProps extends TBaseInputProps {
  value?: string // Cả hai đều có value
}

export interface DescriptionGroupProps extends ContentGroupProps {}

export interface CkeditorGroupProps extends ContentGroupProps {}

// ====== END INTERFACE FORM INPUT DIALOG ======
