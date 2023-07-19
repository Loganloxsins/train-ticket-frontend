<script lang="ts" setup>
import { h, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from "element-plus"
import { request } from "~/utils/request"
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from "vue-router";

const router = useRouter();

const ruleFormRef = ref<FormInstance>()

const validateCheckVipPass = (rule: any, value: any, callback: any) => {
  if (ruleForm.vippassword === '') return
  if (value !== ruleForm.vippassword) {
    callback(new Error("两次密码不一致"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  vippassword: '',
  checkVipPass: '',
  rick: false,
})

const rules = reactive<FormRules>({
  vippassword: [{ required: true, message: '此字段为必填项', trigger: 'change' },{
    pattern: /^[0-9]*$/, message: '密码只能包含数字', trigger: 'change'
  },{
    min: 6, max: 6, message: '密码长度不符合要求(6位)', trigger: 'change'
  }],
  checkVipPass: [{ required: true, message: '此字段为必填项', trigger: 'change' }, {
    validator: validateCheckVipPass,
    trigger: 'change'
  }],
})

/*
  注册会员
 */
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (!valid) return

    console.log('submit!')

    const r = request({
      url: '/user/vipregister',
      method: 'PUT',
      data: {
        vippassword: ruleForm.vippassword,
      }
    })
    r.then((response: AxiosResponse<any>) => {
      ElNotification({
        offset: 70,
        title: '注册成功',
        message: h('info', { style: 'color: teal' }, response.data.msg),
      })
      router.push('/user')
    }).catch((error: AxiosError<any>) => {
      console.log(error)
      ElNotification({
        offset: 70,
        title: 'register错误',
        message: h('error', { style: 'color: teal' }, error.response?.data.msg),
      })
    })
  })

}

</script>

<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="120px">
    <el-form-item label="设置交易密码" prop="vippassword">
      <el-input v-model="ruleForm.vippassword" autocomplete="off" type="password" placeholder="请输入6位数字密码" />
    </el-form-item>
    <el-form-item label="确认交易密码" prop="checkVipPass">
      <el-input v-model="ruleForm.checkVipPass" autocomplete="off" type="password" placeholder="再次输入交易密码" />
    </el-form-item>
    <el-form-item prop="rick">
      <el-checkbox v-model="ruleForm.rick">
        <span>我已阅读并同意</span>
        <el-link type="primary" href="https://www.bilibili.com/video/BV1eX4y1i7k9/"
                 target="_blank">《l23o6会员中心网站服务条款》</el-link>
      </el-checkbox>
    </el-form-item>

    <el-row justify="start">
      <el-col :span="12" style="display: flex; justify-content: center; align-items: center">
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)" :disabled="!ruleForm.rick">注册</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="7" style="display: flex; justify-content: center; align-items: center">
        <el-form-item>
          <el-button @click="$router.back()">
            返回
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped></style>

