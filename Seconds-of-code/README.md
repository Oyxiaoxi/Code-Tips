## 30-seconds-of-code
>Curated collection of useful JavaScript snippets that you can understand in 30 seconds or less.

### CDN links
>+[ES2017 Full (UMD)] (https://unpkg.com/30-seconds-of-code)
>+[ES5 Minified (UMD)] (https://unpkg.com/30-seconds-of-code/dist/_30s.es5.min.js)

### Anagrams of string（带有重复项）
> 使用递归。对于给定字符串中的每个字母，为字母创建字谜。使用map（）将字母与每部分字谜组合，然后使用reduce（）将所有字谜组合到一个数组中，最基本情况是字符串长度等于2或1。

```javascript
const anagrams = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str.split('').reduce((acc, letter, i) => acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), []);
};

// anagrams('abc') -> ['abc','acb','bac','bca','cab','cba']
```

### 数组平均数
> 使用reduce（）将每个值添加到累加器，初始值为0，总和除以数组长度

```javascript
const average = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;

// average([1,2,3]) -> 2
```