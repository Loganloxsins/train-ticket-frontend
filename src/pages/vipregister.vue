<script setup lang="ts">

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

