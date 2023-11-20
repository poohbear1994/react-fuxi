# 简介

这是一个基于React18函数式组件 + TS + Redux的Rect hook复习项目，主要完成的是一个低代码编辑器的基本操作 + 闭环

## 页面的整体大概如下

- 我的问卷页
<img alt="我的问卷" src="https://raw.githubusercontent.com/poohbear1994/react-fuxi/master/readme-img/myQuestion.jpg"></img>
- 编辑器
<img alt="编辑器" src="https://raw.githubusercontent.com/poohbear1994/react-fuxi/master/readme-img/editor.jpg"></img>

- 统计
<img alt="统计" src="https://raw.githubusercontent.com/poohbear1994/react-fuxi/master/readme-img/stat.jpg"></img>

- 回收站
<img alt="回收站" src="https://raw.githubusercontent.com/poohbear1994/react-fuxi/master/readme-img/trash.jpg"></img>

## 编辑器完成的功能
组件库、图层、画布、页面设置、组件属性设置5个部分。
支持页面设置、图层设置、拖拽、隐藏/显示、锁定/解锁、赋值/粘贴、上移、下移、撤销、回退等功能。

## 抽成8个hook
1. 快捷键绑定book
2. 从redux获取选定组件数据
3. 从redux获取页面设置数据
4. 从redux获取用户信息数据
5. 网络加载问卷详情数据
6. 网络加载问卷列表数据
7. 网络记载用户信息数据
8. 页面导航

## 难点-组件库数据结构设计
```js
- 单个组件文件夹
    | - 组件本体
    | - 组件的属性设置组件
    | - 组件的统计组件
    | - 组件的数据接口
    | - 组件单元测试
    | - 组件入口文件
```

最后使用一个文件集成所有组件，方便拓展的同时，提供外界引用入口

## 运行
如果需要运行该项目，还需要配合(后端接口模拟项目)[https://github.com/poohbear1994/wenjuan-mock]