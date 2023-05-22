<template>
  <Menu pageIndex="/adminLayout" />
  <div class="main">
    <div class="left">
      <div class="logo">123o6</div>
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        background-color="#4E7cA1" text-color="#fff" active-text-color="#D1C2D3">
        <el-sub-menu index="1">
          <template #title class="el-icon-location">用户管理</template>
          <el-menu-item index="1-1">增加用户</el-menu-item>
          <el-menu-item index="1-2">删除用户</el-menu-item>
          <el-menu-item index="1-3">更改用户信息</el-menu-item>
          <el-menu-item index="1-4">所有用户信息</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title class="el-icon-location">车票管理</template>
          <el-menu-item index="2-1">增加车票</el-menu-item>
          <el-menu-item index="2-2">删除车票</el-menu-item>
          <el-menu-item index="2-3">更改车票信息</el-menu-item>
          <el-menu-item index="2-4">所有车票信息</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title class="el-icon-location">铁路管理</template>
          <el-menu-item index="2-1">增加路线</el-menu-item>
          <el-menu-item index="2-2">删除路线</el-menu-item>
          <el-menu-item index="2-3">更改路线信息</el-menu-item>
          <el-menu-item index="2-4">所有路线信息</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">我的账号</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <div class="nav">
        <div class="icon"></div>
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#4E7cA1" text-color="#fff" active-text-color="#D1C2D3">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-sub-menu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-sub-menu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
      </div>
      <div class="content">2</div>
    </div>
  </div>
</template>

<script>
export default {
  name:"AdminLayout",
  data() {
    return {
      activeIndex2: '1'
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100vw;
  height: 100vh;
  display: flex;

  .left {
    width: 200px;
    background-color: rgb(78, 124, 161);

    .logo {
      width: 90%;
      color: white;
      font-size: 18px;
      text-align: center;
      padding: 8px 0;
      border: 1px solid white;
      margin: 10px auto;
    }
  }

  .right {
    flex: 1;

    .nav {
      height: 60px;
      display: flex;
      justify-content: space-between;
      background-color: rgb(78, 124, 161);
    }

    .content {
      padding: 8px;
    }
  }
}
</style>