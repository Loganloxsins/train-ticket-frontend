<script setup lang="ts">
import { h, onMounted, reactive, ref } from "vue";
import { request } from "~/utils/request";
import { ElNotification } from "element-plus";
import { useSearchStore } from "~/stores/search";
import {useRoute, useRouter} from 'vue-router'
import {useUserStore} from "~/stores/user";


const user = useUserStore()
const router = useRouter()
const route = useRoute();
const search = useSearchStore();

let trains = reactive({
  res: []
})
let loading = ref(false)
let empty = ref(false)

onMounted(() => {
  if (route.hash == "#query") {
    submit()
  }
})

/*
  查询车次
 */
const submit = () => {
  loading.value = true
  const r = request({
    url: '/train',
    method: 'GET',
    params: {
      start_station_id: search.start_station_id,
      end_station_id: search.end_station_id,
      date: search.date
    }
  })

  r.then((res) => {
    trains.res = res.data.data
    console.log("submit")
    empty.value = trains.res.length === 0;
  }).catch((error) => {
    console.log(error)
    ElNotification({
      offset: 70,
      title: 'search错误',
      message: h('error', { style: 'color: teal' }, error.response?.data.msg),
    })
  }).finally(() => {
    loading.value = false
  })
}

</script>


<template>
   <MenuUser v-if="user.role==='passenger'" pageIndex="/search"/>
   <MenuAdmin v-else pageIndex="/search"/>
  <el-container>
    <el-main v-loading="loading" style="height: 90vh;margin-top: 8vh">

      <div style="display: flex; justify-content: center; margin-bottom: 5vh">
        <el-card shadow="hover" style="width: 80%;">

          <SearchTicketForm :inline="true" @formUpdated="submit" style="display: flex; justify-content: center" />
        </el-card>
      </div>
      <el-empty v-if="empty" description="结果为空" style="margin-top: 10%" />
      <train-description v-for="train in trains.res" v-bind="train" />
    </el-main>
  </el-container>
</template>

<style scoped></style>