<script lang="ts" setup>
import { h, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from "element-plus"
import { request } from "../utils/request"
import { AxiosError, AxiosResponse } from 'axios';

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  username: '',
  password: '',
  role: '',
})

const rules = reactive<FormRules>({
  username: [{ required: true, message: '此字段为必填项', trigger: 'change' }, {
    min: 4, max: 16, message: '用户名长度不符合要求(4-16)', trigger: 'change'
  }, {
    pattern: /^[a-z\d-_]*$/, message: '用户名只能包含小写字母,数字,下划线和连字符', trigger: 'change'
  }],
  password: [{ required: true, message: '此字段为必填项', trigger: 'change' }, {
    min: 8, max: 56, message: '密码长度不符合要求(8-56)', trigger: 'change'
  }, {
    pattern: /^[\x21-\x7e]*$/, message: '密码只能包含字母,数字和符号', trigger: 'change'
  }, {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
    message: '密码未达到复杂性要求:密码必须包含大小写字母和数字',
    trigger: 'change'
  }],
  role: [{ required: true, message: '此字段为必填项', trigger: 'change' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (!valid) return

    console.log('submit!')

    const r = request({
      url: '/v1/session',
      method: 'POST',
      data: {
        username: ruleForm.username,
        password: ruleForm.password,
        role: ruleForm.role
      }
    })

    r.then((response: AxiosResponse<any>) => {
      console.log(response)
      ElNotification({
        title: '登录成功',
        message: h('i', { style: 'color: teal' }, response.data.msg),
      })
    }).catch((error: AxiosError<any>) => {
      console.log(error)
      ElNotification({
        title: '错误',
        message: h('i', { style: 'color: teal' }, error.response?.data.msg),
      })
    })
  })

}

</script>

<template>
  <el-form class="demo-ruleForm" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" status-icon>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" type="text" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" autocomplete="off" type="password" show-password />
    </el-form-item>

    <el-form-item label="身份" prop="role">
      <el-select v-model="ruleForm.role" placeholder="请选择您的登入身份">
      <el-option label="乘客" value="passenger"></el-option>
      <el-option label="管理员" value="admin"></el-option>
    </el-select>
    </el-form-item>

    <el-form-item>
      <el-button style="margin-left: 25%" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
    </el-form-item>
  </el-form>
</template>


<style scoped></style>