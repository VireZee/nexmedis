For number 3 is right [here](https://github.com/VireZee/nexmedis/blob/main/pdf/3.pdf)
# Running the app
Copy the `.env.example` files to `.env` and modify it with your configuration
```env
MONGODB_URI=mongodb://<your_database_user>:<your_database_password>@<your_host>:27017/nexmedis?directConnection=true&authMechanism=SCRAM-SHA-256
MONGODB_URI_REPLICA_SET=mongodb://<your_database_user>:<your_database_password>@<your_host0>:27017,<your_host1>:27017,<your_host2>:27017/nexmedis?authSource=admin&replicaSet=rs0&authMechanism=SCRAM-SHA-256
REDIS_URI=redis://<your_redis_username_if_any>:<your_redis_password>@<your_host>:6379
PORT=3000
SECRET_KEY=<your_secret_key>
WHITELIST_IPS=::ffff:127.0.0.1
```
Start (dev)
```sh
bun i
bun run dev
```
Run with docker
```sh
docker build -t nexmedis .
docker run -d \
  --name nexmedis \
  --network <your_network_name> \
  --env-file .env \
  -p 3000:3000 \
  nexmedis
```
> [!IMPORTANT]
> **Make sure you configure the docker network and your `.env` carefully!**

> [!NOTE]
> **For API documentaion go to `/docs`**