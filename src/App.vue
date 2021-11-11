<template>
  <div id="app">
    <router-view />
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
  // top: 547px !important;
  // left: 525px !important;
  border: 0 !important;
  margin: -45px 6px !important;
  // margin: 0px !important;
}
</style>
