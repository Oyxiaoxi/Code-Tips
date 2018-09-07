### Hello World
>当才华还支持不起理想时，就应该静下心来好好学习了。

### UML 类图
**UML类图**是一种结构图，用于描述一个系统的静态结构。类图以反映类结构和类之间关系为目的，用以描述软件系统的结构，是一种静态建模方法。类图中的类，**与面向对象语言中的类的概念是对应的**。

#### 1. 类机构
> UML图中，使用长方形描述一个类的主要构成，长方形垂直地分为三层，以此放置类的名称、属性和方法。

| User |
|:----|
|+ $name: String|
|# $age|
|- $email|
|-------------------|
|+ getName():String|
|# getAge()|
|- getEmail|

+ 抽象类名用斜体字粗体，如 *User* ，接口则需在上方加上 <<interface>>
+ 属性和方法都需要标注可见性符号，**+代表public**，**#代表protected**，**-代表private**。
+ 冒号:表明属性的类型和方法的返回类型，如 +$name:string、+getName():string。 当然，类型说明并非必须。

#### 2. 类关系
> 类与类之间的关系主要有六种：继承、实现、组合、聚合、关联和依赖。

![类关系图](https://github.com/Oyxiaoxi/Code-Tips/blob/master/PHP-UML/images/arrow.png)

#### 3. 6种类关系
> **组合、聚合、关联**这三种类关系的代码结构一样，都是用属性来保存另一个类的引用，所以要通过内容间的关系来区别。

##### 3.1 继承
> 继承关系也称泛化关系（Generalization），用于描述父类与子类之间的关系。父类又称作基类，子类又称作派生类。  
> 继承关系中，子类继承父类的所有功能，父类所具有的属性、方法，子类应该都有。子类中除了与父类一致的信息以外，还包括额外的信息。

例如：公交车、出租车和小轿车都是汽车，他们都有名称，并且都能在路上行驶。
![](https://github.com/Oyxiaoxi/Code-Tips/blob/master/PHP-UML/images/realization.png)

```php
<?php

class Car {
    public $name;

    public function run()
    {
        return '在行驶中';
    }
}

class Bus extends Car
{
    public function __construct()
    {
        $this->name = '公交车';
    }
}

class Taxi extends Car
{
    public function __construct()
    {
        $this->name = '出租车';
    }
}

// 客户端代码
$line2 = new Bus;
echo $line2->name . $line2->run();
```

