// src/transform-swagger-schema.ts
import { jsonSchemaTransform } from "fastify-type-provider-zod";
function transformSwaggerSchema(data) {
  const { schema, url } = jsonSchemaTransform(data);
  if (schema.consumes?.includes("multipart/form-data")) {
    if (schema.body === void 0) {
      schema.body = {
        type: "object",
        required: [],
        properties: {}
      };
    }
    schema.body.properties.file = {
      type: "string",
      format: "binary"
    };
    schema.body.required.push("file");
  }
  return { schema, url };
}

export {
  transformSwaggerSchema
};
