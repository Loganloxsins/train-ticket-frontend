<script lang="ts" setup>
import { ref } from "vue";

const activeName = ref('登录')
</script>

<template>
    <Menu pageIndex="/user" />
    <el-card class="demo-tabs box-card" shadow="hover">
        <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="登录" name="登录">
                <Login />
            </el-tab-pane>
            <el-tab-pane label="注册" name="注册">
                <Register />
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<style scoped>
.box-card {
    width: 480px;
    /*height: 270px;*/
    margin: 20vh auto 0;
}
</style>