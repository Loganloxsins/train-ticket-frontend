<script lang="ts" setup>
import { toggleDark } from '~/composables';
defineProps<{
    pageIndex: string
}>()

const menuSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
}
</script>

<template>
    <el-menu :default-active="pageIndex" mode="horizontal" class="el-menu-demo" @select="menuSelect" :router=true>
        <el-menu-item index="/">主页</el-menu-item>
        <el-menu-item index="/user">临时1</el-menu-item>
        <el-menu-item index="/admin">临时2</el-menu-item>
        <el-menu-item index="/adminLayout">临时3</el-menu-item>
        <el-menu-item h="full" @click="toggleDark()">
            <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--el-menu-item-height)">
                <i inline-flex i="dark:ep-moon ep-sunny" />
            </button>
        </el-menu-item>
    </el-menu>
</template>
