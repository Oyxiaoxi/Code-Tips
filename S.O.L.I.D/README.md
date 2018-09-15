### 面向对象设计的SOLID原则
> S.O.L.I.D 是面向对象设计和编程 OOD&OOP 中几个重要编码原则 Programming Priciple 的首字母缩写。

|缩写|英文|中文|
|:--|:--:|:--|
|SRP|The Single Responsibility Principle|单一责任原则|
|OCP|The Open Closed Principle|开放封闭原则|
|LSP|The Liskov Substitution Principle|	里氏替换原则|
|DIP|The Dependency Inversion Principle|依赖倒置原则|
|ISP|The Interface Segregation Principle|接口分离原则|
|CRP|Composite Reuse Principle|合成复用原则|
|||及迪米特法则|

#### 单一职责原则 Single Responsibility Principle[SRP] ★★★★

##### 一个类只负责一个功能领域中的相应职责（只做一类事情）。或者说一个类仅能有一个引起它变化的原因。  
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

##### 单一职责原则 对类进行重构
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

#### 开闭原则 Open-Closed Principle[OCP] ★★★★★
> 「开闭原则」：对扩展开放、对修改关闭，即尽量在不修改原有代码的基础上进行扩展。要想系统满足「开闭原则」，需要对系统进行 抽象。  

```php
/**
 * 显示图表
 */
class ChartDisplay
{
    private $chart;

    /**
     * @param string $type 图标实现类型
     */
    public function __construct(string $type)
    {
        switch ($type) {
            case 'pie':
                $this->chart = new PieChart();
                break;

            case 'bar':
                $this->chart = new BarChart();
                break;

            default:
                $this->chart = new BarChart();
        }

        return $this;
    }

    /**
     * 显示图标 
     */
    public function display()
    {
        $this->chart->render();
    }
}

/**
 * 饼图
 */
class PieChart
{
    public function render()
    {
        echo 'Pie chart.';
    }
}

/**
 * 柱状图
 */
class BarChart
{
    public function render()
    {
        echo 'Bar chart.';
    }
}

$pie = new ChartDisplay('pie');
$pie->display(); //Pie chart.

$bar = new ChartDisplay('bar');
$bar->display(); //Bar chart.
```

+ ChartDisplay 每增加一种图表显示，都需要在构造函数中对代码进行修改。  
+ 声明一个 Chart 抽象类（或接口），再将接口传入 ChartDisplay 构造函数，实现面向接口编程。

```php

/**
* 图表接口
*/
interface ChartInterface
{
    /**
    * 绘制图表
    */
    public function render();
}

class PieChart implements ChartInterface
{
    public function render()
    {
        echo 'Pie chart.';
    }
}

class BarChart implements ChartInterface
{
    public function render()
    {
        echo 'Bar chart.';
    }
}

/**
 * 显示图表
 */
class ChartDisplay
{
    private $chart;

    /**
     * @param ChartInterface $chart
     */
    public function __construct(ChartInterface $chart)
    {
        $this->chart = $chart;
    }

    /**
     * 显示图标 
     */
    public function display()
    {
        $this->chart->render();
    }
}

$config = ['PieChart', 'BarChart'];

foreach ($config as $key => $chart) {
    $display = new ChartDisplay(new $chart());
    $display->display();
}
```

> ChartDisplay 通过接收 ChartInterface 接口作为构造函数参数，实现了图表显示不依赖于具体的实现类即 面向接口编程。在不修改源码的情况下，随时增加一个 LineChart 线状图表显示。具体图表实现可以从配置文件中读取。  

#### 里氏替换原则 Liskov Substitution Principle[LSP] ★★★★★
> 在软件中将一个基类对象替换成它的子类对象，程序将不会产生任何错误和异常，反过来则不成立。如果一个软件实体使用的是一个子类对象的话，那么它不一定能够使用基类对象。

+ 我们的系统用户类型分为：普通用户 CommonCustomer 和 VIP 用户 VipCustomer ，当用户收到留言时需要给用户发送邮件通知。

```php
/**
 * 发送邮件
 */
class EmailSender
{
    /**
     * 发送邮件给普通用户
     *
     * @param CommonCustomer $customer
     * @return void
     */
    public function sendToCommonCustomer(CommonCustomer $customer)
    {
        printf("Send email to %s[%s]", $customer->getName(), $customer->getEmail());
    }

    /**
     * 发送邮件给 VIP 用户
     * 
     * @param VipCustomer $vip
     * @return void
     */
    public function sendToVipCustomer(VipCustomer $vip)
    {
        printf("Send email to %s[%s]", $vip->getName(), $vip->getEmail());
    }    
}

/**
 * 普通用户
 */
class CommonCustomer
{
    private $name;
    private $email;

    public function __construct(string $name, string $email)
    {
        $this->name = $name;
        $this->email = $email;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getEmail()
    {
        return $this->email;
    }
}

/**
 * Vip 用户
 */
class VipCustomer
{
    private $name;
    private $email;

    public function __construct(string $name, string $email)
    {
        $this->name = $name;
        $this->email = $email;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getEmail()
    {
        return $this->email;
    }
}

$customer = new CommonCustomer("oyxiaoxi", "xxxx@126.com");
$vip = new VipCustomer("vip", "xxxx@126.com");

$sender = new EmailSender();
$sender->sendToCommonCustomer($customer);// Send email to xxxx@126.com]
$sender->sendToVipCustomer($vip);// Send email to vip[xxx@126.com]
```

+ 在 EmailSender 类中的 send* 方法中使用类型提示功能，对接收参数进行限制。所以如果有多个用户类型可能就需要实现多个 send 方法才行。
+ 依据 里氏替换原则 我们知道，能够接收父类的地方 一定 能够接收子类作为参数。所以我们仅需定义 send 方法来接收父类即可实现不同类型用户的邮件发送功能

```php
/**
 * 发送邮件
 */
class EmailSender
{
    /**
     * 发送邮件给普通用户
     *
     * @param CommonCustomer $customer
     * @return void
     */
    public function send(Customer $customer)
    {
        printf("Send email to %s[%s]", $customer->getName(), $customer->getEmail());
    }
}

/**
 * 用户抽象类
 */
abstract class Customer
{
    private $name;
    private $email;

    public function __construct(string $name, string $email)
    {
        $this->name = $name;
        $this->email = $email;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getEmail()
    {
        return $this->email;
    }

}

/**
 * 普通用户
 */
class CommonCustomer extends Customer
{
}

/**
 * Vip 用户
 */
class VipCustomer extends Customer
{
}

$customer = new CommonCustomer("Oyxiaoxi", "xxxx@126.com");
$vip = new VipCustomer("vip", "xxxx@126.com");

$sender = new EmailSender();
$sender->send($customer);// Send email to [xxxx@126.com]
$sender->send($vip);// Send email to vip[xxxx@126.com]
```

+ 修改后的 send 方法接收 Customer 抽象类作为参数，到实际运行时传入具体实现类就可以轻松扩展需求，再多客户类型也不用担心了。

#### 依赖倒置原则 Dependence Inversion Principle[DIP] ★★★★★

> 依赖倒转原则：抽象不应该依赖于细节，细节应当依赖于抽象。换言之，要针对接口编程，而不是针对实现编程。  
+ 如果想在模块中实现符合依赖倒置原则的设计，要将依赖的组件抽象成更高层的抽象类（接口）如前面的 Customer 类，然后通过采用 依赖注入（Dependency Injection） 的方式将具体实现注入到模块中。另外，就是要确保该原则的正确应用，实现类应当仅实现在抽象类或接口中声明的方法，否则可能造成无法调用到实现类新增方法的问题。  
+ 简单来说就是将系统的依赖有硬编码方式，转换成通过采用 设值注入（setter）、构造函数注入 和 接口注入 这三种方式设置到被依赖的系统中  

```php
# 用户在登录完成后需要通过缓存服务来缓存用户数据
class MemcachedCache
{
    public function set($key, $value)
    {
        printf ("%s for key %s has cached.", $key, json_encode($value));
    }
}

class User
{
    private $cache;

    /**
     * User 依赖于 MemcachedCache 服务（或者说组件）
     */
    public function __construct()
    {
        $this->cache = new MemcachedCache();
    }

    public function login()
    {
        $user = ['id' => 1, 'name' => 'Oyxiaoxi'];
        $this->cache->set('dp:uid:' . $user['id'], $user);
    }
}

$user = new User();
$user->login(); // dp:uid:1 for key {"id":1,"name":"Oyxiaoxi"} has cached.
```

+ 缓存依赖于 MemcachedCache 缓存服务。然而由于业务的需要，我们需要缓存服务有 Memacached 迁移到 Redis 服务。当然，现有代码中我们就无法在不修改 User 类的构造函数的情况下轻松完成缓存服务的迁移工作

```php
# 依赖注入
class Cache
{
    public function set($key, $value)
    {
        printf ("%s for key %s has cached.", $key, json_encode($value));
    }
}

class RedisCache extends Cache
{
}

class MemcachedCache extends Cache
{
}

class User
{
    private $cache;

    /**
     * 构造函数注入
     */
    public function __construct(Cache $cache)
    {
        $this->cache = $cache;
    }

    /**
     * 设值注入
     */
    public function setCache(Cache $cache)
    {
        $this->cache = $cache;
    }

    public function login()
    {
        $user = ['id' => 1, 'name' => 'Oyxiaoxi'];
        $this->cache->set('dp:uid:' . $user['id'], $user);
    }
}

// use MemcachedCache
$user =  new User(new MemcachedCache());
$user->login(); // dp:uid:1 for key {"id":1,"name":"Oyxiaoxi"} has cached.

// use RedisCache
$user->setCache(new RedisCache());
$user->login(); // dp:uid:1 for key {"id":1,"name":"Oyxiaoxi"} has cached.
```

#### 接口隔离原则 Interface Segregation Principle[ISP] ★★
> 接口隔离原则：使用多个专门的接口，而不使用单一的总接口，即客户端不应该依赖那些它不需要的接口。  

+ 通过 readUsers 方法读取用户数据
+ 可以使用 transformToXml 方法将用户记录转存为 XML 文件
+ 通过 createChart 和 displayChart 方法完成创建图表及显示
+ 还可以通过 createReport 和 displayReport 创建文字报表及现实

```php
# 抽象类
abstract class VipDataDisplay
{
    public function readUsers()
    {
        echo 'Read all users.';
    }

    public function transformToXml()
    {
        echo 'save user to xml file.';
    }

    public function createChart()
    {
        echo 'create user chart.';
    }

    public function displayChart()
    {
        echo 'display user chart.';
    }

    public function createReport()
    {
        echo 'create user report.';
    }

    public function displayReport()
    {
        echo 'display user report.';

    }
}

class CommonCustomerDataDisplay extends VipDataDisplay
{
}
```

+ 普通用户 CommonCustomerDataDisplay 不需要 Vip 用户这么复杂的展现形式，仅需要进行图表显示即可，但是如果继承 VipDataDisplay 类就意味着继承抽象类中所有方法

```php 
# VipDataDisplay 抽象类进行拆分，封装进不同的接口中
interface ReaderHandler
{
    public function readUsers();
}

interface XmlTransformer
{
    public function transformToXml();
}

interface ChartHandler
{
    public function createChart();

    public function displayChart();
}

interface ReportHandler
{
    public function createReport();

    public function displayReport();
}

class CommonCustomerDataDisplay implements ReaderHandler, ChartHandler
{
    public function readUsers()
    {
        echo 'Read all users.';
    }

    public function createReport()
    {
        echo 'create user report.';
    }

    public function displayReport()
    {
        echo 'display user report.';

    }
}
```

#### 合成复用原则 Composite Reuse Principle[CRP] ★★★★
> 合成复用原则：尽量使用对象组合，而不是继承来达到复用的目的。  

> 合成复用原则就是在一个新的对象里通过关联关系（包括组合和聚合）来使用一些已有的对象，使之成为新对象的一部分；新对象通过委派调用已有对象的方法达到复用功能的目的。简言之：复用时要尽量使用组合/聚合关系（关联关系） ，少用继承。  

```php
# 我们的系统有用日志 Logger 功能，然后我们实现了向控制台输入日志 SimpleLogger 和向文件写入日志 FileLogger 两种实现

abstract class Logger
{
    abstract public function write($log);
}

class SimpleLogger extends Logger
{
    public function write($log)
    {
        print((string) $log);
    }
}

class FileLogger extends Logger
{
    public function write($log)
    {
        file_put_contents('logger.log', (string) $log);
    }
}

$log = "This is a log.";

$sl = new SimpleLogger();
$sl->write($log);// This is a log.

$fl = new FileLogger();
$fl->write($log);
```

> 简单日志和文件日志能够按照我们预定的结果输出和写入文件。很快，我们的日志需求有了写增强，现在我们需要将日志同时向控制台和文件中写入。  
+ 重新定义一个子类去同时写入控制台和文件，但这似乎没有用上我们已经定义好的两个实现类：SimpleLogger 和 FileLogger  
+ 去继承其中的一个类，然后实现另外一个类的方法。比如继承 SimpleLogger，然后实现写入文件日志的方法；嗯，没办法 PHP 是单继承的语言 
+ 使用组合模式，将 SimpleLogger 和 FileLogger 聚合起来使用

```php
class AggregateLogger
{
    /**
     * 日志对象池
     */
    private $loggers = [];

    public function addLogger(Logger $logger)
    {
        $hash = spl_object_hash($logger);
        $this->loggers[$hash] = $logger;
    }

    public function write($log)
    {
        array_map(function ($logger) use ($log) {
            $logger->write($log);
        }, $this->loggers);
    }
}

$log = "This is a log.";

$aggregate = new AggregateLogger();

$aggregate->addLogger(new SimpleLogger());// 加入简单日志 SimpleLogger
$aggregate->addLogger(new FileLogger());// 键入文件日志 FileLogger

$aggregate->write($log);
```