import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface CreateCustomersProps {
    name: string;
    email: string;
    password: string;
    acesso: string[];
    token: string;
    imagem: string[];
}

interface DeleteCustumersProps {
    id: string
}

class ListCustomersService {
    async execute() {
        try {
            const customers = await prisma.customer.findMany();
            return customers;
        } catch (error) {
            throw new Error("Erro ao listar os clientes.");
        }
    }
}

class GetCustomerByTokenService {
    async execute(token: string) {
        if (!token) {
            throw new Error("Token não fornecido.");
        }

        const customer = await prisma.customer.findFirst({
            where: {
                token: token
            }
        });

        if (!customer) {
            throw new Error("Cliente não encontrado.");
        }

        return customer;
    }
}

class DeleteCustumersService {
    async execute({ id }: DeleteCustumersProps) {
        if (!id) {
            throw new Error("Solicitação invalida!..")
        }

        const findCustomer = await prisma.customer.findFirst({
            where: {
                id: id
            }
        })
        if (!findCustomer) {
            throw new Error("Id não enconstrado!")
        }

        await prisma.customer.delete({
            where: {
                id: findCustomer.id
            }
        })

        return { message: `${id} deletado com sucesso!` }
    }
}

class CreateCustomersService {
    async execute({ name, email, password, acesso, token, imagem }: CreateCustomersProps) {
        if (!name || !email || !password || !acesso || !token || !imagem) {
            throw new Error("Envie todos os campos...");
        }

        const customer = await prisma.customer.create({
            data: {
                name,
                email,
                password,
                acesso,
                token,
                imagem,
                status: true,
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        return customer;
    }
}

export { CreateCustomersService,ListCustomersService, GetCustomerByTokenService,DeleteCustumersService};
