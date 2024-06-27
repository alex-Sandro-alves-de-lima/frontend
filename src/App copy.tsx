import { FiTrash } from 'react-icons/fi';
import { api } from './services/api';
import { useEffect, useState, useRef, FormEvent } from 'react';

interface customersProps {
    id: string;
    email: string;
    name: string;
    status: boolean;
    created_at: string;
}
export default function App() {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);

    const [customers, setCostomers] = useState<customersProps[]>([]);

    useEffect(() => {
        loadCustomers();
    }, []);

    async function loadCustomers() {
        const response = await api.get("customers");
        setCostomers(response.data)
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!nameRef.current?.value || !emailRef.current?.value) return;
        const response = await api.post("customer", {
            name: nameRef.current?.value,
            email: emailRef.current?.value

        })
        nameRef.current.value = "";
        emailRef.current.value = "";
        setCostomers(allCustommers => [...allCustommers, response.data])

    }

    async function handleDelete(id: string) {
        try {
            await api.delete("/customer", {
                params: {
                    id: id
                }
            })
            const allCustommers = customers.filter((customer) => customer.id !== id)
            setCostomers(allCustommers)
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="W-full min-h-screen bg-gray-900 flex justify-center px-4">
            <main className="my-10 w-full md:max-e-2xl">
                <h1 className="text-4x1 font-medium text-white">Clientes</h1>

                <form className="flex flex-col my-6" onSubmit={handleSubmit}>
                    <label className="font-medium text-white">Nome: </label>
                    <input type="text"
                        className="w-full mb-5 p-2 rounded"
                        placeholder="Digite seu nome, completo..."
                        ref={nameRef}
                    />


                    <label className="font-medium text-white">Email: </label>
                    <input type="enauk"
                        className="w-full mb-5 p-2 rounded"
                        placeholder="Digite seu email, completo..."
                        ref={emailRef} />

                    <input
                        className="cursor-pointer w-full bg-green-500 rounded font-medium"
                        type="submit"
                        value="cadastrar" />
                </form>

                <section className="flex flex-col gap-4">
                    {customers.map((customer) => (
                        <article key={customer.id} className="w-full bg-white rounded p-2 relative hover:scale-11
                     0 duration-200">
                            <p><span className="font-medium">Nome:</span> {customer.name}</p>
                            <p><span className="font-medium">Email:</span> {customer.email}</p>
                            <p><span className="font-medium">Status:</span> {customer.status ? "Ativo" : "Inativo"}</p>
                            <button className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
                                onClick={() => handleDelete(customer.id)}
                            >
                                <FiTrash size={18} color="#fff" />
                            </button>

                        </article>
                    ))}
                </section>

            </main>
        </div>
    );
}
