import Fastify from 'fastify';
import { routes } from './routes';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import { join } from 'path';

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message });
});

const start = async () => {
    await app.register(cors, {
        origin: true
    });

    await app.register(swagger, {
        swagger: {
            info: {
                title: 'Fastify API',
                description: 'API documentation',
                version: '1.0.0',
            },
            host: 'localhost:3333',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
        },
        exposeRoute: true
    });

    await app.register(swaggerUi, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false,
        },
        uiHooks: {
            onRequest: function (request, reply, next) { next(); },
            preHandler: function (request, reply, next) { next(); },
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
        transformSpecificationClone: true
    });

    await app.register(routes);

    // Registrar o plugin para servir arquivos estáticos do frontend
    app.register(fastifyStatic, {
        root: join(__dirname, 'public'),
        prefix: '/'
    });

    // Serve o arquivo index.html para todas as rotas não especificadas (para SPA)
    app.get('/*', async (request, reply) => {
        return reply.sendFile('index.html');
    });

    try {
        await app.listen({ port: 3333 });
        console.log('Server is running on http://localhost:3333');
        console.log('Swagger docs available on http://localhost:3333/docs');
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

start();
