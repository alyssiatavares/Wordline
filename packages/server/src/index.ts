import { Elysia } from "elysia";
import { health } from "./modules/health";

const app = new Elysia({ prefix: "/api" }).listen(3000);
app.group("/v1", (app) => app.use(health));

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
