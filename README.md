# all-in
- 一个跨平台，聚合了多个直播平台视频的App。
- 目前聚合了虎牙、斗鱼、企鹅电竞、CC直播、哔哩哔哩、快手。
- 使用vue + electron进行开发

## 自行编译App

```sh
# 切换到源码目录

# 使用yarn
yarn install
yarn electron:build

# 使用npm
npm install
npm run electron:build

# 生成文件在build目录
```

## BUG

- 暂时未开发搜索功能
- 默认播放视频时，选择最高清晰度。如需要修改，请自行修改代码。
- 其他

## TODO

- 添加搜索功能
- 切换清晰度功能
- 加入更多平台
- 弹幕功能
- 其他

## 说明

- 本项目仅作为技术研究，不做盈利。
- 如有侵权，请联系，将停止项目。
