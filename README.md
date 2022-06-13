# Transaction-mongodb-nodejs

## Use docker to create database

*** follow the steps ***

``` docker network create mongoNet```

``` docker run -d -p 2001:27017 --net mongoNet --name r0 mongo --replSet mongoRepSet```

``` docker run -d -p 2001:27017 --net mongoNet --name r1 mongo --replSet mongoRepSet```

``` docker run -d -p 2001:27017 --net mongoNet --name r2 mongo --replSet mongoRepSet```

```  docker exec -it r0 bash```

``` config = {"_id": "mongoRepSet", "members": [{_id: 0, host: "192.168.1.100:2000"}, {_id: 1, host: "192.168.1.100:2001"}, {_id: 3, host: "192.168.1.100:2002"}]}```

```rs.initiate(config)```