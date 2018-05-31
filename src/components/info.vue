<template>
    <div class="info-container">
        <div class="info-main">{{item.msg}}</div>
        <div class="wxid">{{item.wxid}}</div>
        <div class="tel">{{item.tel}}</div>
        <div class="name">{{item.name}}</div>
        <div>
            <button @click="call">拨打电话</button>
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
.info-container {
  margin-bottom: 20rpx;
  border: 1rpx dashed green;
  box-sizing: border-box;
}
</style>
