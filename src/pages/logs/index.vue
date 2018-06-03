<template>
  <div class='mainwrap'>
    <div class="mainwrap_top">
      <button v-if="usersetting"  open-type="getUserInfo" @getuserinfo="bindtap" :size="primarySize" type="primary">发布</button>
      <button v-else type="primary" :size="primarySize" @tap="bindtap"> 发布 </button>
      <picker class="dtpicker" :value="index" :range="array" @change="typechange">
        <view class="picker">
          类型选择：{{array[index]}}
        </view>
      </picker>
     <input @blur="phoneNo" class="weui-input" :value="phoneno" type="number" maxlength="11" placeholder="your phoneNo" />
    </div>
    <div class="mainwrap_bottom">
      <textarea class="textarea" @blur="txtblur" :value="textvalue" auto-height placeholder="here your message" />
    </div>
    
    <div style="text-align:center">如果发广告请赞助一毛钱</div>
    <div class="imgcon">
      <image style="width: 200px; height: 200px; background-color: #eeeeee;" :mode="mode" :src="imgsrc"></image></div>
  </div>
</template>

<script>
import { formatTime } from "@/utils/index";
import card from "@/components/card";
import vuex from '@/vuex'

export default {
  components: {
    card
  },
  computed:{
    carinfo(){
      if (vuex.state.wechat.infolist.data){
        return vuex.state.wechat.infolist.data
      }
    }
  },
  watch: {},
  data() {
    return {
      logs: [],
      array: ["车寻人", "人寻车", "other"],
      index: 0,
      primarySize: "mini",
      textvalue: "",
      ispub: false,
      userInfo: {},
      phoneno:'',
      imgsrc:'../../static/1.png',
      mode: 'aspectFit',
      usersetting:false,//用户是否授权
      username:''
    };
  },
  methods: {
    phoneNo(e){
      this.phoneno =e.mp.detail.value;
    },
    typechange(e) {
      this.index = e.mp.detail.value;
    },
    ishavethisperson(){
      var arrs=[];
      var _arrs=[];
      arrs = this.carinfo.filter(item=>item.jsonData.author==this.userInfo.nickName)
      _arrs = arrs.filter(item=>item.jsonData.type==Number(this.index)+1)
      return _arrs||arrs;
    },
    bindtap(e) {
      var id="";
      let postdata;
      if(this.usersetting){
        this.userInfo = e.mp.detail.userInfo;
      }
      if(this.ishavethisperson().length>0){
        id=this.ishavethisperson()[0].id;
      }
      if(this.textvalue.trim()==""||this.phoneno.trim()==""){
         wx.showToast({
            title: '怎么也得输入点信息吧',
            icon: 'loading',
            duration: 1000,
            mask:true
        })
        return
      }
      var contet = {
        type: Number(this.index)+1,
        author: this.userInfo?this.userInfo.nickName:"nm",
        wxid: 0,
        msg: this.textvalue,
        tel: this.phoneno
      };
      if(id==""){
        postdata = { content: JSON.stringify(contet)};
      }else{
        postdata = { content: JSON.stringify(contet),id:id};
      }
      vuex.dispatch("setinfo",postdata);
    },
    txtblur(e) {
      this.textvalue = e.mp.detail.value;
    },
    getUserInfo() {
      // 调用登录接
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              console.log(this.userInfo)
              this.userInfo = res.userInfo;
            }
          });
        }
      });
    },
    getUserSetting() {
      wx.getSetting({
      success: (res)=>{
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              this.userInfo = res.userInfo;
              this.usersetting=false;
            }
          })
        }
        else{
          this.usersetting = true;
        }
      }
    })
    }
  },
  created() {
    this.getUserInfo();
    this.getUserSetting();
  }
};
</script>

<style>
.weui-input{
  height: 10rpx;
  margin: 30rpx 0;
}
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
.dtpicker {
  background-color: thistle;
  margin-top: 20rpx;
}
.mainwrap_bottom {
  margin-top: 50rpx;
  background-color: whitesmoke;
}
.mainwrap_top {
  text-align: center;
}
.textarea {
  height: 100em;
}
.imgcon{
  text-align: center
}
</style>
