# @shxnovel/rewrite

这是 [shxnovel](https://github.com/ShxNovel/shxNovel) 的上游项目，管线由两个部分组成
1. **core** 词法单元生成
2. **parser** 转译器

运行时的每个阶段都接受用户插件，允许使用 hook 进行代码扩展。    
开发者可以使用 Typescript 扩展 Interface，让用户获得类型提示、脚本编写补全等。

默认情况下，**core** 要求用户直接采用 TypeScript 生成词法单元，随后进入转译阶段。     
但也可以通过外部方法，自行生成词法单元，只要输入合法，就可以被 **parser** 接受。

这一项目关注如下任务：
* **core**
  1. 设计一个默认模式，以某种语法进行编写，生成词法单元；
  2. 产生什么形式的语法单位；
* **parser**
  1. 为每个语法单位 **生成或绑定** 对应的语法含义。
  2. 允许额外的合法性检测
  3. 中间代码优化

**core** 尽可能采用函数式编程的形式，产生词法单元。   
**parser** 采用面向对象编程的形式，进行语法含义的绑定。

## 教程与文档

WIP

## 开发

### 打包

使用 `npm run build` 进行打包。

`/src`   源代码  
`/dist`  构建产物   
`/types` 类型提示