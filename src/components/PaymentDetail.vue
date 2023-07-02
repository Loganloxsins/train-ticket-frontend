<script setup lang="ts">

import { request } from "~/utils/request";
import { ElNotification } from "element-plus";
import { h, onMounted, reactive, watch, ref } from "vue";
import { useStationsStore } from "~/stores/stations";
import { useRouter } from "vue-router";
import {OrderDetailData, UserInfo} from "~/utils/interfaces";
import {useUserStore} from "~/stores/user";

const router = useRouter()
const stations = useStationsStore()

const props = defineProps({
  id: Number,
})

let dialog = ref(false)
let value = ref(false)
let newPrice = ref(0)

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
  },
})


const change = (id: number) => {
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

    <div>
      <el-text size="large" tag="b" type="primary">
        订单总价:
      </el-text>
      <el-text size="large" tag="b">
        {{newPrice}}
      </el-text>
    </div>

    <div>
      <el-text size="large" tag="b" type="primary">
        您现在的积分数：
      </el-text>
      <el-text size="large" tag="b">
        {{userDetail.data.mileage_points}}
      </el-text>
    </div>

    <el-switch
        v-model="value"
        active-text="使用积分"
        inactive-text="不使用积分" @click="change(id ?? -1)">
    </el-switch>

    <div style="margin-bottom: 2vh;">
      <el-button style="float:left">
        支付宝支付
      </el-button>
      <el-button style="float:left">
        微信支付
      </el-button>
    </div>

  </div>
  <el-dialog destroy-on-close v-model="dialog" title="订单详情" width="50%">
    <PaymentDetail :id="id" />
  </el-dialog>
</template>

<style scoped></style>