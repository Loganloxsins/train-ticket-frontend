<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";
import {useUserStore} from "~/stores/user";


const user = useUserStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (user.name === '') {
    router.push('/')
  }
})

</script>

<template>
  <el-container>
    <el-header style="position: fixed; width: 100%; z-index: 999">
      <MenuUser pageIndex="/order" />
    </el-header>
    <el-main style="margin-top: 10vh">
      <div>
        <el-text size="large" type="primary" style="display: flex;justify-content: center">
          <h1>订单详情</h1>
        </el-text>
        <br/>
      </div>

      <div style="display: flex; justify-content: center; margin-top: 5vh">
        <OrderDetail :id="typeof $route.params['orderId'] === 'string' ? parseInt($route.params['orderId']) : undefined"
          style="width: 50%" />
      </div>
    </el-main>
  </el-container>
</template>

<style scoped></style>