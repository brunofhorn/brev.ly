import { Type } from "@sinclair/typebox";
import { createLink, deleteByShortUrl, getByShortUrl, incrementClicks, listLinks, exportCsvToR2, } from "@/services/links.service";
export const linksRoutes = async (app) => {
    // criar link
    app.post("/links", {
        schema: {
            body: Type.Object({
                shortUrl: Type.String({ pattern: "^[a-zA-Z0-9-]+$", minLength: 1 }),
                originalUrl: Type.String({ minLength: 1 }),
            }),
        },
    }, async (req, reply) => {
        const created = await createLink(req.body);
        return reply.code(201).send(created);
    });
    // deletar
    app.delete("/links/:code", {
        schema: { params: Type.Object({ code: Type.String() }) },
    }, async (req) => deleteByShortUrl(req.params.code));
    // obter por code
    app.get("/links/:code", {
        schema: { params: Type.Object({ code: Type.String() }) },
    }, async (req) => getByShortUrl(req.params.code));
    // listar (paginado)
    app.get("/links", {
        schema: {
            querystring: Type.Object({
                page: Type.Optional(Type.Integer({ minimum: 1 })),
                perPage: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 })),
                q: Type.Optional(Type.String()),
            }),
        },
    }, async (req) => listLinks(req.query));
    // incrementar acessos
    app.post("/links/:code/hit", {
        schema: { params: Type.Object({ code: Type.String() }) },
    }, async (req, reply) => {
        await incrementClicks(req.params.code);
        return reply.code(204).send();
    });
    // exportar CSV para R2
    app.post("/links/export", {
        schema: {
            body: Type.Object({
                baseShortUrl: Type.String({ description: "ex.: https://brev.ly/" }),
            }),
        },
    }, async (req) => exportCsvToR2(req.body.baseShortUrl));
};
