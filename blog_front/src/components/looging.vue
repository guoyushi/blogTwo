<template>
    <div>
        加载中...
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {}
    },
    created() {
        this.axios.get('/api/front/all/getHead').then(data => {
          
            // console.log(this.datas)
            // for (let i in this.datas) {
            //     console.log(this.datas.oneData)
            // }
            this.getList( data.data.data)
        })
    },
    methods:{
        ...mapActions(['getList'])
    }
}
</script>

<style>

</style>
