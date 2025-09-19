import "dotenv/config";
import { env } from "@/lib/env";
import { buildServer } from "./server";

const app = buildServer();
app
  .listen({ port: env.PORT, host: "0.0.0.0" })
  .then(() => console.log(`HTTP server running on :${env.PORT}`))
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
