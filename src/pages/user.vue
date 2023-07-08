<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { useRouter } from "vue-router";
import {onMounted, ref} from "vue";
import { request } from "~/utils/request";
import {ElMessage} from "element-plus";

const router = useRouter()
const user = useUserStore()

let index = ref(1)

const menuSelect = (key) => {
  index.value = key
  console.log(key);
}

onMounted(() => {
  console.log(user.role)
  //验权，如无权限则需登录
  if (user.name === ''&&!localStorage.getItem('isLoggedIn')) {
    router.push('/')
    ElMessage("请先登录")
    return
  }
})

</script>

<template>
  <el-container>
    <el-header style="position: fixed; width: 100%; z-index: 999">
      <MenuUser v-if="user.role==='passenger'" pageIndex="/user" />
      <MenuAdmin v-else pageIndex="/user" />
    </el-header>
    <el-container style="display: flex; align-items: center; height: 85vh">
      <el-aside width="15%">
        <el-menu default-active="1" class="el-menu-vertical-demo"
                 style="height: 85vh; display: flex; flex-direction: column; justify-content: center" @select="menuSelect">
          <el-menu-item index="1">
            <strong>
              个人信息
            </strong>
          </el-menu-item>
          <el-menu-item v-if="user.role==='passenger'" index="2">
            <strong>
              订单信息
            </strong>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="display: flex; justify-content: center; align-items: center">
        <div v-show="index == 1">
          <el-text size="large" type="primary" style="display: flex;justify-content: center; margin-bottom: 5vh">
            <h1>个人信息</h1>
          </el-text>
          <br />
          <UserInfoComponent style="width: 50vh; margin: 0 auto" />
        </div>

        <div v-if="user.role==='passenger'" v-show="index == 2" style="height: 85vh; margin-top: 10vh; width: 65%">
          <el-text size="large" type="primary" style="display: flex;justify-content: center">
            <h1>订单</h1>
          </el-text>
          <UserOrders />
        </div>
      </el-main>
    </el-container>

  </el-container>
</template>

<style scoped></style>