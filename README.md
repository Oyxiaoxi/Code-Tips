# JavaScript Tips

### 你觉得这段代码会输出什么结果呢？

```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(new Date, i);
    }, 1000);
}

console.log(new Date, i);

### Mon Mar 20 2017 10:26:48 GMT+0800 (CST) 5
```

如果我们约定，用箭头表示其前后的两次输出之间有 1 秒的时间间隔，而逗号表示其前后的两次输出之间的时间间隔可以忽略，代码实际运行的结果该如何描述？

#### 如果期望代码的输出变成：5 -> 0,1,2,3,4，该怎么改造代码？

```javascript
## 闭包
for (var i = 0; i < 5; i++) {
    (function(j) {  // j = i
        setTimeout(function() {
            console.log(new Date, j);
        }, 1000);
    })(i);
}

console.log(new Date, i);

## 按值传递
var output = function (i) {
    setTimeout(function() {
        console.log(new Date, i);
    }, 1000);
};

for (var i = 0; i < 5; i++) {
    output(i);  // 这里传过去的 i 值被复制了
}

console.log(new Date, i);

## 按值传递
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(new Date, i);
    }, 1000);
}

console.log(new Date, i);

### Mon Mar 20 2017 10:40:45 GMT+0800 (CST) 5 -> 0,1,2,3,4
```

#### 如果期望代码的输出变成 0 -> 1 -> 2 -> 3 -> 4 -> 5，并且要求原有的代码块中的循环和两处 console.log 不变，该怎么改造代码？


```javascript
## 简单粗暴
for (var i = 0; i < 5; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(new Date, j);
        }, 1000 * j));  // 这里修改 0~4 的定时器时间
    })(i);
}

setTimeout(function() { // 这里增加定时器，超时设置为 5 秒
    console.log(new Date, i);
}, 1000 * i));

## Promise
const tasks = []; // 这里存放异步操作的 Promise
const output = (i) => new Promise((resolve) => {
    setTimeout(() => {
        console.log(new Date, i);
        resolve();
    }, 1000 * i);
});

// 生成全部的异步操作
for (var i = 0; i < 5; i++) {
    tasks.push(output(i));
}

// 异步操作完成之后，输出最后的 i
Promise.all(tasks).then(() => {
    setTimeout(() => {
        console.log(new Date, i);
    }, 1000);
});

## ES2017
const sleep = (timeountMS) => new Promise((resolve) => {
    setTimeout(resolve, timeountMS);
});

(async () => {  // 声明即执行的 async 函数表达式
    for (var i = 0; i < 5; i++) {
        await sleep(1000);
        console.log(new Date, i);
    }

    await sleep(1000);
    console.log(new Date, i);
})();

### Mon Mar 20 2017 10:40:45 GMT+0800 (CST) 0 -> 1 -> 2 -> 3 -> 4 -> 5
```

## Safari的无痕浏览会禁掉本地存储，因此需要搞一个兼容性判断
```javascript
Data.localStorageEnabled = true;
-- Safari的无痕浏览会禁用localStorage
try{
    window.localStorage.trySetData = 1;
} catch(e) {
    Data.localStorageEnabled = false;
}

setLocalData: function(key, value) { 
    if (Data.localStorageEnabled) {
        window.localStorage[key] = value;
    }
    else {   
        util.setCookie("_L_" + key, value, 1000);
    }
}

-- 在设置本地数据的时候，需要判断一下是不是支持本地存储，如果是的话就用localStorage，否则改用cookie。
setLocalData: function(key, value) {
    if(Data.localStorageEnabled) {
        util.setLocalData = function(key, value){
            return window.localStorage[key];
        }
    } else {
        util.setLocalData = function(key, value){
            return util.getCookie("_L_" + key);
        }
    }
    return util.setLocalData(key, value);
}
```

### 看似简单，出错去出乎我的意外，纪录一下，为自己！！！
