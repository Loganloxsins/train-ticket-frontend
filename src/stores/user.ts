import { defineStore } from "pinia";
import { request } from "~/utils/request";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            username: '',
            name: '',
            type: '',
            idn: '',
            phone: '',
            mileage_points:0,
            member:false,
            role:''
        }
    },
    getters: {
        getUserName() {

        }
    },
   
    actions: {
        fetch() {
            request({
                url: '/user',
                method: 'GET'
            }).then((res) => {
                this.username = res.data.data.username;
                this.name = res.data.data.name;
                this.type = res.data.data.type;
                this.idn = res.data.data.idn;
                this.phone = res.data.data.phone;
                this.mileage_points=res.data.data.mileage_points;
                this.member=res.data.data.member;
                this.role=res.data.data.role;
            }).catch((err) => {
                console.log(err)
            })
        }
    }
})