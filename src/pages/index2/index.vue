<template>
  <div class="container" @click="clickHandle('test click', $event)">
      <div v-for="item in carinfo" :key=item.id>
      <div class="pbtm">发布时间：{{item.dateUpdate||item.dateAdd}}</div>
      <info :item="item.jsonData"></info>
    </div>
  </div>
</template>

<script>
import info from '@/components/info'
import vuex from '@/vuex'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    info
  },
  computed:{
    carinfo(){
      if(vuex.state.wechat.infolist.data){
      return vuex.state.wechat.infolist.data.filter(x=>x.jsonData.type==2||x.jsonData.type==3)}
    }
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
    // vuex.dispatch('getinfoList')

  },
   onShow() {
    console.log(112221);
    vuex.dispatch('getinfoList')
  }
}
</script>

<style scoped>
.pbtm{
  margin-bottom: 10rpx;
  color:orange;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}
.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
