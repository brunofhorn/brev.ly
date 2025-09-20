import {
  buildServer
} from "./chunk-FYHDWOW7.mjs";
import "./chunk-DN7ZI4F4.mjs";
import "./chunk-M3BBE3KC.mjs";
import "./chunk-2SMSKS7R.mjs";
import "./chunk-BYZXMVWQ.mjs";
import "./chunk-7HGV7Z7X.mjs";
import "./chunk-DJ7RMF7C.mjs";
import "./chunk-AY2LMT5P.mjs";
import "./chunk-XTCJNSOV.mjs";
import "./chunk-62O7GXN6.mjs";
import "./chunk-5I34SI7B.mjs";
import "./chunk-Y4VYMK5Y.mjs";
import "./chunk-5QZFB2EW.mjs";
import "./chunk-DDZEG7NL.mjs";
import "./chunk-7OCRT5TY.mjs";
import "./chunk-GZDIIVSN.mjs";
import "./chunk-AL7RIABG.mjs";
import "./chunk-ESJYKXNV.mjs";
import "./chunk-C4PKFTRR.mjs";
import "./chunk-BQQ7CXZ7.mjs";
import "./chunk-TNVOXIU4.mjs";
import "./chunk-7HFJ4A6Z.mjs";
import "./chunk-ICK4IRWN.mjs";
import "./chunk-JXU3I7BM.mjs";
import "./chunk-HA36QCVT.mjs";
import {
  env
} from "./chunk-MMVDJLD3.mjs";
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
