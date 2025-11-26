Copy the `.env.example` files to `.env` and modify it with your configuration
```env
MONGODB_URI=mongodb://<your_database_user>:<your_database_password>@<your_host>:27017/nexmedis?directConnection=true&authMechanism=SCRAM-SHA-256
MONGODB_URI_REPLICA_SET=mongodb://<your_database_user>:<your_database_password>@<your_host0>:27017,<your_host1>:27017,<your_host2>:27017/nexmedis?authSource=admin&replicaSet=rs0&authMechanism=SCRAM-SHA-256
REDIS_URI=redis://<your_redis_username_if_any>:<your_redis_password>@<your_host>:6379
PORT=3000
SECRET_KEY=<your_secret_key>
WHITELIST_IPS=<your_list_ip_to_whitelist>
```
Running the app (dev)
```sh
bun i
bun run dev
```
For API documentaion go to `/docs`