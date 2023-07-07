<script setup lang="ts">

import {useUserStore} from "~/stores/user";
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import {ElMessage} from "element-plus";

const user = useUserStore()
const router = useRouter()

onMounted(() => {
  if (user.name === ''&&!localStorage.getItem('isLoggedIn')) {
    router.push('/')
    ElMessage("请先登录")
    return
  }
})

</script>

<template>
    <MenuUser pageIndex="/vipregister" />
    <el-container>
        <el-header style="position: fixed; width: 100%; z-index: 999">
        </el-header>
        <el-main style="margin-top: 0vh">
            <el-row style="display: flex; justify-content: center; align-content: center; height: 80vh">
                <el-col :span="24" style="display: flex; justify-content: center; align-content: center">
                    <el-card shadow="hover" header="注册成为会员">
                        <VipregForm />
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

