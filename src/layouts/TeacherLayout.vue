<script setup lang="ts">
import SiderArea from '@/components/admin/Sidebar/SidebarArea.vue';
import HeaderArea from '@/components/admin/Header/HeaderArea.vue';

</script>
<template>
    <div class="flex flex-col h-[100vh]">
        <div class="p-3 flex gap-3 w-full h-full">
            <SiderArea />

            <main class="overflow-y-auto border-1 shadow-xl w-full scroll-hidden text-black dark:text-white">
                <HeaderArea />
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>
<style scoped>
:root {
    --el-color-primary: #3c50e0 !important;
    --el-color-primary-light-8: #a9c0f8;
    --el-color-primary-light-9: #c9d9fc;
    --el-color-primary-light-10: #e1ebfe;
}

.shadow-switcher {
    --tw-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #ffffff,
        inset 0px -1px 1px rgba(0, 0, 0, 0.1);
    --tw-shadow-colored: 0px 2px 4px var(--tw-shadow-color), inset 0px 2px 2px var(--tw-shadow-color),
        inset 0px -1px 1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
        var(--tw-shadow);
}

.h-7\.5 {
    height: 1.875rem;
}

.w-7\.5 {
    width: 1.875rem;
}

.py-1\.5 {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
}

.px-1\.5 {
    padding-left: 0.375rem;
    padding-right: 0.375rem;
}

.animate-ping {
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.bg-meta-1 {
    --tw-bg-opacity: 1;
    background-color: rgb(220 53 69 / var(--tw-bg-opacity));
}

.scroll-hidden {
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* Internet Explorer 10+ */
}

.scroll-hidden::-webkit-scrollbar {
    display: none;
    /* Safari and Chrome */
}

.before-tag::before {
    content: '';
    display: block;
    width: 30px;
    height: 30px;
    background-color: red;
    border-radius: 50%;
    margin-right: 8px;
    z-index: 10001;
    position: absolute;
}

.hoverItem:hover .overItemChild {
    display: block;
    transition: 300;
}

/* ==== CUSTOMIZE ELEMENT PLUS ==== */
.el-table:not(.el-table--border) .el-table__cell {
    text-align: center;
}

.el-table {
    --el-table-row-hover-bg-color: none !important;
    --el-table-header-bg-color: none !important;
}

/* Table */
.el-tag {
    border-radius: 5px !important;
}

.el-pager {
    gap: 0.5rem;
}

.vtl-table thead th[data-v-1e91228a] {
    vertical-align: bottom;
    color: black;
    background-color: transparent;
    border-color: transparent;
    border-bottom: 2px solid #dee2e6;
}

.page-link[data-v-1e91228a] {
    color: var(--el-color-primary);
}

.vtl-table-bordered td[data-v-1e91228a],
.vtl-table-bordered th[data-v-1e91228a] {
    border: none;
}

.vtl-table-hover tbody tr[data-v-1e91228a]:hover {
    background-color: var(--el-color-primary-light-10);
}

@media (min-width: 576px) {
    .vtl-table-responsive-sm[data-v-1e91228a] {
        display: block;
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        max-height: none !important;
    }
}

@media (min-width: 876px) {
    .vtl-table-responsive-sm[data-v-1e91228a] {
        overflow-x: auto;
    }
}

/* End Table */

/* Form  */
/* Form select */
.el-select__wrapper {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    --tw-ring-opacity: 1;
    border-radius: 0.375rem;
    --tw-ring-opacity: 1;
    --tw-ring-color: rgb(209 213 219 / var(--tw-ring-opacity));
}

.el-select__wrapper.is-focused {
    box-shadow: 0 0 0 2px var(--el-color-primary) inset !important;
    --tw-ring-opacity: 1;
}

/* End Form select */
/* End Form  */

/* Tab */
.el-tabs--left .el-tabs__item.is-left,
.el-tabs--right .el-tabs__item.is-left {
    justify-content: flex-start;
}

.el-tabs__item.is-active,
.el-tabs__item:hover {
    background-color: var(--el-color-primary);
    margin-bottom: 0.25rem;
    color: white;
    border-radius: 0.325rem;
}

.el-tabs__item {
    margin-bottom: 0.25rem;
}

.el-tabs--left .el-tabs__nav-wrap.is-left:after,
.el-tabs--left .el-tabs__nav-wrap.is-right:after,
.el-tabs--right .el-tabs__nav-wrap.is-left:after,
.el-tabs--right .el-tabs__nav-wrap.is-right:after,
.el-tabs--left .el-tabs__active-bar.is-left,
.el-tabs--left .el-tabs__active-bar.is-right,
.el-tabs--right .el-tabs__active-bar.is-left,
.el-tabs--right .el-tabs__active-bar.is-right {
    bottom: auto;
    height: 0px;
    top: 0;
    width: 0px;
}

.el-tabs {
    --el-tabs-header-height: 50px;
    display: flex;
}

.el-input__wrapper {
    padding: 3px 11px;
    border-radius: 0.375rem;
}

/* End Tab */
/* Collapse */
.el-collapse-item__header {
    background-color: transparent;
    padding-left: 2rem;
    padding-right: 1rem;
    line-height: 16px;
}

.el-collapse-item:last-child {
    border: 2px solid lightgray;
    border-radius: 7px;
    margin-bottom: 0;
}

.el-collapse {
    border-color: transparent;
    border-bottom: none;
}

.el-collapse-item__wrap {
    border-radius: 5px;
    border-bottom: none;
}

.el-collapse-item__content {
    padding: 0rem 1rem 1rem 1rem;
}

.el-collapse-item__header.is-active {
    background-color: var(--el-color-primary-light-9);
    border-radius: 5px 5px 0px 0px;
    display: flex;
}

.el-collapse-item__arrow {
    margin: 0 8px 0 2px;
}

.el-collapse-item__btn {
    margin: 0 8px 0 auto;
}

/* End Collapse */
</style>
