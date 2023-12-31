<script setup lang="ts">

import {h, onMounted, reactive, ref, watch} from "vue";
import { useUserStore } from "~/stores/user";
import { ElNotification, FormInstance , ElTooltip, ElIcon, ElDialog} from "element-plus";
import { request } from "~/utils/request";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "vue-router";
import {Coin} from "@element-plus/icons-vue";

const user = useUserStore()
const router = useRouter()

const ruleFormRef = ref<FormInstance>()
let activeName = ref(1)
let edit = ref(false);
let dialogTableVisible=ref(false)
let form = reactive({
  username: '',
  name: '',
  type: '',
  idn: '',
  phone: '',
  mileage_points: 0,
  member:false,
  role:''
});

const setForm = async () => {
  form.username = user.username;
  form.name = user.name;
  form.type = user.type;
  form.idn = user.idn;
  form.phone = user.phone;
  form.mileage_points = user.mileage_points;
  form.member=user.member
  form.role=user.role
}

watch(user, () => {
  setForm()
})

setForm()

const rules = reactive({
  username: [{ required: true, message: '此字段为必填项', trigger: 'change' }, {
    min: 4, max: 16, message: '用户名长度不符合要求(4-16)', trigger: 'change'
  }, {
    pattern: /^[a-z\d-_]*$/, message: '用户名只能包含小写字母,数字,下划线和连字符', trigger: 'change'
  }],
  name: [{ required: true, message: '此字段为必填项', trigger: 'change' }, {
    min: 2, max: 16, message: '姓名长度不符合要求(2-16)', trigger: 'change'
  }, {
    pattern: /^[\u4e00-\u9fa5]{2,16}$/, message: '姓名只能包含中文', trigger: 'change'
  }],
  idn: [{ required: true, message: '此字段为必填项', trigger: 'change' }, {
    pattern: /^\d{17}(\d|X)$/, message: '身份证号码不符合要求', trigger: 'change'
  }],
  type: [{ required: true, message: '此字段为必填项', trigger: 'change' }, {
    pattern: /^(身份证|护照|其他)$/, message: '证件类型不符合要求', trigger: 'change'
  }],
  phone: [{ required: true, message: '此字段为必填项', trigger: 'change' }, {
    pattern: /^1[3456789]\d{9}$/, message: '手机号码不符合要求', trigger: 'change'
  }],
})

/*
  修改基本信息
 */
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (!valid) return

    console.log('submit!')

    const r = request({
      url: '/user',
      method: 'PUT',
      data: {
        username: form.username,
        name: form.name,
        type: form.type,
        idn: form.idn,
        phone: form.phone,
        mileage_points: form.mileage_points
      }
    })

    r.then((response: AxiosResponse<any>) => {
      ElNotification({
        offset: 70,
        title: '修改成功',
        message: h('info', { style: 'color: teal' }, response.data.msg),
      })
      user.fetch()
      edit.value = false
    }).catch((error: AxiosError<any>) => {
      console.log(error)
      if (error.response?.data.code == 100003) {
        router.push('/')
      }
      ElNotification({
        offset: 70,
        title: 'putUser错误',
        message: h('error', { style: 'color: teal' }, error.response?.data.msg),
      })
    })
  })
}

onMounted(()=>{
  user.fetch()
})

</script>

<template>
  <div style="display: flex; flex-direction: column">
    <div v-if="edit" style="display: flex; flex-direction: row; justify-content: flex-end">
      <el-button @click="edit = false;">取消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)" style="margin-right: 83px">提交</el-button>
    </div>
    <div v-else style="display: flex; flex-direction: row-reverse; align-items: flex-end">
      <el-button type="primary" @click="edit = true; setForm()" style="margin-right: 83px">编辑</el-button>
    </div>

    <br />

    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="30%" class="demo-ruleForm" label-position="right"
      hide-required-asterisk size="large">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" style="width: 25vh" :disabled="true" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" style="width: 25vh" :disabled="!edit" />
      </el-form-item>
      <el-form-item label="证件类型" prop="type">
        <el-select v-model="form.type" placeholder=" " style="width: 25vh" :disabled="!edit">
          <el-option value="身份证" />
          <el-option value="护照" />
          <el-option value="其他" />
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="idn">
        <el-input v-model="form.idn" type="text" style="width: 25vh" :disabled="!edit" />
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" style="width: 25vh" :disabled="!edit" />
      </el-form-item>

      <div v-if="user.role==='passenger'">
        <el-form-item label="积分" prop="mileage_points">
          <el-input v-model="form.mileage_points" style="width: 25vh" :disabled="true" />
        </el-form-item>
        <el-form-item v-if="form.member===true" label="是否是会员" prop="is_member">
          <el-text>是</el-text>
        </el-form-item>
        <el-form-item v-else label="是否是会员" prop="is_member">
          <el-text>否</el-text>
          <el-button type="primary" @click="$router.push('/vipregister')" style="margin-left: 10px" >
            点击注册
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="text" @click="dialogTableVisible=true" style="margin-left: 1px" text-decoration: underline>查看会员权益</el-button>
        </el-form-item>

        <el-dialog title="会员权益" v-model="dialogTableVisible" style="width:35%">
          <div>成为会员后，可用里程积分抵扣订单金额，抵扣规则如下:<br></div>
          <div style="text-indent:2em;">里程积分达到1000，则该1000积分可以折 0.1%;</div>
          <div style="text-indent:2em;">1000到3000积分， 则该2000积分可以折 0.15%;</div>
          <div style="text-indent:2em;">3000到10000积分， 则该7000积分可以折 0.2%;</div>
          <div style="text-indent:2em;">10000到50000积分， 则该40000积分可以折 0.25%;</div>
          <div style="text-indent:2em;">50000积分以上的积分，可以折0.3%.</div>
          <div>里程积分奖励规则:<br></div>
          <div style="text-indent:2em;">每完成一单即可获得里程积分奖励，积分数为票面价格的五倍</div>
        </el-dialog>


      </div>

    </el-form>
  </div>
</template>

<style scoped></style>