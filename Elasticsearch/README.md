### Elasticsearch
> Elasticsearch 是一个分布式的搜索和分析引擎，可以用于全文检索、结构化检索和分析，并能将这三者结合起来。Elasticsearch 基于 Lucene 开发，是 Lucene 的封装，提供了 REST API 的操作接口，开箱即用。现在是使用最广的开源搜索引擎之一，Wikipedia、Stack Overflow、GitHub 等都基于 Elasticsearch 来构建他们的搜索引擎。

#### start
```bash
# 启动
sudo systemctl restart elasticsearch.service

# 测试启动，会有 1-2 分钟的延迟
curl http://127.0.0.1:9200/

# 默认安装的 中文分词插件
sudo /usr/share/elasticsearch/bin/elasticsearch-plugin list

# 关闭
systemctl disable elasticsearch.service
```

#### 1. Elasticsearch 的基础概念
> Elasticsearch 本质上是一个数据库，但并不是 Mysql 这种关系型数据库，查询语言也不是 SQL，而且 Elasticsearch 自己的一套查询语言。

|Mysql|Elasticsearch|
|:----|:------------|
|数据库（Database）|索引（Index）|
|表（Table）|类型（Type）|
|记录（Row）|文档（Document）|
|字段（Column）|字段（Fields）|

> 6.x 版本的文档建议一个索引（Index）中只放一个类型（Type），可以简单理解为一个数据库中只包含一个表。这是因为在 Elasticsearch 的底层实现中，假如我们在 Type A 中定义了一个名为 status 的 integer 类型字段，在同一个 Index 下的另一个 Type B 如果也有 status 字段，那么 Type B 的 status 字段的类型也必须为 integer，否则 Type B 都无法被创建。

#### 2. 一些基础操作

##### 创建索引
```bash 
# 创建一个名为 test_index 的索引
curl -XPUT http://localhost:9200/test_index

# 查看刚刚建立的索引
curl http://localhost:9200/test_index  

# 返回结果
{"test_index":{"aliases":{},"mappings":{"_doc":{"properties":{"description":{"type":"text","analyzer":"ik_smart"},"price":{"type":"scaled_float","scaling_factor":100.0},"title":{"type":"text","analyzer":"ik_smart"}}}},"settings":{"index":{"creation_date":"1537668662297","number_of_shards":"5","number_of_replicas":"1","uuid":"M209bY1fRhWvLStkZyfUZA","version":{"created":"6040099"},"provided_name":"test_index"}}}}

# 在 Elasticsearch 的返回中如果包含了 "acknowledged" : true, 则代表请求成功。

# 格式化一下
curl http://localhost:9200/test_index?pretty

{
  "test_index" : {
    "aliases" : { },
    "mappings" : { },
    "settings" : {
      "index" : {
        "creation_date" : "1537668662297",
        "number_of_shards" : "5",
        "number_of_replicas" : "1",
        "uuid" : "M209bY1fRhWvLStkZyfUZA",
        "version" : {
          "created" : "6040099"
        },
        "provided_name" : "test_index"
      }
    }
  }
}
```

##### 创建类型
```bash
curl -H'Content-Type: application/json' -XPUT http://localhost:9200/test_index/_mapping/_doc?pretty -d'{
  "properties": {
    "title": { "type": "text", "analyzer": "ik_smart" }, 
    "description": { "type": "text", "analyzer": "ik_smart" },
    "price": { "type": "scaled_float", "scaling_factor": 100 }
  }
}'
```

- URL 中 _doc 即为类型名称  
- 提交数据中的 properties 代表这个类型中各个字段的定义，其中 key 为字段名称，value 是字段的类型定义；  
- type 定义了字段的数据类型，常用的有 text / integer / date / boolean类型。  
- analyzer 是一个新的概念，这是告诉 Elasticsearch 应该用什么方式去给这个字段做分词，这里我们用了 ik_smart，是一个中文分词器  

```bash
# 返回结果
{
  "acknowledged" : true
}
```

#### 创建文档
```bash

curl -H'Content-Type: application/json' -XPUT http://localhost:9200/test_index/_doc/1?pretty -d'{
    "title": "iPhone X",
    "description": "新品到货",
    "price": 8848
}'

curl -H'Content-Type: application/json' -XPUT http://localhost:9200/test_index/_doc/2?pretty -d'{
    "title": "OPPO R15",
    "description": "新品到货",
    "price": 2000
}'
```

> Elasticsearch 的文档 ID 不是自增的，需要我们手动指定。

```bash
# ID-1 返回结果
{
  "_index" : "test_index",
  "_type" : "_doc",
  "_id" : "1",
  "_version" : 2,
  "result" : "updated",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 1,
  "_primary_term" : 1
}

# ID-2 返回结果
{
  "_index" : "test_index",
  "_type" : "_doc",
  "_id" : "2",
  "_version" : 2,
  "result" : "updated",
  "_shards" : {
    "total" : 2,
    "successful" : 1,
    "failed" : 0
  },
  "_seq_no" : 1,
  "_primary_term" : 1
}
```

#### 读取文档数据
```bash
curl http://localhost:9200/test_index/_doc/1?pretty

# 返回结果
{
  "_index" : "test_index",
  "_type" : "_doc",
  "_id" : "1",
  "_version" : 2,
  "found" : true,
  "_source" : {
    "title" : "iPhone X",
    "description" : "新品到货",
    "price" : 8848
  }
}
```

#### 简单搜索
```bash
curl -XPOST -H'Content-Type:application/json' http://localhost:9200/test_index/_doc/_search?pretty -d'
{
    "query" : { "match" : { "description" : "新品" }}
}'

# 返回结果
{
  "took" : 6,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 0.2876821,
    "hits" : [
      {
        "_index" : "test_index",
        "_type" : "_doc",
        "_id" : "2",
        "_score" : 0.2876821,
        "_source" : {
          "title" : "OPPO R15",
          "description" : "新品到货",
          "price" : 2000
        }
      },
      {
        "_index" : "test_index",
        "_type" : "_doc",
        "_id" : "1",
        "_score" : 0.2876821,
        "_source" : {
          "title" : "iPhone X",
          "description" : "新品到货",
          "price" : 8848
        }
      }
    ]
  }
}
```

> 有数据了，这是 ik_smart 分词器的作用，ik_smart 会把『新品到货』分词成『新品』和『到货』两个词，当我们用 match 来搜索时，Elasticsearch 就会拿搜索词在分词结果中寻找完全匹配的文档。

### 包引用
```bash
composer require elasticsearch/elasticsearch '~6.0'
```

#### 配置
```php
# config/database.php

'elasticsearch' => [
    // Elasticsearch 支持多台服务器负载均衡，因此这里是一个数组
    'hosts' => explode(',', env('ES_HOSTS')),
]

# .env
ES_HOSTS=localhost
```

#### 初始化
```php
# app/Providers/AppServiceProvider.php

use Elasticsearch\ClientBuilder as ESClientBuilder;

public function register() {
    // 注册一个名为 Elasticsearch 的单例
    $this->app->singleton('es', function () {
        // 从配置文件读取 Elasticsearch 服务器列表
        $builder = ESClientBuilder::create()->setHosts(config('database.elasticsearch.hosts'));
        // 如果是开发环境
        if (app()->environment() === 'local') {
            // 配置日志，Elasticsearch 的请求和返回数据将打印到日志文件中，方便我们调试
            $builder->setLogger(app('log')->getMonolog());
        }

        return $builder->build();
    });
}
```

#### 测试
```bash
php artisan tinker

# 测试
app('es')->info()

# 输出
[
    "name" => "zWcApYb",
    "cluster_name" => "elasticsearch",
    "cluster_uuid" => "qqZgNvONRMe4g1hHx-JuGA",
    "version" => [
    "number" => "6.4.0",
    "build_flavor" => "default",
    "build_type" => "deb",
    "build_hash" => "595516e",
    "build_date" => "2018-08-17T23:18:47.308994Z",
    "build_snapshot" => false,
    "lucene_version" => "7.4.0",
    "minimum_wire_compatibility_version" => "5.6.0",
    "minimum_index_compatibility_version" => "5.0.0",
    ],
    "tagline" => "You Know, for Search",
]

# 查看响应日志
less storage/logs/laravel.log

# shfit+g 最后一行，查看日志打印结果
[2018-09-23 14:30:03] local.DEBUG: Request Body [null]
[2018-09-23 14:30:03] local.INFO: Request Success: {"method":"GET","uri":"http://localhost:9200/","headers":{"Host":["localhost:9200"],"Content-Type":["application/json"],"Accept":["application/json"]},"HTTP code":200,"duration":0.00774}
[2018-09-23 14:30:03] local.DEBUG: Response [{"name":"zWcApYb","cluster_name":"elasticsearch","cluster_uuid":"qqZgNvONRMe4g1hHx-JuGA","version":{"number":"6.4.0","build_flavor":"default","build_type":"deb","build_hash":"595516e","build_date":"2018-08-17T23:18:47.308994Z","build_snapshot":false,"lucene_version":"7.4.0","minimum_wire_compatibility_version":"5.6.0","minimum_index_compatibility_version":"5.0.0"},"tagline":"You Know, for Search"}]

# 查看 ID 为 1 的商品
app('es')->get(['index' => 'test_index','type' => '_doc', 'id' => 1])

# 返回结果
[
    "_index" => "test_index",
    "_type" => "_doc",
    "_id" => "1",
    "_version" => 2,
    "found" => true,
    "_source" => [
    "title" => "iPhone X",
    "description" => "新品到货",
    "price" => 8848,
    ],
]
```