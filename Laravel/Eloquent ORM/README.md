### 模型关联使用总结 
> 数据表经常要与其它表做关联，比如一篇博客文章可能有很多评论，或者一个订单会被关联到下单用户，Eloquent 让组织和处理这些关联关系变得简单，并且支持多种不同类型的关联关系：

- 一对一
- 一对多
- 多对多
- 远层一对多
- 多态关联
- 多对多的多态关联

#### 一对一
```php
$this->hasOne(关联模型的类名, 关联模型的外键, 当前模型的主键);
```

如（用户拥有的那个手机）：
```php
public function phone()
{
     return $this->hasOne(Phone::class, 'user_id', 'id');
}
```

#### 反向关联
```php
$this->belongsTo(关联模型的类名, 当前模型的外键, 当前模型的主键);
```

如（拥有这个手机的用户）：
```php
public function user()
{
     return $this->belongsTo(User::class, 'user_id', 'id');
}
```

#### 一对多
> 模型方法参数和一对一一致
```php
$this->hasMany(关联模型的类名, 关联模型的外键, 当前模型主键);
```

如（一篇文章拥有多次评论）：
```php
public function comments()
{
     return $this->hasMany(Comment::class, 'article_id', 'id');
}
```

#### 多对多
```php
$this->belongsToMany(关联的模型类名, 中间表表名, 当前模型在中间模型中的外键名称, 关联模型在中间模型的外键名称);
```

如（用户拥有的所有角色）：
```php
public function roles() {
    return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_id');
}
```

#### 远层一对多
```php
$this->hasManyThrough(最终访问的模型类名, 中间模型的类名,中间模型的外键名称, 最终模型的外键名称, 当前模型的主键);
```

如（一个国家有很多用户，用户又可以发布多篇文章，获取某国家所有用户发布的多有文章）：
```php
public function articles() {
    return $this->hasManyThrough(Article::class, User::class, 'country_id', 'user_id', 'id');
}
```

#### 多态关联
```php
$this->morphMany(中间模型类名, 中间表来源字段前缀, 中间模型类型字段, 中间模型来源字段, 当前模型的主键);
```

如（文章和用户都可以别点赞，根据点赞记录Follow获取来源）：
```bash
aticles
    id - integer
    title - string
 users
    id - integer
    name - string
follows
    id - integer
    source_id - integer
    source_type - string
```

```php
class Follow extends Model
{
    // 方式一
    public function source()
    {
        return $this->morphTo(); // 中间表前缀会使用模型方法名source，得到中间表类型字段source_type和中间表来源字段source_id
    }
    // 方式二
    public function comment()
    {
        return $this->morphTo('source'); // 即使模型方法名不正确，可以使用正确的中间表前缀source，同样得到正确结果
        // 和以下方式结果一致
        // return $this->morphTo('comment', 'source_type', 'source_id'); // 即使中间表前缀名称不正确，只要指定正确的中间表类型字段和中间表来源字段，同样可以得到正确的结果
    }
}
```