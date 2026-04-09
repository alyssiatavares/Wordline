import Elysia from "elysia";

export const health = new Elysia({ prefix: "/health" }).get("/", async () => ({
  status: "OK",
  timestamp: new Date().toISOString(),
}));
