
<template>
    <div class="container">
        <h1 class="title">l23o6 欢迎你！</h1>
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
    </div>
    <div class="container"></div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const activeName = ref('登录')
</script>

<style scoped>
.box-card {
    width: 480px;
    margin: 20vh auto 0;
    background-color: #f8f8f8;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    //box-shadow: 0 0 10px rgb(48, 93, 182);
}
.title {
    text-align: center;
    font-size: 36px;
    color: rgb(200, 26, 2);
    margin-bottom: 20px;
}

.tab-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    margin: 20px auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("public/Eerie.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 0.8; /* 背景图的透明度 */
    z-index: -1; /* 将伪元素放置在最底层 */
}
</style>
