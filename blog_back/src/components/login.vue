<template>
  <div class="load">
    <ul id="from">
      <li><h4 id="pleaselogin">请登陆</h4></li>
      <li>
					<input type="text" id="user" v-model.lazy="username.value"  placeholder="请输入用户名" v-focus="username" @blur="change(username)">
      </li>
      <li>
          <input type="password" id="psw" v-model.lazy="password.value" placeholder="请输入密码" v-focus="password" @blur="change(password)">
      </li>
      <el-button type="success" id="log" @click="submit">登陆</el-button>
    </ul>
  
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
			username:{
				value:"",
				reg:/^[a-zA-Z]{4,12}$/,
				msg:"您输入的用户名格式不对",
				state:false
			},
			password:{
				value:"",
				reg:/^[a-zA-Z0-9]{6,12}$/,
				msg:"您输入的密码格式不对",
				request:true,
				state:false
			}
    }
  },
  methods:{
    change(data){
			data.state=true
		},
    submit(){

			if(this.username.value&&this.password.value){
				this.axios.post("/api/back/user/login",{
					username:this.username.value,
					password:this.password.value
				}).then((data)=>{
				
					switch(data.data.code){
						case "1001":{
							 this.$message({
								message: '恭喜你，登录成功',
								type: 'success'
							});
							sessionStorage.setItem("userId",data.data.data.id)
							sessionStorage.setItem("userName",data.data.data.name)
							this.$router.push("/back/main")
						} break;
						default:{
							this.$message({
								message: data.data.msg,
								type: 'error'
							});
						}
					}
				})
			}else{
				alert("填写")
			}
			// if(username.value{

			// }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#from {
		width: 400px;
		height: 300px;
		border: 1px solid #ccc;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 10px;
	}

	h4 {
		font-weight: normal;
		text-align: center;
		font-size: 24px;
		padding: 10px 0;
		margin:0;
	}

	input {
		width: 80%;
		height: 40px;
		display: block;
		margin: 0 auto;
		border-radius: 15px;
		border: none;
		box-sizing: border-box;
		padding: 0 10px;
		outline: none;
		border:1px solid #ccc;
	}
	li{
		margin:15px;
	}
	#from .p {
		width: 70%;
		margin: 3px auto;
		height: 20px;
		line-height: 20px;
		color: #f00;
	}

	#log {
		width: 80%;
		display: block;
		margin: 20px auto;
		background:orange;
		border:0;
		outline: none;
	}

	#pleaselogin {
		padding: 20px 0;
	}

</style>
