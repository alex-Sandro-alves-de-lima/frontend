import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomersService,DeleteCustumersService,GetCustomerByTokenService,ListCustomersService} from '../services/CustomersService'

class CreateCustomersController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const customerService = new CreateCustomersService();

        const { name, email, password, acesso, token, imagem } = request.body as {
            name: string;
            email: string;
            password: string;
            acesso: string[];
            token: string;
            imagem: string[];
        };
        try {
            const customer = await customerService.execute({ name, email, password, acesso, token, imagem });
            reply.send(customer);
        } catch (error) {
            reply.status(400).send({ error });
        }
    }
}

class DeleteCustumersControllers {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string }
        const customerService = new DeleteCustumersService();
        const customer = await customerService.execute({ id });
        reply.send(customer);
    }
}

class GetCustomerByTokenController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { token } = request.body as { token: string };
        const getCustomerByTokenService = new GetCustomerByTokenService();

        try {
            const customer = await getCustomerByTokenService.execute(token);
            reply.send(customer);
        } catch (error) {
            reply.status(400).send({ error  });
        }
    }
}

class ListCustomerController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listCustomersService = new ListCustomersService();
        try {
            const customers = await listCustomersService.execute();
            reply.send(customers);
        } catch (error) {
            reply.status(500).send({ error});
        }
    }
}


export { CreateCustomersController ,DeleteCustumersControllers,GetCustomerByTokenController,ListCustomerController};
