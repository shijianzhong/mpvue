<template>
  <div class='mainwrap'>
    <div class="mainwrap_top">
      <button type="primary" :size="primarySize" @tap="bindtap"> 发布 </button>
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
    };
  },
  methods: {
    phoneNo(e){
      this.phoneno =e.mp.detail.value;
    },
    typechange(e) {
      this.index = e.mp.detail.value;
    },
    bindtap() {
      console.log(this.textvalue.trim())
      console.log(this.phoneno.trim())
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
      let postdata = { content: JSON.stringify(contet)};
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
              this.userInfo = res.userInfo;
            }
          });
        }
      });
    }
  },
  created() {
    this.getUserInfo();
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
