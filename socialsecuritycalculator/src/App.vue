<template>
  <div id="app" class="app">
    <div id="nav" class="nav">
      <router-link to="/">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACL0lEQVR4Xu2azUrDQBCAd9Km4MGD9Q0En0BBDx6aHowVX0iwP2kFX0is8dD04EFBn0DwDdSDB6Fps2WFlKVImY3J7oZMzpOZ3W9mZ2aXAVbxDyq+f0YAKAIqToCOQMUDgJIgHQE6AhkInNze7LhuvMcT2M7we+6/gMO/49h9f7y4/FJVrnwE2uH1HWO8o2pIjzyMJ/7VuYotJQDtcTBgjtNXMaBdNkmCSac/wNpFA/Dv+80Y6h9YxSblXD7fDc+CT8wa0AC8cHgEDJ5SpRzYFGNAlwxw1lqtjfHjyO89Y2yjAbTGo5bjsEgGEJ12PYyRomW8h1EkA0gS5k07XZSDCADWOxQBdAQoB1ASpCpAZZD6gFUjhC2fJuS0NEImNoa1SQB0tMJYb5iQ0xIB4jZIlyG6DdJ1mN4DTCS5dZtWPIiI9wKosT8fTPmCBekLTd5yAoY1AOTLkuwluSytP6z8V44AUARYdAQ2JUQ5B+QpZ80RMFkNrEiCBMAgASsiYFN9x7LJ0i9YkwM21XcsgCz9AgEoQx9QmQjAbpT6gDxISTqsqAI570lJHQHQMSDhhcMDYPCSusbyEZnDyO+9YsIIPSEiZgMb7hw1eIQxXKTMLK43sTODaABiwXbPCKZI1WYFlQD8QrB5VlBxRlDsRxmA+EnMDM6gts8T2CoylLG6weE/Db54w84GynozAcAurAxyBKAMXipyjRQBRdItg26KgDJ4qcg1UgQUSbcMuisfAUsXobZfpXENSAAAAABJRU5ErkJggg==" alt="" class="icon">
      </router-link>
      <router-link to="/settings">
        <img class="icon" src="data:image/png;base64,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" alt="">
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
})
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
  font-size: 1.025em;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  // background-color: white;
}

.nav {
  padding: 0.65em 0;
  z-index: 999;
  // min-height: 3em;
  // position: fixed;
  // bottom: 0;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: #dcdfe6 0 -5px 15px 5px;
  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 12px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

li {
  list-style: none;
}

input {
  width: 100%;
  height: 1.8em;
  border: none;
  color:  #2c3e50;
  font-weight: 100;
  font-size: 0.95em;
}
h2 {
  text-align: center;
  color:#42b983;
  font-size: 1.2em;
  font-weight: bolder;
  margin: 10px auto;
}
button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  min-width: 8em;
}
ul {
  width:100%;
  padding: 0 auto;
  li {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 4px;
    label {
      padding: 4px;
      font-size: 1em;
      text-align: left;
      white-space: nowrap;
      display: inline-block;
      text-align: justify;
      text-align-last: justify;
    }
    input {
      text-align: right;
    }
  }
  hr {
    border-top: 1px dotted #2c3e50;
    // border-top: 1px dashed #aaa;
    margin: 8px auto;
    width: 90%;
  }
}
.w24{
  width: 100%;
}
.w8 {
  width:33%;
}
.w12 {
  width: 50%;
}
.w16 {
  width: 67%;
}
.icon {
  width: 1.8em;
}
.success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}
.primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}
.danger {
  color: #fff;
  background-color: #fab6b6;
  border-color: #fab6b6;
}
</style>
