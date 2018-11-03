### Github 的 Restful HTTP API 设计分解 

#### 什么是 Restful

RESTful 是一种软件设计风格，由 [Roy Fielding](http://roy.gbiv.com/) 在他的 [论文](http://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm) 中提出，全称为 `Representational State Transfer`，直译为`表现层状态转移`，或许可以解释为`用 URL 定位资源，用 HTTP 动词描述操作`，不用太纠结于定义，接下来我们会详细讨论。

RESTful 风格的接口，目前来看，实现的最好的就是 [Github API](https://developer.github.com/v3/)，经常被效仿。接下来我们通过分析 Github API 来引出我们的 API 设计原则。

#### 为什么选择 Restful

我认为一套接口应该尽量满足以下几个原则：

- 安全可靠，高效，易扩展。
- 简单明了，可读性强，没有歧义。
- API 风格统一，调用规则，传入参数和返回数据有统一的标准。

我们当然可以根据自己的经验，或者参考知名公司的接口总结设计出一套满足要求的接口，但是每个人对接口的理解不同，设计出来的接口也会有所不同，接口的命名，请求参数的格式，响应的结果，错误响应的错误码，等等很多地方都会有不一样的实现。当你去寻求一种设计理念来帮助我们设计出满足要求的接口，一定会发现`RESTful`。

RESTful 的设计理念基于 HTTP 协议，因为 [Roy Fielding](http://roy.gbiv.com/) 就是 HTTP 协议（1.0版和1.1版）的主要设计者。它是一种设计风格，没有规定我们一定如何实现，但是为我们提供了很好的设计理念。风格的统一，使得我们不需要过多的解释，就能让使用者明白该如何使用，同时也会有很多现成的工具来帮助我们实现 RESTful 风格的接口。

#### Restful 设计原则

1. **HTTPS**

   HTTPS 为接口的安全提供了保障，可以有效防止通信被窃听和篡改。而且现在部署 HTTPS 的成本也越来越低，你可以通过 [cerbot](https://certbot.eff.org/) 等工具，方便快速的制作免费的安全证书，所以生产环境，请务必使用 HTTPS。

   > 另外注意，非 HTTPS 的 API 调用，不要重定向到 HTTPS，而要直接返回调用错误以禁止不安全的调用。

2. **域名**

   应当尽可能的将 API 与其主域名区分开，可以使用专用的域名，访问我们的 API，例如：

   ```bash
   https://api.larabbs.com 
   https://www.larabbs.com/api
   ```

3. **版本控制**

   随着业务的发展，需求的不断变化，API 的迭代是必然的，很可能当前版本正在使用，而我们就得开发甚至上线一个不兼容的新版本，为了让旧用户可以正常使用，为了保证开发的顺利进行，我们需要控制好 API 的版本。

   - 将版本号直接加入 URL 中

     ```bash
     https://api.larabbs.com/v1
     https://api.larabbs.com/v2
     ```

   - 使用 HTTP 请求头的 Accept 字段进行区分

     ```bash
     https://api.larabbs.com/
         Accept: application/prs.larabbs.v1+json
         Accept: application/prs.larabbs.v2+json
     ```

     Github Api 虽然默认使用了第一种方法，但是其实是推荐并实现了第二种方法的，我们同样也尽量使用第二种方式。

     ![](/Volumes/WorkDate/Project/git/JavaScript-Tips/Restful HTTP API /images/iVESOhNlvt.png)

4. **用 URL 定位资源**

   在 RESTful 的架构中，所有的一切都表示资源，每一个 URL 都代表着一种资源，资源应当是一个名词，而且大部分情况下是名词的复数，尽量不要在 URL 中出现动词。

   github 的 [例子](https://developer.github.com/v3/issues/comments/)：

   | Method | URL                                             | Descption                |
   | :----- | ----------------------------------------------- | ------------------------ |
   | GET    | /issues                                         | 列出所有的 issue         |
   | GET    | /orgs/:org/issues                               | 列出某个项目的 issue     |
   | GET    | /repos/:owner/:repo/issues/:number              | 获取某个项目的某个 issue |
   | POST   | /repos/:owner/:repo/issues                      | 为某个项目创建 issue     |
   | PATCH  | /repos/:owner/:repo/issues/:number              | 修改某个 issue           |
   | PUT    | /repos/:owner/:repo/issues/:number/lock         | 锁住某个 issue           |
   | DELETE | /repos/:owner/:repo/issues/comments/:comment_id | 删除某个 issue 的评论    |

   > 例子中冒号开始的代表变量

   在 github 的实现中，我们可以总结出：

   - 资源的设计可以嵌套，表明资源与资源之间的关系。
   - 大部分情况下我们访问的是某个`资源集合`，想得到`单个资源`可以通过资源的 id 或number 等唯一标识获取。
   - 某些情况下，资源会是单数形式，例如`某个项目某个 issue 的锁`，每个 issue 只会有一把锁，所以它是单数。

   错误的例子:

   | Method | URL                                                  |
   | ------ | ---------------------------------------------------- |
   | POST   | https://api.larabbs.com/createTopic                  |
   | GET    | https://api.larabbs.com/topic/show/1                 |
   | POST   | https://api.larabbs.com/topics/1/comments/create     |
   | POST   | https://api.larabbs.com/topics/1/comments/100/delete |

   正确的例子:

   | Method | URL                                           |
   | ------ | --------------------------------------------- |
   | POST   | https://api.larabbs.com/topics                |
   | GET    | https://api.larabbs.com/topics/1              |
   | POST   | https://api.larabbs.com/topics/1/comments     |
   | DELETE | https://api.larabbs.com/topics/1/comments/100 |

5. **用 HTTP 动词描述操作**

   HTTP 设计了很多动词，来表示不同的操作，RESTful 很好的利用的这一点，我们需要正确的使用 HTTP 动词，来表明我们要如何操作资源。
   先来解释一个概念，`幂等性`，指一次和多次请求某一个资源应该具有同样的副作用，也就是一次访问与多次访问，对这个资源带来的变化是相同的。

   常用的动词及幂等性

   | Verb   | Descript                           | Idempotent |
   | ------ | ---------------------------------- | ---------- |
   | GET    | 获取资源，单个或多个               | Yes        |
   | POST   | 创建资源                           | No         |
   | PUT    | 更新资源，客户端提供完整的资源数据 | Yes        |
   | PATCH  | 更新资源，客户端提供部分的资源数据 | No         |
   | DELETE | 删除资源                           | Yes        |

   > 为什么 PUT 是幂等的而 PATCH 是非幂等的，因为 PUT 是根据客户端提供了完整的资源数据，客户端提交什么就替换为什么，而 PATCH 
   > 有可能是根据客户端提供的参数，动态的计算出某个值，例如每次请求后资源的某个参数减1，所以多次调用，资源会有不同的变化。

   另外需要注意的是，GET 请求对于资源来说是安全的，不允许通过 GET 请求改变（更新或创建）资源，但是真实使用中，为了方便统计类的数据，会有一些例外情况，例如帖子详情，记录访问次数，每调用一次，访问次数 +1;

6. **资源过滤**

   我们需要提供合理的参数供客户端过滤资源，例如：

   | URL                    | Descption                                    |
   | ---------------------- | -------------------------------------------- |
   | ?state=closed          | 不同状态的资源                               |
   | ?page=2&per_page=100   | 访问第几页数据，每页多少条。                 |
   | ?sortby=name&order=asc | 指定返回结果按照哪个属性排序，以及排序顺序。 |

7. **正确使用状态码**

   HTTP 提供了丰富的状态码供我们使用，正确的使用状态码可以让响应数据更具可读性。

   | Condition | Status                 | Descption                                                    |
   | --------- | ---------------------- | ------------------------------------------------------------ |
   | 200       | OK                     | 对成功的 GET、PUT、PATCH 或 DELETE 操作进行响应。也可以被用在不创建新资源的 POST 操作上 |
   | 201       | Created                | 对创建新资源的 POST 操作进行响应。应该带着指向新资源地址的 Location 头 |
   | 202       | Accepted               | 服务器接受了请求，但是还未处理，响应中应该包含相应的指示信息，告诉客户端该去哪里查询关于本次请求的信息 |
   | 204       | No Content             | 对不会返回响应体的成功请求进行响应（比如 DELETE 请求）       |
   | 304       | Not Modified           | HTTP缓存header生效的时候用                                   |
   | 400       | Bad Request            | 请求异常，比如请求中的body无法解析                           |
   | 401       | Unauthorized           | 没有进行认证或者认证非法                                     |
   | 403       | Forbidden              | 服务器已经理解请求，但是拒绝执行它                           |
   | 404       | Not Found              | 请求一个不存在的资源                                         |
   | 405       | Method Not Allowed     | 所请求的 HTTP 方法不允许当前认证用户访问                     |
   | 410       | Gone                   | 表示当前请求的资源不再可用。当调用老版本 API 的时候很有用    |
   | 415       | Unsupported Media Type | 如果请求中的内容类型是错误的                                 |
   | 422       | Unprocessable Entity   | 用来表示校验错误                                             |
   | 429       | Too Many Requests      | 由于请求频次达到上限而被拒绝访问                             |

8. **数据响应格式**

   考虑到响应数据的可读性及通用性，默认使用 JSON 作为数据响应格式。如果客户端有需求使用其他的响应格式，例如 XML，需要在 Accept 头中指定需要的格式。
