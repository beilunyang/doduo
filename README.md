# doduo

## 简介
一套轻量级的脚手架 CLI 工具集- 轻量级yeoman

## 安装

```bash
# 全局安装cli
npm i -g @doduo/cli
```

## 使用
```
Usage: duo [options] [command]

轻量级脚手架CLI工具

Options:
  -v, --version         显示doduo版本号
  -l, --list
  -h, --help            显示帮助信息

Commands:
  list                  显示所有本地已安装的生成器
  create [projectName]  创建新项目
  install [repo]        安装生成器
  publish               发布项目
  help [command]        display help for command
```

## 生成器
目前仅提供了react生成器
```bash
duo install @doduo/generator-react
```

