## PHP-Tips
> 有用的PHP片段的集合，可以在短时间内理解。

### Array 

#### all
> 如果提供的函数对数组的所有元素返回true，则返回true，否则返回false。
```php
function all($items, $func){
    return count(array_filter($items, $func)) === count($items);
}
```

##### Examples
```php
all([2, 3, 4, 5], function ($item) {
    return $item > 1;
}); // true
```

#### any
> 如果提供的函数对数组中的至少一个元素返回true，则返回true，否则返回false。
```php
function any($items, $func)
{
    return count(array_filter($items, $func)) > 0;
}
```

##### Examples
```php
any([1, 2, 3, 4], function ($item) {
    return $item < 2;
}); // true
```

#### chunk
> 将数组分块成指定大小的较小数组。
```php
function chunk($items, $size) {
    return array_chunk($items, $size);
}
```

##### Examples
```php
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

#### deepFlatten
> 深度压扁阵列。
```php
function deepFlatten($items) {
    $result = [];
    foreach ($items as $item) {
        if (!is_array($item)) {
            $result[] = $item;
        } else {
            $result = array_merge($result, deepFlatten($item));
        }
    }

    return $result;
}
```

##### Examples
```php
deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]
```

#### drop
> 返回从左边删除n个元素的新数组
```php
function drop($items, $n = 1)
{
    return array_slice($items, $n);
}
```

##### Examples
```php
drop([1, 2, 3]); // [2,3]
drop([1, 2, 3], 2); // [3]
```

#### findLast
> 返回提供的函数返回真值的最后一个元素。
```php
function findLast($items, $func)
{
    $filteredItems = array_filter($items, $func);

    return array_pop($filteredItems);
}
```

##### Examples
```php
findLast([1, 2, 3, 4], function ($n) {
    return ($n % 2) === 1;
});
// 3
```
