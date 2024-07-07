import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomersController, DeleteCustumersControllers, GetCustomerByTokenController, ListCustomerController } from "./controllers/CustumerControllers";
import { CreateProductController, DeleteProductControllers, GetProductByIdController, ListProductController } from "./controllers/ProductControllers";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post("/user", async (request: FastifyRequest, reply: FastifyReply) => {
        return new GetCustomerByTokenController().handle(request, reply);
    })
    fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomersController().handle(request, reply);
    })
    fastify.get("/customers", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListCustomerController().handle(request, reply);
    })
    fastify.delete("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCustumersControllers().handle(request, reply);
    })
    fastify.post("/product", async (request: FastifyRequest, reply: FastifyReply) => { 
        return new CreateProductController().handle(request, reply);
    })
    fastify.delete("/product", async (request: FastifyRequest, reply: FastifyReply) => { 
        return new DeleteProductControllers().handle(request, reply);
    })
    fastify.get("/product/all", async (request: FastifyRequest, reply: FastifyReply) => { 
        return new ListProductController().handle(request, reply);
    })
    fastify.get("/product", async (request: FastifyRequest, reply: FastifyReply) => { 
        return new GetProductByIdController().handle(request, reply);
    })
}

//SWGGER
// export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

//     fastify.post("/user", {
//         schema: {
//             description: 'Get customer by token',
//             tags: ['User'],
//             summary: 'Get user',
//             response: {
//                 200: {
//                     description: 'Successful response',
//                     type: 'object'
//                 }
//             }
//         }
//     }, async (request: FastifyRequest, reply: FastifyReply) => {
//         return new GetCustomerByTokenController().handle(request, reply);
//     });

//     fastify.post("/customer", {
//         schema: {
//             description: 'Create a new customer',
//             tags: ['Customer'],
//             summary: 'Create customer',
//             body: {
//                 type: 'object',
//                 required: ['name', 'email'], // Example required fields
//                 properties: {
//                     name: { type: 'string' },
//                     email: { type: 'string' }
//                 }
//             },
//             response: {
//                 201: {
//                     description: 'Customer created successfully',
//                     type: 'object'
//                 }
//             }
//         }
//     }, async (request: FastifyRequest, reply: FastifyReply) => {
//         return new CreateCustomersController().handle(request, reply);
//     });

//     fastify.get("/customers", {
//         schema: {
//             description: 'List all customers',
//             tags: ['Customer'],
//             summary: 'List customers',
//             response: {
//                 200: {
//                     description: 'Successful response',
//                     type: 'array',
//                     items: {
//                         type: 'object'
//                     }
//                 }
//             }
//         }
//     }, async (request: FastifyRequest, reply: FastifyReply) => {
//         return new ListCustomerController().handle(request, reply);
//     });

//     fastify.delete("/customer", {
//         schema: {
//             description: 'Delete a customer',
//             tags: ['Customer'],
//             summary: 'Delete customer',
//             body: {
//                 type: 'object',
//                 required: ['id'], // Example required fields
//                 properties: {
//                     id: { type: 'string' }
//                 }
//             },
//             response: {
//                 200: {
//                     description: 'Customer deleted successfully',
//                     type: 'object'
//                 }
//             }
//         }
//     }, async (request: FastifyRequest, reply: FastifyReply) => {
//         return new DeleteCustumersControllers().handle(request, reply);
//     });

//     fastify.post("/product", {
//         schema: {
//             description: 'Create a new product',
//             tags: ['Product'],
//             summary: 'Create product',
//             body: {
//                 type: 'object',
//                 required: ['cod_prod'], // Example required fields
//                 properties: {
//                     cod_prod: { type: 'number' }
//                 }
//             },
//             response: {
//                 201: {
//                     description: 'Product created successfully',
//                     type: 'object'
//                 }
//             }
//         }
//     }, async (request: FastifyRequest, reply: FastifyReply) => {
//         return new CreateProductController().handle(request, reply);
//     });

//     fastify.delete("/product", {
//         schema: {
//             description: 'Delete a product',
//             tags: ['Product'],
//             summary: 'Delete product',
//             body: {
//                 type: 'object',
//                 required: ['id'], // Example required fields
//                 properties: {
//                     id: { type: 'string' }
//                 }
//             },
//             response: {
//                 200: {
//                     description: 'Product deleted successfully',
//                     type: 'object'
//                 }
//             }
//         }
//     }, async (request: FastifyRequest, reply: FastifyReply) => {
//         return new DeleteProductControllers().handle(request, reply);
//     });

//     fastify.get("/product/all", {
//         schema: {
//             description: 'List all products',
//             tags: ['Product'],
//             summary: 'List products',
//             response: {
//                 200: {
//                     description: 'Successful response',
//                     type: 'array',
//                     items: {
//                         type: 'object'
//                     }
//                 }
//             }
//         }
//     }, async (request: FastifyRequest, reply: FastifyReply) => {
//         return new ListProductController().handle(request, reply);
//     });

//     fastify.get("/product", {
//         schema: {
//             description: 'Get product by ID',
//             tags: ['Product'],
//             summary: 'Get product',
//             querystring: {
//                 type: 'object',
//                 required: ['id'], // Example required fields
//                 properties: {
//                     id: { type: 'string' }
//                 }
//             },
//             response: {
//                 200: {
//                     description: 'Successful response',
//                     type: 'object'
//                 }
//             }
//         }
//     }, async (request: FastifyRequest, reply: FastifyReply) => {
//         return new GetProductByIdController().handle(request, reply);
//     });
// }