import {
  buildServer
} from "./chunk-NPRF6QYF.mjs";
import "./chunk-J3PXB26D.mjs";
import "./chunk-EIQMXSO6.mjs";
import "./chunk-UG6HHCZ2.mjs";
import "./chunk-5I34SI7B.mjs";
import "./chunk-E7K2V4LA.mjs";
import "./chunk-C4PKFTRR.mjs";
import "./chunk-PTOPPSBW.mjs";
import "./chunk-BNT74FYD.mjs";
import "./chunk-NPX4QVSA.mjs";
import "./chunk-24FE3TX7.mjs";
import "./chunk-73GDGRXL.mjs";
import "./chunk-AY2LMT5P.mjs";
import "./chunk-6AVKOV25.mjs";
import "./chunk-62O7GXN6.mjs";
import "./chunk-BQ7JF6IZ.mjs";
import "./chunk-DDZEG7NL.mjs";
import "./chunk-BQQ7CXZ7.mjs";
import "./chunk-GZDIIVSN.mjs";
import "./chunk-7OCRT5TY.mjs";
import "./chunk-7EFTXKXX.mjs";
import "./chunk-TNVOXIU4.mjs";
import "./chunk-7HFJ4A6Z.mjs";
import "./chunk-JXU3I7BM.mjs";
import "./chunk-UYDUZPCU.mjs";
import {
  env
} from "./chunk-YBQPXRCX.mjs";
import "./chunk-K4F4GMEW.mjs";
import "./chunk-MCU6QLB7.mjs";
import "./chunk-XZP6Q677.mjs";
import "./chunk-7P6ASYW6.mjs";

// src/index.ts
import "dotenv/config";
var app = buildServer();
app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => console.log(`HTTP server running on :${env.PORT}`)).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
