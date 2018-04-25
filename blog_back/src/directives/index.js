import Vue from "vue"
var focus={
  componentUpdated(el,binding){
    var {value,msg,reg,request,state}=binding.value
    //清空提示p标签
    let clearP=()=>{
      let $p=el.parentNode.getElementsByTagName("p")[0]
      if($p!=undefined){
        el.parentNode.removeChild($p)
      }
    }
    // 检测value是否为空
    let testNull=()=>{
      if(value!=""&&value!=undefined&&value!=null){
        testHandle()
      }else{
        testRequest()
      }
    }
    // 检测是否为必填项
    let testRequest=()=>{
      if(request){
        clearP()
        let $p=document.createElement("p")
        $p.setAttribute("class","p")
        $p.innerHTML="此项不能为空"
        el.parentNode.appendChild($p)
      }else{
        clearP()
      }
    }
    // 正则校验
    let testHandle=()=>{
      clearP()
      if(!reg.test(value)){
        // el.parentNode
        let $p=document.createElement("p")
        $p.setAttribute("class","p")
        $p.innerHTML=msg
        el.parentNode.appendChild($p)
      }
    }
    if(state){
      testNull()
    }
    
      
  }
}

Vue.directive("focus",focus)