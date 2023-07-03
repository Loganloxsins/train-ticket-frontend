<script setup lang="ts" >

</script>

<template>
    <MenuUser pageIndex="/point" />
    <el-container>
        <el-header style="position: fixed; width: 100%; z-index: 999">
        </el-header>
        <el-main style="margin-top: 10vh">
            <el-row justify="center" style="display: flex; align-content: center;height: 80vh;">


                <el-card class="login-card" shadow="hover" header="会员登录">
                    <ViploginForm />
                </el-card>

            </el-row>
        </el-main>
    </el-container>
</template>

<style scoped>
.login-card {
    width: 350px;
    height: 230px;
    margin: 0 auto 20vh;
}
</style>