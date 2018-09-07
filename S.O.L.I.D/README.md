### 面向对象设计的SOLID原则
> S.O.L.I.D是面向对象设计和编程(OOD&OOP)中几个重要编码原则(Programming Priciple)的首字母缩写。

|缩写|英文|中文|解释|
|:--|:--:|:--|---|
|SRP|The Single Responsibility Principle|单一责任原则|当需要修改某个类的时候原因有且只有一个（THERE SHOULD NEVER BE MORE THAN ONE REASON FOR A CLASS TO CHANGE）。换句话说就是让一个类只做一种类型责任，当这个类需要承当其他类型的责任的时候，就需要分解这个类。 |
|OCP|The Open Closed Principle|开放封闭原则|软件实体应该是可扩展，而不可修改的。也就是说，对扩展是开放的，而对修改是封闭的。(最难理解)|
|LSP|The Liskov Substitution Principle|	里氏替换原则|(当一个子类的实例应该能够替换任何其超类的实例时，它们之间才具有is-A关系)|
|DIP|The Dependency Inversion Principle|依赖倒置原则|高层模块不应该依赖于低层模块，二者都应该依赖于抽象,抽象不应该依赖于细节，细节应该依赖于抽象 |
|ISP|The Interface Segregation Principle|接口分离原则|不能强迫用户去依赖那些他们不使用的接口。换句话说，使用多个专门的接口比使用单一的总接口总要好。|

