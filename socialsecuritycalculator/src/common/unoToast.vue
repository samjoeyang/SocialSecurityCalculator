<template>
  <div class="pos" v-show="isShow">
    <div class="uno-toast ">
    <div class="uno-toast header">
      <slot name="header">信息提示</slot>
    </div>
    <div class="uno-toast main">
      <slot name="main"></slot>
    </div>
    <div class="uno-toast footer">
        <slot name="footer">确定</slot>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: {
    isShow: true
  },
  methods: {
    submit() {
      this.isShow = false
    },
  },
}
</script>
<style lang="scss">
.uno-toast {
  margin: 0;
  padding: 0 auto;
  min-height: 1.5em;
  width: 90%;
  box-shadow: #0003 0 0 10px 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.pos {
  width: 100%;
  position: absolute;
  z-index: 999;
  top: 30%;
  display: flex;
  justify-content: center;
  margin:0 auto;
}
.header {
//   margin-left: -10px;
//   margin-top: -10px;
  width: 93%;
  padding: 10px;
  border: 1px solid #aaa;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  background-color: #fff;
  font-weight: bolder;
  box-shadow: none;
}
.main {
  width: 93%;
  padding: 10px;
  border: 1px solid #aaa;
  border-top: none;
  border-bottom: none;
  background-color: #fff;
  box-shadow:none;
}
.footer {
  width: 93%;
  padding: 10px;
  border: 1px solid #aaa;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  background-color: #fff;
  text-align: center;
  font-weight: bolder;
  box-shadow:none;
}
</style>
