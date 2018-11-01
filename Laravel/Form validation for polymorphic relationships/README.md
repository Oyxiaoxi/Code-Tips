###                           Laravel 中多态关系的表单验证                        

![](/Volumes/WorkDate/Project/git/JavaScript-Tips/Laravel/Form validation for polymorphic relationships/images/pic01.png)

在使用 Laravel 开发应用的时候都会有评论模块吧，而且我们通常将该模块设计为多态关系：

| 数据库结构：     |
| ---------------- |
| id               |
| commentable_id   |
| commentable_type |
| body             |

那么遇到一个问题，如果写入数据呢？一般来讲有两种方式，而我们通常用的一种是从父模型使用关系写入，比如我们有一个 `App\Thread` 类，它里面对评论的关系是这样的：

```php
class Thread
{
    public function comments() {
        $this->morphToMany(Comment::class, 'commentable');
    }
}
```

写入评论时通常是这样的：

```php
$comment = new Comment(['body' => 'hello']);
$thread->comments()->save($comment);
```

或者用最直接的方式：

```php
$comment = Comment::create([
    'commentable_type' => 'App\\Thread',
    'commentable_id' => 1,
    'body' => 'Very Good!',
]);
```

不管哪一种，我们都少不了表单验证，而且无论使用任何一种我们都得需要传入两个关键参数：`类型`与`id`，那就涉及到一个问题，如何验证呢？

可能会写成这样：

```php
public function store(Request $request){
    $this->validate($request, [
       'commentable_type' => 'required|string',
       'commentable_id' => 'required|integer',
    ]);
    
    $model = resolve($request->get('commentable_type'))
                ->find($request->get('commentable_id'));
    
    if(!$model){
        abort(403, '目标对象不存在！');
    }
    
    $comment = new Comment(['body' => $request->get('body')]);
    
    return new CommentResource($model->comments()-save($comment));
}
```

感觉很复杂且不直观对吧？那么我们现在介绍一种拓展验证规则的写法：

首先我们在 AppServiceProvider 中注册一个验证规则 `poly_exists`：

```php
Validator::extend('poly_exists', function($attribute, $value, $parameters, $validator){
    if (!$objectType = array_get($validator->getData(), $parameters[0], false)) {
        return false;
    }
    
    try{
        return !empty(resolve($objectType)->find($value));
    } catch(\Exception $e) {
        return false;
    }
})
```

控制器里的写法简化成这样：

```php
public function store(Request $request){
    $this->validate($request, [
        'commentable_id' => 'required|poly_exists:commentable_type'
    ]);
    
    return new CommentResource(new Comment($request->all()));
}
```

是不是简单很多，而且这样验证规则还能重用在其它同类多态关系的地方！

规范写法，把所有的验证器都独立成一个类，放到 `App\Validators` 空间下，比如上面的关系验证我们可以叫做 `App\Validators\PolyExistsValidator` ：

```php
<?php

namespace App\Validators;

/**
 * Class PolyExistsValidator
 */
class PolyExistsValidator
{
    public function validate($attribute, $value, $parameters, $validator)
    {
        if (!$objectType = array_get($validator->getData(), $parameters[0], false)) {
            return false;
        }

        try {
            return !empty(resolve($objectType)->find($value));
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return false;
        }
    }
}
```

然后我们在 `AppServiceProvider ` 中添加一个属性 `$validators` 并且添加一个方法 `registerValidators`：

```php
protected $validators = [
  	'poly_exists' => \App\Validators\PolyExistsValidator::class,  
];

/**
 * Register validators.
 */
protected function registerValidators()
{
    foreach ($this->validators as $rule => $validator) {
        Validator::extend($rule, "{$validator}@validate");
    }
}

public function boot()
{
    $this->registerValidators();
}

```

在 boot 方法中我们统一注册了`$validators`里的验证规则，这样一来，添加删除一个规则都会科学清晰很多了。