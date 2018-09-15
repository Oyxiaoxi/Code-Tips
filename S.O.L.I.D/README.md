### 面向对象设计的SOLID原则
> S.O.L.I.D是面向对象设计和编程(OOD&OOP)中几个重要编码原则(Programming Priciple)的首字母缩写。

|缩写|英文|中文|解释|
|:--|:--:|:--|---|
|SRP|The Single Responsibility Principle|单一责任原则|当需要修改某个类的时候原因有且只有一个（THERE SHOULD NEVER BE MORE THAN ONE REASON FOR A CLASS TO CHANGE）。换句话说就是让一个类只做一种类型责任，当这个类需要承当其他类型的责任的时候，就需要分解这个类。 |
|OCP|The Open Closed Principle|开放封闭原则|软件实体应该是可扩展，而不可修改的。也就是说，对扩展是开放的，而对修改是封闭的。(最难理解)|
|LSP|The Liskov Substitution Principle|	里氏替换原则|(当一个子类的实例应该能够替换任何其超类的实例时，它们之间才具有is-A关系)|
|DIP|The Dependency Inversion Principle|依赖倒置原则|高层模块不应该依赖于低层模块，二者都应该依赖于抽象,抽象不应该依赖于细节，细节应该依赖于抽象 |
|ISP|The Interface Segregation Principle|接口分离原则|不能强迫用户去依赖那些他们不使用的接口。换句话说，使用多个专门的接口比使用单一的总接口总要好。|
|||合成复用原则||
|||及迪米特法则||

#### 单一职责原则 Single Responsibility Principle[SRP] ★★★★

+ 一个类只负责一个功能领域中的相应职责（只做一类事情）。或者说一个类仅能有一个引起它变化的原因。  
```php
/**
 * CustomerDataChart 客户图片处理
 */
class CustomerDataChart
{
    /**
    * 获取数据库连接
    */
    public function getConnection()
    {
    }

    /**
    * 查找所有客户信息
    */
    public function findCustomers()
    {
    }

    /**
    * 创建图表
    */
    public function createChart()
    {
    }

    /**
    * 显示图表
    */
    public function displayChart()
    {
    }
}
```
+ 建立数据库连接  
+ 查找客户  
+ 创建和显示图表  

> 此时，其它类若需要使用数据库连接，无法复用 CustomerDataChart；或者想要查找客户也无法实现复用。另外，修改数据库连接或修改图表显示方式都需要修改 CustomerDataChart 类。这个问题挺严重的，无论修改什么功能都需要多这个类进行编码。

+ 单一职责原则 对类进行重构
```php
/**
 * DB 类负责完成数据库连接操作
 */
class DB
{
    public function getConnection()
    {
    }
}

/**
 * Customer 类用于从数据库中查找客户记录
 */
class Customer
{
    private $db;

    public function __construct(DB $db)
    {
        $this->db = $db;
    }

    public function findCustomers()
    {
    }
}

class CustomerDataChart
{
    private $customer;

    public function __construct(Customer $customer)
    {
        $this->customer = $customer;
    }

    /**
    * 创建图表
    */
    public function createChart()
    {
    }

    /**
    * 显示图表
    */
    public function displayChart()
    {
    }
}
```

+ DB 类仅处理数据库连接的问题，挺提供 getConnection() 方法获取数据库连接；  
+ Customer 类完成操作 Customers 数据表的任务，这其中包括 CRUD 的方法；  
+ CustomerDataChart 实现创建和显示图表。  
