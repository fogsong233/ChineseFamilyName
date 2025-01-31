## CN-Family-Name (中文亲戚计算器)
##### made with 💕 by [fogsong233](https://github.com/fogsong233)

### Usage
本库使用关系链的方式储存亲戚关系,使用`Kinship`类构建一个亲戚链条.
eg: 
```
new Kinship(Sex.MALE) // 我的性别
  .father()
  .daughter()
  .olderBrother()
  .youngerBrother()
  .son()
  .olderSister()
  .father()
```
我们将会自动shake和merge重复和冗余的连接,然后生成对于一个亲戚位置唯一的链条
你可以调用`Kinship`的`genPossibleStr()`来获取这个链条的中间产物(注意,因为如弟弟的姐姐等链条的歧义,获取到的唯一支付码可能有多个,代表不同的亲戚位置,弟弟的姐姐可能是我,妹妹,姐姐)
##### 唯一字符码
形如`S_M O_M D_M D_F`的字符吗,`A_B`代表下一个亲戚的坐标,由空格连接,其中`A`可能是
- `U`(Up, 父辈)
- `D`(Down, 子辈)
- `Y`(Younger, 弟弟妹妹)
- `O`(Older, 哥哥姐姐)
- `H`(Husband, 丈夫)
- `W`(Wife, 妻子)
`B`可能是`M`(Male, 男性), `F`(Female, 女性).其中没有`W_M`, `H_F`(因为丈夫妻子确定性别)
如`S_M D_M D_F`代表孙女,你可以调用`getName(strCode)`来获取`lookup`有的名字,如果没有找到可以指定`getName`的第二个参数`useDescWhenNotFound`(默认是真)为`true`来获取这个唯一字符码的描述,如`S_M O_M D_F D_F D_F D_F`返回`我的哥哥的女儿的女儿的女儿的女儿`.

##### 如何回退?
`Kinship`并不支持回退,因为他会在输入的时候简化路径,所以你需要自己记录输入链条,回退时重新构造`Kinship`对象获取名称.