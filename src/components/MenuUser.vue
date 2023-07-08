<script lang="ts" setup>
import { toggleDark } from '~/composables';
import { useRouter } from "vue-router";
import { useUserStore } from "~/stores/user";
import { request } from "~/utils/request";
import { AxiosError, AxiosResponse } from "axios";
import { ElNotification } from "element-plus";
import { h } from "vue";
defineProps<{
  pageIndex: string
}>()

const router = useRouter()
const user = useUserStore()
const menuSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
}

/*
  退出登录，删除存储的登录信息
 */
const logout = () => {
  request({
    url: '/session',
    method: 'DELETE'
  }).then((response: AxiosResponse<any>) => {
    ElNotification({
      offset: 70,
      title: '登出成功',
      message: h('info', { style: 'color: teal' }, response.data.msg),
    })
    localStorage.removeItem('isLoggedIn')
    user.$reset()
    router.push('/')
  }).catch((error: AxiosError<any>) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: 'logout错误',
      message: h('error', { style: 'color: teal' }, error.response?.data.msg),
    })
    router.push('/')
  });
}

</script>
        
<template>
  <el-menu :default-active="pageIndex" mode="horizontal" class="el-menu-demo" @select="menuSelect" :router=true>
    <el-menu-item index="/userhome">你好乘客</el-menu-item>
    <el-menu-item index="/search">车票购买</el-menu-item>
    <el-menu-item h="full" @click="toggleDark()">
      <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--el-menu-item-height)">
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="/" v-if="user.username === ''">登录</el-menu-item>
    <el-menu-item index="/" v-if="user.username === ''">注册</el-menu-item>
    <el-menu-item index="/user" v-if="user.username !== ''">用户中心</el-menu-item>
    <el-menu-item @click="logout" v-if="user.username !== ''">登出</el-menu-item>
  </el-menu>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
