<template>
    <div class="info-container" :class="{bck:item.type==3}">
        <div class="info-main">{{item.msg}}</div>
        <!-- <div class="tel">{{item.tel}}</div> -->
        <div>
            <div class="telcon"><img @click="call"  src="../../static/tel.png"></div>
            <div class="name">【{{item.author}}】</div>
        </div>
    </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    call() {
      wx.makePhoneCall({
        phoneNumber: this.item.tel?this.item.tel:"00000" //仅为示例，并非真实的电话号码
      });
    }
  }
};
</script>

<style>
.bck{
  background-color:teal;
}
.name{
  float: right;
}
.info-container {
  margin-bottom: 20rpx;
  box-sizing: border-box;
  overflow: auto;
  border-bottom: 1rpx dashed green;
}
img{
  width: 60rpx;
  height: 60rpx;
}
.telcon{
  float: left;
}
</style>
