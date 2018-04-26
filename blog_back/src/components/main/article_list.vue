<template>
  <div>
      这是文章列表
  </div>
</template>
<script>
    export default {
        data(){
            return {
                data:null
            }
        },
        created(){
            this.axios.get('/api/back/article/getArticleList').then(data=>{
                console.log(data)
            })
        }
    }
</script>
<style>

</style>
