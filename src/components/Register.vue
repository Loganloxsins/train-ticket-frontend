<script lang="ts" setup>
import {h, onMounted, reactive, ref} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification,ElCascader,ElButton,ElInput,ElFormItem} from "element-plus"
import { request } from "../utils/request"
import { AxiosError, AxiosResponse } from 'axios';

const data={
  typePlaceHolder:'请选择证件类型'
}

const ruleFormRef = ref<FormInstance>()

const validateCheckPass = (rule: any, value: any, callback: any) => {
  if (ruleForm.password === '') return
  if (value !== ruleForm.password) {
    callback(new Error("密码不一致"))
  } else {
    callback()
  }
}

const validateCheckIDCard = (rule: any, value: any, callback: any) => {
  let IDCardType=ruleForm.IDCardType[0]
  let valueReg
  switch (IDCardType){
    case '中国居民身份证':
      valueReg=/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if(valueReg.test(value)) callback()
      else callback(new Error("请正确输入18位的证件号码！"))
      break;

    case '港澳台居民居住证':
      valueReg=/^8[1-3]0{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if(valueReg.test(value)) callback()
      else callback(new Error("请正确输入18位的证件号码"))
      break;

    case '港澳居民来往内地通行证':
      valueReg=/^[HM]\d{8}$/
      if(valueReg.test(value)) callback()
      else callback(new Error("请输入9位有效的港澳居民来往内地通行证号码！"))
      break;

    case '台湾居民来往大陆通行证':
      valueReg=/^\d{8}$/
      if(valueReg.test(value)) callback()
      else callback(new Error("请输入8位有效的台湾居民来往大陆通行证号码！"))
      break;

    case '护照':
      valueReg=/^[A-Za-z\d]{9}$/
      if(valueReg.test(value)) callback()
      else callback(new Error("请输入有效的护照号码！"))
      break;

    case '外国人永久居留身份证':
      valueReg=/^[A-Za-z\d]{15}$/
      if(valueReg.test(value)) callback()
      else callback(new Error("请输入有效的外国人居留证号码！"))
      break;

    default:
      break;
  }
}

const ruleForm = reactive({
  username: '',
  password: '',
  checkPass: '',
  IDCardType: '',
  IDCard: '',
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
  checkPass: [{ required: true, message: '此字段为必填项', trigger: 'change' }, {
    validator: validateCheckPass,
    trigger: 'change'
  }],
  IDCardType:[{required: true, message: '此字段为必填项', trigger: 'change'}],
  IDCard:[{required: true, message:'此字段为必填项', trigger: 'change'},{
    validator: validateCheckIDCard,
    trigger: 'change'
  }]
})

const options = [
  {value: '中国居民身份证', label: '中国居民身份证'},
  {value: '港澳台居民居住证', label: '港澳台居民居住证',},
  {value: '港澳居民来往内地通行证', label: '港澳居民来往内地通行证'},
  {value: '台湾居民来往大陆通行证', label: '台湾居民来往大陆通行证'},
  {value: '护照', label: '护照'},
  {value: '外国人永久居留身份证', label: '外国人永久居留身份证'},
]

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (!valid) return

    console.log('submit!')

    const r = request({
      url: '/v1/user',
      method: 'POST',
      data: {
        username: ruleForm.username,
        password: ruleForm.password,
        idcard: ruleForm.IDCard,
        name:'jypppp',
        email:'1042822303@qq.com',
        phone:'18261715196',
        type:'客户'
      }
    })

    r.then((response: AxiosResponse<any>) => {
      console.log(response)
      ElNotification({
        title: '注册成功',
        message: h('info', { style: 'color: teal' }, response.data.msg),
      })
    }).catch((error: AxiosError<any>) => {
      console.log(error)
      ElNotification({
        title: '错误',
        message: h('error', { style: 'color: teal' }, error.response?.data.msg),
      })
    })
  })


}

</script>

<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="120px" status-icon>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" type="text" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" autocomplete="off" type="password" />
    </el-form-item>

    <el-form-item label="密码确认" prop="checkPass">
      <el-input v-model="ruleForm.checkPass" autocomplete="off" type="password" />
    </el-form-item>

    <el-form-item label="证件类型" prop="IDCardType">
      <el-cascader
          :options="options"
          :placeholder="data.typePlaceHolder"
          v-model="ruleForm.IDCardType"
          clearable />
    </el-form-item>

    <el-form-item label="证件号码" prop="IDCard">
      <el-input v-model="ruleForm.IDCard" type="text" />
    </el-form-item>

    <el-form-item label="随便push看" prop="checkPass">
      <el-input v-model="ruleForm.checkPass" autocomplete="off" type="password" />
    </el-form-item>

    <el-form-item>
      <el-button style="margin-left: 25%" type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>

