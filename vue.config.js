module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "productName": "all-in",
        "appId": "site.baoguo.all-in",
        "copyright": "Copyright © 2020 BaoGuo",
        "dmg": {
          "contents": [
            {
              "x": 410,
              "y": 150,
              "type": "link",
              "path": "/Applications"
            },
            {
              "x": 130,
              "y": 150,
              "type": "file"
            }
          ]
        },
        "directories": {
          "output": "build"
        },
        "mac": {
          "icon": "build/icons/live.icns"
        },
        "win": {
          "icon": "build/icons/live.ico"
        },
        "linux": {
          "icon": "build/icons/live.icns"
        }
      }
    }
  }
}