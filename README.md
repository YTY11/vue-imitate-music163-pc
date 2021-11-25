# vue-imitate-music163-pc

## 介绍
> 基于vue2.x 仿照网易云音乐pc端开发的 一款音乐项目 开发参考了[Vue-NeteaseCloud-WebMusicApp項目](https://gitee.com/fudaosheng/Vue-NeteaseCloud-WebMusicApp)
> * 主要使用了： Vue2.x，Vue-Router，Vuex，Axios, Element-ui
> * 音频播放使用了Audio 对象自定义了audioPlay播放组件目前还在完善中（问题较多）
> * 歌词滚动使用了lyric-parser 和 better-scroll组件还在完善中（问题较多）
> * 视频播放使用了vue-video-player组件
> * 全屏功能使用了screenfull组件

## 后端api
> 后端api使用的是NeteaseCloudMusicApi开源项目
> * [仓库地址](https://github.com/Binaryify/NeteaseCloudMusicApi.git) 
> * [api文档](https://binaryify.github.io/NeteaseCloudMusicApi)

## 已有功能(持续完善中...)
  > 1. 歌曲播放（完善中）
  > 2. MV播放
  > 3. 视频播放
  > 4. 登录（验证码，二维码，密码）
  > 5. 注册
  > 6. 交互功能开发中...
## 效果展示
登录界面
|![输入图片说明](https://gitee.com/yty1998/img/raw/master/vue-imitate-music163-pc-img/login1.png "屏幕截图.png") |![输入图片说明](https://gitee.com/yty1998/img/raw/master/vue-imitate-music163-pc-img/login2.png "屏幕截图.png")  |![输入图片说明](https://gitee.com/yty1998/img/raw/master/vue-imitate-music163-pc-img/login3.png "屏幕截图.png")|
|---|---|---|

发现音乐
|![输入图片说明](https://gitee.com/yty1998/img/raw/master/vue-imitate-music163-pc-img/one1.png "屏幕截图.png") |![输入图片说明](https://gitee.com/yty1998/img/raw/master/vue-imitate-music163-pc-img/one2.png "屏幕截图.png")  |
|---|---|

![输入图片说明](https://gitee.com/yty1998/img/raw/master/vue-imitate-music163-pc-img/one3.png "屏幕截图.png")  |![输入图片说明](https://gitee.com/yty1998/img/raw/master/vue-imitate-music163-pc-img/one4.png "屏幕截图.png") |
|---|---|

视频页面
![输入图片说明](https://gitee.com/yty1998/img/raw/master/vue-imitate-music163-pc-img/two1.png "屏幕截图.png")  |![输入图片说明](https://gitee.com/yty1998/img/raw/master/vue-imitate-music163-pc-img/电台.png "屏幕截图.png") |
|---|---|

|MV页面![输入图片说明](https://gitee.com/yty1998/img/raw/master/vue-imitate-music163-pc-img/mv.png "屏幕截图.png")  |电台页面  ![输入图片说明](https://gitee.com/yty1998/img/raw/master/vue-imitate-music163-pc-img/one4.png "屏幕截图.png") |
|---|---|

详情页面
|![输入图片说明](https://gitee.com/yty1998/img/raw/master/vue-imitate-music163-pc-img/歌单详情.png "屏幕截图.png") |![输入图片说明](https://gitee.com/yty1998/img/raw/master/vue-imitate-music163-pc-img/歌手详情.png "屏幕截图.png")  |![输入图片说明](https://gitee.com/yty1998/img/raw/master/vue-imitate-music163-pc-img/视频详情.png "屏幕截图.png")|
|---|---|---|

## 项目运行
### 1.代码克隆到本地
```
git clone https://gitee.com/yty1998/vue-imitate-music163-pc.git
```
### 2.项目初始化
```
npm install
```

### 3.启动
```
npm run serve
```

### 4.打包
```
npm run build
```




