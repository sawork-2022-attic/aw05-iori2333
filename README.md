# RESTful microPoS

请参考spring-petclinic-rest/spring-petclinic-microserivces 将aw04的webpos项目改为rest风格的微服务架构
（至少包含产品管理服务pos-products和购物车管理服务pos-carts以及discovery/gateway等微服务架构下需要的基础设施服务）。具体要求包括：

1. 请使用OpenAPI的定义每个服务的rest接口（参考pos-products）
2. 请使用ehcache管理缓存；
3. 请注意使用断路器等机制；
4. 有兴趣的同学可自学一些reactjs或vuejs等为microPoS开发一个前端。

## 运行服务

在`pos-frontend`项目下运行

```shell
npm install
npm run build
npm run deploy
```

后开启Springboot服务器即可。

## `pos-products`服务

负责加载从京东获得的商品信息，并将其缓存起来，以便后续使用。

由于`pos-products`已有接口足够满足项目需要，故未设置其他接口，仅在原有代码之上添加了`ehcache`缓存管理。

## `pos-carts`服务

`pos-carts`服务负责管理购物车，包括添加商品到购物车，移除购物车商品，查询购物车，编辑购物车等功能。我们设计了一套Restful风格的接口以满足不同的需要。

## `pos-discovery`服务

`pos-discovery`服务提供了EurekaServer的服务，用于查询微服务的注册信息，并可以监控各服务器的运行状况。

## `pos-gateway`服务

`pos-gateway`服务提供了一个网关，用于将请求转发到各个微服务。同时作为用户直接访问的地址，同时负责提供前端静态页面。


## `pos-frontend`项目

`pos-fronend`是基于`React + SASS`的前端项目，便于用户浏览商品和直接操作购物车。预览如下：

![前端预览](./sample.png)
