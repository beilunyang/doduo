### 开发配置须知

为保证云构建的正常运行，本项目需要做如下配置：

1. 无论是简单的复制，还是 webpack 构建，请保证项目是通过 `npm run build` 命令进行构建
2. 保证构建产物输出到项目根目录的 `build` 文件夹中
3. 保证 `build`  目录在 `.gitignore` 文件中，非特殊情况不允许提交构建产物到 git 版本库


### 项目目录示例

```
site-card
├── README.md           // 初始化项目后，请认真详细填写项目介绍、参与人、调试方法等
├── build               // 产物文件夹
├── node_modules
├── package.json
└── src                 // 源代码
```


