<script setup lang="ts">

import { request } from "~/utils/request";
import { ElNotification,ElImage } from "element-plus";
import { h, onMounted, reactive, watch, ref } from "vue";
import { useStationsStore } from "~/stores/stations";
import { useRouter } from "vue-router";
import {OrderDetailData, UserInfo} from "~/utils/interfaces";
import {useUserStore} from "~/stores/user";
import {Plus, Search, Star} from "@element-plus/icons-vue";
import WechatPay from "~/components/WechatPay.vue";

const router = useRouter()
const stations = useStationsStore()

const props = defineProps({
  id: Number,
})

let dialog = ref(false)
let value = ref(false)
let newPrice = ref(0)
let code=ref(false)

let train = reactive<{ data: { name?: string } }>({
  data: {}
});

let orderDetail = reactive<{ data: OrderDetailData }>({
  data: {
    id: 0,
    train_id: 0,
    seat: '',
    status: '',
    created_at: '',
    start_station_id: 0,
    end_station_id: 0,
    departure_time: '',
    arrival_time: '',
    price:0,
  },
})

let userDetail = reactive<{ data: UserInfo }>({
  data: {
    username: '',
    name: '',
    phone: '',
    idn:'',
    type:'',
    mileage_points:0,
    member:false,
    role:''
  },
})


const change = (id: number) => {
  if(value.value&&!userDetail.data.member){
    router.push('/vipregister')
    return
  }
  if(value.value) {
    request({
      url: `/order/usePoints/${id}`,
      method: 'GET',
      data: {
        orderId: id
      }
    }).then((res) => {
      newPrice.value=res.data.data
    }).catch((error) => {
      console.log(error)
    })
  }
  else{
    request({
      url: `/order/cancelUsePoints/${id}`,
      method: 'GET',
      data: {
        orderId: id
      }
    }).then((res) => {
      newPrice.value=res.data.data
    }).catch((error) => {
      console.log(error)
    })
  }
}

const payByAlipay = (id: number) => {
  request({
    url: `/order/${id}`,
    method: 'PATCH',
    data: {
      status: '已支付',
      type:'支付宝支付'
    }
  }).then((res) => {
    console.log(res.data.data)
    let url=res.data.data
    window.location.href=url
  }).catch((error) => {
    if (error.response?.data.code == 100003) {
      router.push('/')
    }
    ElNotification({
      offset: 70,
      title: '支付失败',
      message: h('error', { style: 'color: teal' }, error.response?.data.msg),
    })
    console.log(error)
  })
}

const changeCode = () =>{
  code.value=true
}

const wechatPay = (id: number) => {
  request({
    url: `/order/${id}`,
    method: 'PATCH',
    data: {
      status: '已支付',
      type:'微信支付'
    }
  }).then((res) => {
    console.log(res)
    router.push('/search')
  }).catch((error) => {
    if (error.response?.data.code == 100003) {
      router.push('/')
    }
    ElNotification({
      offset: 70,
      title: '支付失败',
      message: h('error', { style: 'color: teal' }, error.response?.data.msg),
    })
    console.log(error)
  })
}

onMounted(() => {
  refreshData()
})

const refreshData = () => {
  request({
    url: `/order/${props.id}`,
    method: 'GET',
  }).then(res => {
    orderDetail.data = res.data.data
    newPrice.value=orderDetail.data.price
  }).catch(err => {
    console.log(err)
  })

  request({
    url: `/user`,
    method: 'GET',
  }).then(res => {
    userDetail.data = res.data.data
  }).catch(err => {
    console.log(err)
  })
}


</script>

<template>
  <div style="display: flex; flex-direction: column">

    <div>
      <el-text size="large" tag="b" type="primary">
        票价:
      </el-text>
      <el-text size="large" tag="b">
        {{orderDetail.data.price}}
      </el-text>
    </div>

    <div style="margin-top: 20px">
      <el-text size="large" tag="b" type="primary">
        您现在的积分数：
      </el-text>
      <el-text size="large" tag="b">
        {{userDetail.data.mileage_points}}
      </el-text>
    </div>

    <div style="margin-top: 20px">
      <el-switch
          v-model="value"
          active-text="使用积分"
          inactive-text="不使用积分" @click="change(id ?? -1)">
      </el-switch>
      <el-text v-if="userDetail.data.member===false" style="color: #db2828; margin-left: 10px">
        您还不是会员,不可使用积分
      </el-text>
    </div>

    <div v-if="userDetail.data.member===false">
      <el-button type="primary" @click="$router.push('/vipregister')">
        <el-icon style="vertical-align: middle">
          <Star />
        </el-icon>
        <span>成为会员</span>
      </el-button>
    </div>

    <div style="margin-top: 20px">
      <el-text size="large" tag="b" type="primary">
        订单总价:
      </el-text>
      <el-text size="large" tag="b">
        {{newPrice}}
      </el-text>
    </div>

    <div v-if="code===true" style="margin-top: 20px">
<!--      <img src="public/wechatpay.jpg" alt="微信支付" style="width: 350px">-->
      <el-image src="/public/wechatpay.jpg"></el-image>
    </div>

    <div v-if="code!==true" style="margin-bottom: 2vh; margin-top: 20px">
      <el-button style="margin-left:80px" @click="payByAlipay(id ?? -1)">
        支付宝支付
      </el-button>
      <el-button style="margin-left:180px" @click="changeCode">
        微信支付
      </el-button>
    </div>
    <div v-else>
      <el-button style="margin-left:240px" @click="wechatPay(id ?? -1)">
        完成
      </el-button>
    </div>



  </div>
</template>

<style scoped>
/*.button {*/
/*  margin-left:50px;  */
/*}*/
</style>