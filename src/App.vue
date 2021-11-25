<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss">
#app {
  overflow: auto;
  width: 100vw;
  height: 100vh;
}
.el-message {
  min-width: 260px !important;
}
// 自定义头部进度条颜色
#nprogress .bar {
  background: #fe0202 !important; //自定义颜色
}
// loading 加载图标配置
.el-loading-spinner .circular {
  display: none;
}
.el-loading-spinner {
  /* 图片替换为你自定义的即可 */
  background: url('~@/assets/img/loading.gif') no-repeat;
  background-size: 100px 100px;
  width: 100px !important;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.my-popper {
  padding: 0 !important;
  margin: 28px !important;
}
.lyric {
  top: auto !important;
  bottom: 85px !important;
  left: 50% !important;
  transform: translateX(-50%);
  padding: 0 !important;
  margin: 0px !important;
  height: 45px !important;
  overflow: auto;
}
.volume {
  min-width: 38px !important;
  padding: 0 !important;
  border: 0 !important;
  margin: -45px 6px !important;
}
// 滚动条样式
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-track {
    --webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(255,0,0,0.4);
    --webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255,0,0,0.4);
}

</style>
