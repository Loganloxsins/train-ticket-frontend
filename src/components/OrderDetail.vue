<script setup lang="ts">

import { request } from "~/utils/request";
import { ElNotification } from "element-plus";
import { h, onMounted, reactive, watch, ref } from "vue";
import { useStationsStore } from "~/stores/stations";
import { parseDate } from "~/utils/date";
import { useRouter } from "vue-router";
import { OrderDetailData } from "~/utils/interfaces";

const router = useRouter()
const stations = useStationsStore()

const props = defineProps({
  id: Number,
})

let dialog = ref(false)
let day=ref(0)
let hr=ref(0)
let min=ref(0)
let sec=ref(0)
let hasDepart=ref(false)
let dialogTableVisible=ref(false)

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
    price:0
  },
})

let train = reactive<{ data: { name?: string } }>({
  data: {}
});

const tableData=[{
  days: '大于等于8天',
  rate: '不收取退票费',
}, {
  days: '大于等于2天小于8天',
  rate: '5%',
}, {
  days: '大于等于1天小于2天',
  rate: '10%',
}, {
  days: '小于1天',
  rate: '20%',
}]

const getOrderDetail = () => {
  request({
    url: `/order/${props.id}`,
    method: 'GET',
  }).then(res => {
    orderDetail.data = res.data.data
    console.log(orderDetail.data)
  }).catch(err => {
    console.log(err)
    if (err.response?.data.code == 100003) {
      router.push('/')
    }
    ElNotification({
      offset: 70,
      title: 'getOrder错误',
      message: h('i', { style: 'color: teal' }, err.response?.data.msg),
    })
  })
}

const getTrain = () => {
  console.log("getTrain")
  if (orderDetail.data) {
    request({
      url: `/train/${orderDetail.data.train_id}`,
      method: 'GET'
    }).then((res) => {
      train.data = res.data.data
      console.log(train)
    }).catch((error) => {
      ElNotification({
        offset: 70,
        title: 'getTrain错误(orderDetail)',
        message: h('error', { style: 'color: teal' }, error.response?.data.msg),
      })
      console.log(error)
    })
  }
}


const cancel = (id: number) => {
  request({
    url: `/order/${id}`,
    method: 'PATCH',
    data: {
      status: '已取消'
    }
  }).then((res) => {
    ElNotification({
      offset: 70,
      title: '订单已取消',
      message: h('success', { style: 'color: teal' }, res.data.msg),
    })
    getOrderDetail()
    console.log(res)
  }).catch((error) => {
    if (error.response?.data.code == 100003) {
      router.push('/')
    }
    ElNotification({
      offset: 70,
      title: '取消失败',
      message: h('error', { style: 'color: teal' }, error.response?.data.msg),
    })
    console.log(error)
  })
}

const countdown = () => {
  let dt=new Date(orderDetail.data.created_at)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + 1 + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  const end = Date.parse((new Date(`${y}-${m}-${d} ${hh}:${mm}:${ss}`)).toString())
  const now = Date.parse((new Date().toString()))
  const depart = Date.parse(new Date(orderDetail.data.departure_time).toString())
  const msec = end - now
  const diff = depart-now
  let diff_min=diff / 1000 / 60
  if(diff_min<=0){
    hasDepart.value=true
  }

  if(orderDetail.data.status==='等待支付'&&(msec<=0||diff_min<=30)){
    cancel(props.id ?? -1)
    return;
  }
  if(msec<0) return;

  day.value = parseInt(String(msec / 1000 / 60 / 60 / 24))
  hr.value = parseInt(String(msec / 1000 / 60 / 60 % 24))
  min.value = parseInt(String(msec / 1000 / 60 % 60))
  sec.value = parseInt(String(msec / 1000 % 60))

  if(isNaN(day.value)||isNaN(hr.value)||isNaN(min.value)||isNaN(sec.value)){
    day.value=0
    hr.value=0
    min.value=0
    sec.value=0
  }

  setTimeout(function () {
    countdown()
  }, 1000)
}

watch(orderDetail, () => {
  getTrain()
})

onMounted(() => {
  stations.fetch()
  getOrderDetail()
  countdown()
})

getOrderDetail()

</script>

<template>
  <div style="display: flex; flex-direction: column">

    <div style="margin-bottom: 2vh;">
      <el-button style="float:right" @click="getOrderDetail">
        刷新
      </el-button>
    </div>

    <div style="display: flex; justify-content: space-between;">
      <div>
        <el-text size="large" tag="b" type="primary">
          订单号:&nbsp;&nbsp;
        </el-text>
        <el-text size="large" tag="b">
          {{ props.id }}
        </el-text>
      </div>
      <div>
        <el-text size="large" tag="b" type="primary">
          创建日期:&nbsp;&nbsp;
        </el-text>
        <el-text size="large" tag="b" v-if="orderDetail.data">
          {{ parseDate(orderDetail.data.created_at) }}
        </el-text>
      </div>
    </div>

    <div>
      <el-text size="large" tag="b" type="primary">
        订单状态:&nbsp;&nbsp;
      </el-text>
      <el-text size="large" tag="b" v-if="orderDetail.data">
        {{ orderDetail.data.status }}
      </el-text>
    </div>

    <div v-if="orderDetail.data && orderDetail.data.status === '等待支付'" style="font-size: 16px;color: #db2828">
      剩余支付时间（超时自动关闭）:  {{hr}}小时 {{min}}分钟 {{sec}}秒
    </div>

    <div style="margin-bottom: 2vh">
      <el-text size="large" tag="b" type="primary">
        车次信息:
      </el-text>
    </div>

    <el-descriptions :column="4" border>
      <el-descriptions-item :span="2" width="25%" align="center">
        <template #label>
          <el-text type="primary" tag="b" size="large">
            车次
          </el-text>
        </template>
        <el-text type="primary" tag="b" size="large">
          {{ train?.data?.name }}
        </el-text>
      </el-descriptions-item>
      <el-descriptions-item label="席位信息" :span="2" width="25%" align="center" v-if="orderDetail.data">
        {{ orderDetail.data.seat }}
      </el-descriptions-item>
      <el-descriptions-item label="出发站" :span="2" width="25%" align="center" v-if="orderDetail.data">
        {{ stations.idToName[orderDetail.data.start_station_id] ?? '未知站点' }}
      </el-descriptions-item>
      <el-descriptions-item label="到达站" :span="2" width="25%" align="center" v-if="orderDetail.data">
        {{ stations.idToName[orderDetail.data.end_station_id] ?? '未知站点' }}
      </el-descriptions-item>
      <el-descriptions-item label="出发时间" :span="2" width="25%" align="center" v-if="orderDetail.data">
        {{ parseDate(orderDetail.data.departure_time) }}
      </el-descriptions-item>
      <el-descriptions-item label="到达时间" :span="2" width="25%" align="center" v-if="orderDetail.data">
        {{ parseDate(orderDetail.data.arrival_time) }}
      </el-descriptions-item>
    </el-descriptions>

    <div style="margin-top: 2vh" v-if="orderDetail.data && orderDetail.data.status === '等待支付'">
      <div style="float:right;">
        <el-button type="danger" @click="cancel(id ?? -1)">
          取消订单
        </el-button>
        <el-button type="primary" @click="dialog = true">
          支付订单
        </el-button>
      </div>
    </div>
    <div v-else-if="orderDetail.data && orderDetail.data.status === '已完成'&&hasDepart!==true" style="margin-top: 2vh">
      <div style="float:right;">
        <el-button type="text" @click="dialogTableVisible=true" style="margin-right: 20px ; text-decoration: underline">退票须知</el-button>

        <el-dialog title="退票规则" v-model="dialogTableVisible" style="width:65%">
          <div style="text-indent:2em;">在l23o6网站购买且未检票使用的车票，均可在开车前通过l23o6网站或车站指定窗口办理退票手续。<br></div>
          <div style="text-indent:2em;">在l23o6网站办理退票时，按购票时所使用的在线支付工具相关规定，应退票款在规定时间退回购票时所使用的在线支付工具。<br></div>
          <div style="text-indent:2em;">退票时需要收取一定的退票费，退票费的金额与距离发车的时间有关。具体规则如下：<br></div>

          <el-table
              :data="tableData"
              style="width: 100%; margin-left: 20px">
            <el-table-column
                prop="days"
                label="距离发车时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="rate"
                label="退票费占订单价格的比率"
                width="180">
            </el-table-column>
          </el-table>

        </el-dialog>

        <el-button type="danger" @click="cancel(id ?? -1); $emit('updateorder', orderDetail)">
          退票
        </el-button>
      </div>
    </div>
  </div>
  <el-dialog destroy-on-close v-model="dialog" title="支付详情" width="40%">
    <PaymentDetail :id="id" />
  </el-dialog>
</template>

<style scoped>

</style>