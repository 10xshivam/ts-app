import http from "http";
import app from "./app/server";
import pg from "pg";
import {Redis} from "ioredis";

async function init() {
  try {
    // Redis Connection
    console.log(`Connecting Redis...`);
    const redis = new Redis("redis://redis:6379", { lazyConnect: true });
    await redis.connect();
    console.log(`Redis Connection Success...`);

    // Postgresql Connection
    console.log(`Connecting Postgres...`);

    const { Client } = pg;
    const client = new Client({
      host: "db",
      port: 5432,
      database: "postgres",
      user: "postgres",
      password: "postgres",
    });
    await client.connect();
    console.log(`Postgres Connection Success...`);

    const PORT = process.env.PORT || 8000;
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Http server is listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(`Error Starting Server`, error);
  }
}

init();
