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

#### findLastIndex
> 返回提供的函数返回一个真值的最后一个元素的索引。
```php
function findLastIndex($items, $func)
{
    $keys = array_keys(array_filter($items, $func));

    return array_pop($keys);
}
```

##### Examples
```php
findLastIndex([1, 2, 3, 4], function ($n) {
    return ($n % 2) === 1;
});
// 2
```

#### flatten
> 将阵列平坦化至一级深度。
```php
function flatten($items)
{
    $result = [];
    foreach ($items as $item) {
        if (!is_array($item)) {
            $result[] = $item;
        } else {
            $result = array_merge($result, array_values($item));
        }
    }

    return $result;
}
```

##### Examples
```php
flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
```

#### groupBy
> 根据给定的函数对数组的元素进行分组。
```php
function groupBy($items, $func)
{
    $group = [];
    foreach ($items as $item) {
        if ((!is_string($func) && is_callable($func)) || function_exists($func)) {
            $key = call_user_func($func, $item);
            $group[$key][] = $item;
        } elseif (is_object($item)) {
            $group[$item->{$func}][] = $item;
        } elseif (isset($item[$func])) {
            $group[$item[$func]][] = $item;
        }
    }

    return $group;
}
```

##### Examples
```php
groupBy(['one', 'two', 'three'], 'strlen') // [3 => ['one', 'two'], 5 => ['three']]
```

#### hasDuplicates
> 检查重复值的平面列表。如果存在重复值，则返回true;如果值全都是唯一的，则返回false。
```php
function hasDuplicates($items)
{
    return count($items) > count(array_unique($items));
}
```

##### Examples
```php
hasDuplicates([1, 2, 3, 4, 5, 5]); // true
```

#### head
> 返回列表的头部。
```php
function head($items)
{
    return reset($items);
}
```

##### Examples
```php
head([1, 2, 3]); // 1
```

#### last
> 返回数组中的最后一个元素。
```php
function last($items)
{
    return end($items);
}
```

##### Exmaples
```php 
last([1, 2, 3]); // 3
```

#### pluck
> 检索给定键的所有值
```php
function pluck($items, $key)
{
    return array_map( function($item) use ($key) {
        return is_object($item) ? $item->$key : $item[$key];
    }, $items);
}
```

##### Examples
```php
pluck([
    ['product_id' => 'prod-100', 'name' => 'Desk'],
    ['product_id' => 'prod-200', 'name' => 'Chair'],
], 'name');
// ['Desk', 'Chair']
```

#### pull
> 改变原始数组以过滤出指定的值。
```php
function pull(&$items, ...$params)
{
    $items = array_values(array_diff($items, $params));
    return $items;
}
```

##### Examples
```php
$items = ['a', 'b', 'c', 'a', 'b', 'c'];
pull($items, 'a', 'c'); // $items will be ['b', 'b']
```

#### reject
> 使用给定的回调过滤集合。
```php
function reject($items, $func)
{
    return array_values(array_diff($items, array_filter($items, $func)));
}
```

##### Examples
```php
reject(['Apple', 'Pear', 'Kiwi', 'Banana'], function ($item) {
    return strlen($item) > 4;
}); // ['Pear', 'Kiwi']
```

#### remove
> 从给定函数返回false的数组中移除元素。
```php
function remove($items, $func)
{
    $filtered = array_filter($items, $func);

    return array_diff_key($items, $filtered);
}
```

##### Examples
```php
remove([1, 2, 3, 4], function ($n) {
    return ($n % 2) === 0;
});
// [0 => 1, 2 => 3]
```

#### tail
> 返回数组中除第一个元素外的所有元素。
```php
function tail($items)
{
    return count($items) > 1 ? array_slice($items, 1) : $items;
}
```

##### Examples
```php
tail([1, 2, 3]); // [2, 3]
```

#### take
> 返回一个数组，其中有n个元素从开头删除。
```php
function take($items, $n = 1)
{
    return array_slice($items, 0, $n);
}
```

##### Examples
```php
take([1, 2, 3], 5); // [1, 2, 3]
take([1, 2, 3, 4, 5], 2); // [1, 2]
```

#### without
> 筛选出具有指定值之一的数组元素。
```php
function without($items, ...$params)
{
    return array_values(array_diff($items, $params));
}
```

##### Examples
```php
without([2, 1, 2, 3], 1, 2); // [3]
```

### Math

#### average
> 返回两个或更多数字的平均值
```php
function average(...$items)
{
    return count($items) === 0 ? 0 : array_sum($items) / count($items);
}
```

##### Examples
```php
average(1, 2, 3); // 2
```

#### factorial
> 返回两个或更多数字的平均值
```php
function factorial($n)
{
    if ($n <= 1) {
        return 1;
    }

    return $n * factorial($n - 1);
}
```

##### Examples
```php
factorial(6); // 720
```

#### fibonacci
> 生成一个包含斐波那契数列的数组，直到第n项。
```php
function fibonacci($n)
{
    $sequence = [0, 1];

    for ($i = 0; $i < $n - 2; $i++) {
        array_push($sequence, array_sum(array_slice($sequence, -2, 2, true)));
    }

    return $sequence;
}
```

##### Examples
```php
fibonacci(6); // [0, 1, 1, 2, 3, 5]
```