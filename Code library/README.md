# JavaScript Code library

## 1.字符串操作

### 1.1 去除字符串空格
```javascript
//去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
function trim(str,type){
    switch (type){
        case 1:return str.replace(/\s+/g,"");
        case 2:return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:return str.replace(/(^\s*)/g, "");
        case 4:return str.replace(/(\s*$)/g, "");
        default:return str;
    }
}
```

### 1.2 字母大小写切换
```javascript
/*type
1:首字母大写   
2：首页母小写
3：大小写转换
4：全部大写
5：全部小写
**/
//changeCase('asdasd',1)
//Asdasd
function changeCase(str,type)
{
    function ToggleCase(str) {
        var itemText = ""
        str.split("").forEach(
            function (item) {
                if (/^([a-z]+)/.test(item)) {
                    itemText += item.toUpperCase();
                }
                else if (/^([A-Z]+)/.test(item)) {
                    itemText += item.toLowerCase();
                }
                else{
                    itemText += item;
                }
            });
        return itemText;
    }

    switch (type) {
        case 1:
            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                return v1.toUpperCase() + v2.toLowerCase();
            });
        case 2:
            return str.replace(/^(\w)(\w+)/, function (v, v1, v2) {
                return v1.toLowerCase() + v2.toUpperCase();
            });
        case 3:
            return ToggleCase(str);
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}

# changeCase(大小写转换函数)修改
// 修改一个bug,当只有一个字符的时候
ecDo.ecDo.changeCase("a",3)
"a"
//处理后
ecDo.changeCase("a",3)
"A"
```

### 1.3 字符串循环复制
```javascript
// repeatStr(str->字符串, count->次数)
function repeatStr(str, count) {
    var text = '';
    for (var i = 0; i < count; i++) {
        text += str;
    }
    return text;
}
```

### 1.4 字符串替换
```javascript
// 字符串替换(字符串,要替换的字符,替换成什么)
function replaceAll(str,AFindText,ARepText){
　　　raRegExp = new RegExp(AFindText,"g");
　　　return str.replace(raRegExp,ARepText);
}
```

### 1.5 替换*
```javascript
// replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
function replaceStr(str, regArr, type,ARepText) {
    var regtext = '', Reg = null,replaceText=ARepText||'*';
    // replaceStr('18819322663',[3,5,3],0)
    // 188*****663
    // repeatStr是在上面定义过的（字符串循环复制），大家注意哦
    if (regArr.length === 3 && type === 0) {
        regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
        Reg = new RegExp(regtext);
        var replaceCount = repeatStr(replaceText, regArr[1]);
        return str.replace(Reg, '$1' + replaceCount + '$2')
    }
    // replaceStr('asdasdasdaa',[3,5,3],1)
    // ***asdas***
    else if (regArr.length === 3 && type === 1) {
        regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
        Reg = new RegExp(regtext);
        var replaceCount1 = repeatSte(replaceText, regArr[0]);
        var replaceCount2 = repeatSte(replaceText, regArr[2]);
        return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
    }
    // replaceStr('1asd88465asdwqe3',[5],0)
    // *****8465asdwqe3
    else if (regArr.length === 1 && type == 0) {
        regtext = '(^\\w{' + regArr[0] +  '})'
        Reg = new RegExp(regtext);
        var replaceCount = repeatSte(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
    // replaceStr('1asd88465asdwqe3',[5],1,'+')
    // "1asd88465as+++++"
    else if (regArr.length === 1 && type == 1) {
        regtext = '(\\w{' + regArr[0] +  '}$)'
        Reg = new RegExp(regtext);
        var replaceCount = repeatSte(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
}
```

### 1.6 检测字符串
```javascript
// checkType('165226226326','phone')
// false
function checkType (str, type) {
    switch (type) {
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
            return /^[0-9]$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        default :
            return true;
    }
}
```

### 1.7 检测密码强度
```javascript
// checkPwd('12asdASAD')
// 3(强度等级为3)
function checkPwd(str) {
    var nowLv = 0;
    if (str.length < 6) {
        return nowLv
    };
    if (/[0-9]/.test(str)) {
        nowLv++
    };
    if (/[a-z]/.test(str)) {
        nowLv++
    };
    if (/[A-Z]/.test(str)) {
        nowLv++
    };
    if (/[\.|-|_]/.test(str)) {
        nowLv++
    };
    return nowLv;
}
```

### 1.8 随机码
```javascript
// count取值范围0-36
// randomNumber(10)
// "2584316588472575"
// randomNumber(14)
// "9b405070dd00122640c192caab84537"
// Math.random().toString(36).substring(2);
// "83vhdx10rmjkyb9"
function randomNumber(count){
   return Math.random().toString(count).substring(2);
}
```

### 1.9 查找字符串
> 可能标题会有点误导，下面我就简单说明一个需求，在字符串'sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'中找出'blog'的出现次数。代码如下

```javascript
function countStr (str,strSplit){
    return str.split(strSplit).length-1
}
var strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
// countStr(strTest,'blog') 6 
```

## 2.数组操作

### 2.1 数组去重
```javascript
// ES6新增的Set数据结构，类似于数组，但是里面的元素都是唯一的 ，其构造函数可以接受一个数组作为参数
// let arr=[1,2,1,2,6,3,5,69,66,7,2,1,4,3,6,8,9663,8]
// let set = new Set(array);
// {1,2,6,3,5,69,66,7,4,8,9663}
// ES6中Array新增了一个静态方法from，可以把类似数组的对象转换为数组
// Array.from(set)
// [1,2,6,3,5,69,66,7,4,8,9663]
// 第一种
function removeRepeatArray(arr){
    return Array.from(new Set(arr))
}

// 第二种
function xyz(arr) {
  let a= [];
  arr.forEach((item,index) => {
    a.indexOf(item) ===-1 ? a.push(item) : ''
  })
  return a;
}
console.log(xyz([1,2,3,2,3]));
// [1, 2, 3]

// 第三种
function xyz() {
  let a= [];
//  Array.from(arguments[0]).forEach((item,index) => {
//    a.indexOf(item) ===-1 ? a.push(item) : ''
// })
//  Array.prototype  可以换成[]
Array.prototype.forEach.call(arguments[1], (item,index) => {
   a.indexOf(item) ===-1 ? a.push(item) : ''
})
  return a;
}
console.log(xyz([1,2,3,2,3],[2,2,1]));
//[1, 2, 3]

// 第四种
Array.prototype.uniq = function() {
  let a= [];
    this.forEach((item,index) => {
      a.indexOf(item) ===-1 ? a.push(item) : ''
    })
    return a;
}
console.log([1,2,1,3].uniq());
//[1, 2, 3]
```


### 2.2 数组顺序打乱
```javascript
function upsetArr(arr){
    return arr.sort(function(){ return Math.random() - 0.5});
}
```

### 2.3 数组最大值最小值
```javascript
// 主要是针对数字类型的数组
function maxArr(arr){
    return Math.max.apply(null,arr);
}
function minArr(arr){
    return Math.min.apply(null,arr);
}
```

### 2.4 数组求和，平均值
```javascript
// 这一块的封装，主要是针对数字类型的数组 求和
function sumArr(arr){
    var sumText=0;
    for(var i=0,len=arr.length;i<len;i++){
        sumText+=arr[i];
    }
    return sumText
}

// 数字数组求和
sumArr: function (arr) {
    // 以前写法
    // var sumText = 0;
    // for (var i = 0, len = arr.length; i < len; i++) {
       // sumText += arr[i];
    //}
    // return sumText
    // 现在写法
    return arr.reduce(function(pre,cur){return pre+cur})
}

// 平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活了！
function covArr(arr){
    var sumText=sumArr(arr);
    var covText=sumText/length;
    return covText
}

// 这个方法，完全是粗心大意写错了，但是现在改过来了！，直接使用就好
ecDo.covArr([1,2,3])
```

### 2.5 从数组中随机获取元素
```javascript
// randomOne([1,2,3,6,8,5,4,2,6])
function randomOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
```

### 2.6 返回数组（字符串）一个元素出现的次数
```javascript
// getEleCount('asd56+asdasdwqe','a')  3次
// getEleCount([1,2,3,4,5,66,77,22,55,22],22)  2次
function getEleCount (obj, ele) {
    var num = 0;
    for (var i = 0, len = obj.length; i < len; i++) {
        if (ele == obj[i]) {
            num++;
        }
    }
    return num;
}
```

### 2.7 返回数组（字符串）出现最多的几次元素和出现次数
```javascript
// arr, rank->长度，默认为数组长度，ranktype，排序方式，默认降序
/**
* getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])  默认返回所有元素出现的次数
* getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3)  传参（rank=3），只返回出现次数排序前三的
* getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],null,1) 传参（ranktype=1,rank=null），升序返回所有元素出现次数
* getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3,1) 传参（rank=3，ranktype=1），只返回出现次数排序（升序）前三的
**/
function getCount(arr, rank，ranktype){ 
    var obj = {}, k, arr1 = []
    // 记录每一元素出现的次数
    for (var i = 0, len = arr.length; i < len; i++) {
        k = arr[i];
        if (obj[k]) {
            obj[k]++;
        }
        else {
            obj[k] = 1;
        }
    }
    // 保存结果{el-'元素'，count-出现次数}
    for (var o in obj) {
        arr1.push({el: o, count: obj[o]});
    }
    // 排序（降序）
    arr1.sort(function (n1, n2) {
        return n2.count - n1.count
    });
    // 如果ranktype为1，则为升序，反转数组
    if(ranktype===1){
        arr1=arr1.reverse();
    }
    var rank1 = rank || arr1.length;
    return arr1.slice(0,rank1);
}
```

### 2.8 得到n1-n2下标的数组
```javascript
// getArrayNum([0,1,2,3,4,5,6,7,8,9],5,9)
// [5, 6, 7, 8, 9]
// getArrayNum([0,1,2,3,4,5,6,7,8,9],2) 不传第二个参数,默认返回从n1到数组结束的元素
// [2, 3, 4, 5, 6, 7, 8, 9]
function getArrayNum(arr,n1,n2){
    var arr1=[],len=n2||arr.length-1;
    for(var i=n1;i<=len;i++){
        arr1.push(arr[i])
    }
    return arr1;
}
```

### 2.9 筛选数组
```javascript
// 删除值为'val'的数组元素
// removeArrayForValue(['test','test1','test2','test','aaa'],'test','%')
// ["aaa"]   带有'test'的都删除
    
// removeArrayForValue(['test','test1','test2','test','aaa'],'test')
// ["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
function removeArrayForValue(arr,val,type){
    arr.filter(function(item){return type==='%'?item.indexOf(val)!==-1:item!==val})
}
```

### 2.10 获取对象数组某些项
```javascript
// 获取对象数组某些项
// var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
// getOptionArray(arr,'a,c')
// [{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
// 只获取某一项的值
// getOptionArray(arr,'a',1)
// getOptionArray(arr,'b',1)
// [2, 3, 9, 2, 5]
getOptionArray:function(arr, keys, type) {
    var newArr = []
    if (!keys) {
        return arr
    }
    //是否只是需要获取某一项的值
    if (type === 1) {
        for (var i = 0, len = arr.length; i < len; i++) {
            newArr.push(arr[i][keys])
        }
        return newArr;
    }
    var _keys = keys.split(','), newArrOne = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        newArrOne = {};
        for (var j = 0, len1 = _keys.length; j < len1; j++) {
            newArrOne[_keys[j]] = arr[i][_keys[j]]
        }
        newArr.push(newArrOne);
    }
    return newArr
}
```

### 2.11 排除数组某些项
```javascript
// 排除数组某些项
// var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
// filterOptionArray(arr,'a')
// [{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]
// filterOptionArray(arr,'a,c')
// [{b:2},{b:3},{b:9},{b:2},{b:5}]
filterOptionArray:function(arr, keys) {
    var newArr = []
    var _keys = keys.split(','), newArrOne = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        newArrOne = {};
        for (var key in arr[i]) {
            //如果key不存在排除keys里面,添加数据
            if (_keys.indexOf(key) === -1) {
                newArrOne[key] = arr[i][key];
            }
        }
        newArr.push(newArrOne);
    }
    return newArr
}
```

### 2.12 对象数组排序
```javascript
// 对象数组的排序
// var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
// arraySort(arr2,'a,b')  a是第一排序条件，b是第二排序条件
// [{a:1,b:2,c:9},{a:2,b:3,c:5},{a:4,b:2,c:5},{a:4,b:5,c:7},{a:5,b:9}]
arraySort: function (arr, sortText) {
    if (!sortText) {
        return arr
    }
    var _sortText = sortText.split(',').reverse(), _arr = arr.slice(0);
    for (var i = 0, len = _sortText.length; i < len; i++) {
        _arr.sort(function (n1, n2) {
            return n1[_sortText[i]] - n2[_sortText[i]]
        })
    }
    return _arr;
}
```



## 3. 基础DOM操作
```javascript
// 设置对象内容
jquery：$('#xxx').html('hello world');
现在：html(document.getElementById('xxx'),'hello world')
// 获取对象内容
jquery：$('#xxx').html();
现在：html(document.getElementById('xxx'))
```

### 3.1 检测对象是否有哪个类名
```javascript
function hasClass(obj,classStr){ 
    var arr=obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含 
    return (arr.indexOf(classStr)==-1)?false:true;
}
```

### 3.2 添加类名
```javascript
function addClass(obj,classStr){
    if (!this.hasClass(obj,classStr)){obj.className += " " + classStr};
}
```

### 3.3 删除类名
```javascript
function removeClass(obj,classStr){
    if (this.hasClass(obj,classStr)) {
        var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
        obj.className = obj.className.replace(reg, '');
    }
}
```

### 3.4 替换类名("被替换的类名","替换的类名")
```javascript
function replaceClass(obj,newName,oldName) {
    removeClass(obj,oldName);
    addClass(obj,newName);
}
```

### 3.5 获取兄弟节点
```javascript
function siblings(obj){
    var a=[]; // 定义一个数组，用来存o的兄弟元素 
    var p=obj.previousSibling; 
    while(p){ // 先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling 
        if(p.nodeType===1){ 
        a.push(p); 
        } 
        p=p.previousSibling // 最后把上一个节点赋给p 
    } 
    a.reverse() // 把顺序反转一下 这样元素的顺序就是按先后的了 
    var n=obj.nextSibling;//再取o的弟弟 
    while(n){ // 判断有没有下一个弟弟结点 n是nextSibling的意思 
        if(n.nodeType===1){ 
            a.push(n); 
        } 
        n=n.nextSibling; 
    }
    return a;
}

// 之前写法
ecDo.siblings(obj)
// 现在写法
// 返回所有兄弟节点
ecDo.siblings(obj)
// 返回兄弟节点且兄弟节点id为‘cur’
ecDo.siblings(obj,'#cur')
// 返回兄弟节点且兄弟节点class为‘cur’
ecDo.siblings(obj,'.cur')
// 返回兄弟节点且兄弟节点标签为a
ecDo.siblings(obj,'a')
```

### 3.6 设置样式
```javascript
function css(obj,json){
    for(var attr in json){
        obj.style[attr]=json[attr];
    }
}
```

### 3.7 设置文本内容
```javascript
function html(obj){
    if(arguments.length==0){
        return this.innerHTML;
    }
    else if(arguments.length==1){
        this.innerHTML=arguments[0];
    }
}
```

### 3.8 显示隐藏
```javascript
function show(obj){
    obj.style.display="";
}
function hide(obj){
    obj.style.display="none";
}
```

## 4. 其他操作

### 4.1 cookie
```javascript
// 设置cookie
function setCookie(name,value,iDay){
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+iDay);
    document.cookie=name+'='+value+';expires='+oDate;
}
// 获取cookie
function getCookie(name){
    var arr=document.cookie.split('; ');
    for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');
        if(arr2[0]==name)
        {
            return arr2[1];
        }
    }
    return '';
}
// 删除cookie
function removeCookie(name){
    setCookie(name,1,-1);
}
```

### 4.2 清除对象中值为空的属性
```javascript
// filterParams({a:"",b:null,c:"010",d:123})
// Object {c: "010", d: 123}
function filterParams(obj){
    let _newPar = {};
    for (let key in obj) {
        if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
            _newPar[key] = obj[key];
        }
    }
    return _newPar;
}
```

### 4.3 现金额大写转换函数
```javascript
// upDigit(168752632)
// "人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
// upDigit(1682)
// "人民币壹仟陆佰捌拾贰元整"
// upDigit(-1693)
// "欠人民币壹仟陆佰玖拾叁元整"
function upDigit(n)   
{  
    var fraction = ['角', '分','厘'];  
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];  
    var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];  
    var head = n < 0? '欠人民币': '人民币';  
    n = Math.abs(n);  
    var s = '';  
    for (var i = 0; i < fraction.length; i++)   
    {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, ''); 
    } 
    s = s || '整';  
    n = Math.floor(n);  
    for (var i = 0; i < unit[0].length && n > 0; i++)   
    {  
        var p = '';  
        for (var j = 0; j < unit[1].length && n > 0; j++)   
        {  
            p = digit[n % 10] + unit[1][j] + p; 
            n = Math.floor(n / 10);
        }
        //s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')+ unit[0][i] + s; 
        s = p+ unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

# upDigit（金额大写函数）

//处理前
ecDo.upDigit(999900000)
"人民币玖亿玖仟玖佰玖拾元整"
//处理后
ecDo.upDigit(999900000)
"人民币玖亿玖仟玖佰玖拾万元整" 
```

### 4.4 获取，设置url参数
```javascript
// 获取url参数
// getUrlPrmt('segmentfault.com/write?draftId=122000011938')
// Object{draftId: "122000011938"}
function getUrlPrmt(url) {
    url = url ? url : window.location.href;
    let _pa = url.substring(url.indexOf('?') + 1), _arrS = _pa.split('&'), _rs = {};
    for (let i = 0, _len = _arrS.length; i < _len; i++) {
        let pos = _arrS[i].indexOf('=');
        if (pos == -1) {
            continue;
        }
        let name = _arrS[i].substring(0, pos), value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
    }
    return _rs;
}

// 设置url参数
// setUrlPrmt({'a':1,'b':2})
// a=1&b=2
function setUrlPrmt(obj) {
    let _rs = [];
    for (let p in obj) {
        if (obj[p] != null && obj[p] != '') {
            _rs.push(p + '=' + obj[p])
        }
    }
    return _rs.join('&');
}
```

### 4.5 随机返回一个范围的数字
```javascript
function randomNumber(n1,n2){
    // randomNumber(5,10)
    // 返回5-10的随机整数，包括5，10
    if(arguments.length===2){
        return Math.round(n1+Math.random()*(n2-n1));
    }
    // randomNumber(10)
    // 返回0-10的随机整数，包括0，10
    else if(arguments.length===1){
        return Math.round(Math.random()*n1)
    }
    // randomNumber()
    // 返回0-255的随机整数，包括0，255
    else{
        return Math.round(Math.random()*255)
    }  
}
```

### 4.6 随进产生颜色
```javascript
function randomColor(){
    // randomNumber是上面定义的函数
    // 写法1
    return 'rgb(' + randomNumber(255) + ',' + randomNumber(255) + ',' + randomNumber(255) + ')';
    
    // 写法2
    return '#'+Math.random().toString(16).substring(2).substr(0,6);
    
    // 写法3
    var color='#';
    for(var i=0;i<6;i++){
        color+='0123456789abcdef'[randomNumber(15)];
    }
    return color;
}
```
> 这种写法，偶尔会有问题。大家得注意哦
> Math.floor(Math.random()*0xffffff).toString(16);

### 4.7 Date日期时间部分
```javascript
// 到某一个时间的倒计时
// getEndTime('2017/7/22 16:0:0')
// "剩余时间6天 2小时 28 分钟20 秒"
function getEndTime(endTime){
    var startDate=new Date();  // 开始时间，当前时间
    var endDate=new Date(endTime); // 结束时间，需传入时间参数
    var t=endDate.getTime()-startDate.getTime();  // 时间差的毫秒数
    var d=0,h=0,m=0,s=0;
    if(t>=0){
      d=Math.floor(t/1000/3600/24);
      h=Math.floor(t/1000/60/60%24);
      m=Math.floor(t/1000/60%60);
      s=Math.floor(t/1000%60);
    } 
    return "剩余时间"+d+"天 "+h+"小时 "+m+" 分钟"+s+" 秒";
}
```

### 4.8 适配rem
```javascript
function getFontSize(){
    var doc=document,win=window;
    var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        // 如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
        if(clientWidth>750){clientWidth=750}
        // 设置根元素font-size大小
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
    };
    // 屏幕大小改变，或者横竖屏切换时，触发函数
    win.addEventListener(resizeEvt, recalc, false);
    // 文档加载完成时，触发函数
    doc.addEventListener('DOMContentLoaded', recalc, false);
}
// 使用方式很简单，比如效果图上，有张图片。宽高都是100px;
// 样式写法就是
img{
    width:1rem;
    height:1rem;
}
// 这样的设置，比如在屏幕宽度大于等于750px设备上，1rem=100px；图片显示就是宽高都是100px
// 比如在iphone6(屏幕宽度：375)上，375/750*100=50px;就是1rem=50px;图片显示就是宽高都是50px;
```

## 5. 其他
### 随机码函数重命名
```javascript
// 又是粗心大意，以前这个方法名是randomNumber，和另一个函数重名了！现在命名如下，使用方式不变
// ecDo.randomWord(10)
// "644086665765861"
// ecDo.randomWord(36)
// "g4a0ne8ah5dgau8j58ka10pb9"
randomWord:function (count){
    return Math.random().toString(count).substring(2);
}
```

### 5.1 找出最长单词
```javascript
// longestWord('Find the Longest word in a String') 7
// longestWord('Find|the|Longest|word|in|a|String','|') 7
longestWord:function(str, splitType) {
    var _splitType = splitType || /\s+/g,
        _max = 0;
    var strArr = str.split(_splitType);
    strArr.forEach(function (item) {
        if (_max < item.length) {
            _max = item.length
        }
    })
    return _max;
}
```

### 5.2 句中单每个单词词首字母大写
```javascript
//句中单词首字母大写 (Title Case a Sentence)
//ecDo.titleCaseUp('this is a title')
//"This Is A Title"
titleCaseUp: function titleCaseUp(str, splitType) {
    var _splitType = splitType || /\s+/g;
    var strArr = str.split(_splitType),
        result = "";
    strArr.forEach(function (item) {
        if (_max < item.length) {
            result += this.changeCase(item, 1) + ' ';
        }
    })
    return this.trim(result, 4)
}
```

### 5.3 字符串过滤
```javascript
// 过滤字符串(html标签，表情，特殊字符，)
// 字符串，替换内容（special-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文），要替换成什么，默认'',保留哪些特殊字符
// 如果需要过滤多种字符，type参数使用','分割
// 如下栗子,意思就是过滤字符串的html标签，大写字母，中文，特殊字符，全部替换成*,但是保留特殊字符'%'，'?'，除了这两个，其他特殊字符全部清除
// var str='asd    654a大蠢sasdasdASDQWEXZC6d5#%^*^&*^%^&*$\\"\'#@!()*/-())_\'":"{}?<div></div><img src=""/>啊实打实大蠢猪自行车这些课程';
// ecDo.filterStr(str,'html,WORD,chinese,special','*','%?')
// "asd    654a**sasdasd*********6d5#%^*^&*^%^&*$\"'#@!()*/-())_'":"{}?*****************"
filterStr:function(str,type,restr,spstr){
    var typeArr=type.split(','),_str=str;
    for(var i=0,len=typeArr.length;i<len;i++){
        if(typeArr[i]==='special'){
        var pattern,regText='$()[]{}?\|^*+./\"\'+';
        if(spstr){
            var _spstr=spstr.split(""),_regText="[^0-9A-Za-z\\s";
            for(var i=0,len=_spstr.length;i<len;i++){
                if(regText.indexOf(_spstr[i])===-1){
                    _regText+=_spstr[i];
                }
                else{
                    _regText+='\\'+_spstr[i];
                }
            }
            _regText+=']'
            pattern = new RegExp(_regText,'g');
        }
        else{
            pattern = new RegExp("[^0-9A-Za-z\\s]",'g')
        }
    }
    var _restr=restr||'';
    switch(typeArr[i]){
        case 'special': _str=_str.replace(pattern,_restr);break;
        case 'html': _str=_str.replace(/<\/?[^>]*>/g, _restr);break;
        case 'emjoy': _str=_str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/g,_restr);break;
        case 'word': _str=_str.replace(/[a-z]/g,_restr);break;
        case 'WORD': _str=_str.replace(/[A-Z]/g,_restr);break;
        case 'number':_str= _str.replace(/[0-9]/g,_restr);break;
        case 'chinese': _str=_str.replace(/[\u4E00-\u9FA5]/g,_restr);break;
      }
    }
    return _str;
}
```

### 5.4 创建正则字符
```javascript
// 创建正则字符,一般是为搜索或者高亮操作
// createKeyExp(['我','谁'])
// '(我|谁)'
createKeyExp：function(strArr) {
    var str = "";
    for (var i = 0; i < strArr.length; i++) {
        if (i != strArr.length - 1) {
            str = str + strArr[i] + "|";
        } else {
            str = str + strArr[i];
        }
    }
    return "(" + str + ")";
}    
```

### 5.5 关键字加标签
```javascript
// 简单关键字加标签（多个关键词用空格隔开）
// ecDo.findKey('守侯我oaks接到了来自下次你离开快乐吉祥留在开城侯','守侯 开','i')
// "<i>守侯</i>我oaks接到了来自下次你离<i>开</i>快乐吉祥留在<i>开</i>城侯"
// 加完了标签，对i怎么设置样式就靠大家了！
findKey:function(str, key, el) {
    var arr = null,
        regStr = null,
        content = null,
        Reg = null,
        _el = el || 'span';
    arr = key.split(/\s+/);
    //alert(regStr); //    如：(前端|过来)
    regStr = this.createKeyExp(arr);
    content = str;
    //alert(Reg);//        /如：(前端|过来)/g
    Reg = new RegExp(regStr, "g");
    content = content;
    //过滤html标签 替换标签，往关键字前后加上标签
    return content.replace(/<\/?[^>]*>/g, '').replace(Reg, "<" + _el + ">$1</" + _el + ">");
}
```

### 5.6 封装AJAX
```javascript
/*
 * @param {string}obj.type http连接的方式，包括POST和GET两种方式
 * @param {string}obj.url 发送请求的url
 * @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}obj.data 发送的参数，格式为对象类型
 * @param {function}obj.success ajax发送并接收成功调用的回调函数
 * @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
 */
//  ecDo.ajax({
//      type:'get',
//      url:'xxx',
//      data:{
//          id:'111'
//      },
//      success:function(res){
//          console.log(res)
//      }
//  })
ajax: function (obj) {
    obj = obj || {};
    obj.type = obj.type.toUpperCase() || 'POST';
    obj.url = obj.url || '';
    obj.async = obj.async || true;
    obj.data = obj.data || null;
    obj.success = obj.success || function () {
        };
    obj.error= obj.error || function () {
        };
    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    var params = [];
    for (var key in obj.data) {
        params.push(key + '=' + obj.data[key]);
    }
    var postData = params.join('&');
    if (obj.type.toUpperCase() === 'POST') {
        xmlHttp.open(obj.type, obj.url, obj.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
    } else if (obj.type.toUpperCase() === 'GET') {
        xmlHttp.open(obj.type, obj.url + '?' + postData, obj.async);
        xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            obj.success(xmlHttp.responseText);
        } else {
            obj.error(xmlHttp.responseText);
        }
    };
}
```

### 5.7 数据类型判断
```javascript
// 数据类型判断
// istype([],'array')
// true
// istype([])
// '[object Array]'
istype:function(o, type) {
    //全部小写
    var _type = type.toLowerCase();
    switch (_type) {
        case 'string':
            return Object.prototype.toString.call(o) === '[object String]';
        case 'number':
            return Object.prototype.toString.call(o) === '[object Number]';
        case 'boolean':
            return Object.prototype.toString.call(o) === '[object Boolean]';
        case 'undefined':
            return Object.prototype.toString.call(o) === '[object Undefined]';
        case 'null':
            return Object.prototype.toString.call(o) === '[object Null]';
        case 'function':
            return Object.prototype.toString.call(o) === '[object Function]';
        case 'array':
            return Object.prototype.toString.call(o) === '[object Array]';
        case 'object':
            return Object.prototype.toString.call(o) === '[object Object]';
        case 'nan':
            return isNaN(o);
        case 'elements':
            return Object.prototype.toString.call(o).indexOf('HTML')!==-1
        default:
            return Object.prototype.toString.call(o)
    }
}
```

### 5.8 手机类型判断
```javascript
// 手机类型判断
// browserInfo('android')
// false（在浏览器iphone6模拟器的调试） 
browserInfo:function(type) {
    switch (type) {
        case 'android':
            return navigator.userAgent.toLowerCase().indexOf('android') !== -1
        case 'iphone':
            return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
        case 'ipad':
            return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1
        case 'weixin':
            return navigator.userAgent.toLowerCase().indexOf('MicroMessenger') !== -1
        default:
            return navigator.userAgent.toLowerCase()
    }
}
```

## 6. DOM操作
### 6.1 预加载图片
```javascript
// 图片没加载出来时用一张图片（loading图片）代替，一般和图片懒加载一起使用
aftLoadImg:function(obj, url, cb) {
    var oImg = new Image(),_this=this;
    oImg.src = url;
    oImg.onload = function () {
        obj.src = oImg.src;
        if (cb && _this.istype(cb, 'function')) {
            cb(obj);
        }
    }
}
```

### 6.2 图片滚动懒加载
```javascript
// 图片滚动懒加载
// @className {string} 要遍历图片的类名
// @num {number} 距离多少的时候开始加载 默认 0
// 比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载

// html代码
// <p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
// <p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
// <p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>....
// data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。
// 详细可以查看testLoadImg.html

//window.onload = function() {
//    ecDo.loadImg('load-img',100);
//    window.onscroll = function() {
//        ecDo.loadImg('load-img',100);
//        }
//}
loadImg:function(className, num) {
    var _className = className || 'ec-load-img', _num = num || 0,_this=this;
    var oImgLoad = document.getElementsByClassName(_className);
    for (var i = 0, len = oImgLoad.length; i < len; i++) {
        if (document.documentElement.clientHeight + document.body.scrollTop > oImgLoad[i].offsetTop - _num && !oImgLoad[i].isLoad) {
            //记录图片是否已经加载
            oImgLoad[i].isLoad = true;
            //设置过渡，当图片下来的时候有一个图片透明度变化
            oImgLoad[i].style.cssText = "transition: ''; opacity: 0;"
            if (oImgLoad[i].dataset) {
                this.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, function (o) {
                    setTimeout(function () {
                        if (o.isLoad) {
                            _this.removeClass(o, _className);
                            o.style.cssText = "";
                        }
                    }, 1000)
                });
            } else {
                this.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute("data-src"), function (o) {
                    setTimeout(function () {
                        if (o.isLoad) {
                            _this.removeClass(o, _className);
                            o.style.cssText = "";
                        }
                    }, 1000)
                });
            }
            (function (i) {
                setTimeout(function () {
                    oImgLoad[i].style.cssText = "transition:all 1s; opacity: 1;";
                }, 16)
            })(i);
        }
    }
}
```

