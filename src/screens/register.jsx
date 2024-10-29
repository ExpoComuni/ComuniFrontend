import { Link } from 'react-router-dom';
import { Mail, IdCard, UserRound, KeyRound } from 'lucide-react';
import useFormSetters from '../hooks/useFormSetter';
import { createUSer } from '../api/register';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

export default function Register() {

    const [formSetter, setFormSetter] = useFormSetters({ firstName: '', lastName: '', cedula: '', role: 'USER', email: '', password: '' });

    const navigate = useNavigate();

    const toast = useToast();

    const registerMutation = useMutation({
        mutationFn: createUSer,
        onSuccess: (data) => {
            toast({
                title: "Registro exitoso",
                description: `Bienvenido, ${data.firstName}`,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
            navigate('/');
        }
    });

    return (
        <main className="flex justify-center items-center mt-20 bg-gray-50">
            <section className="flex flex-col text-center gap-4 w-80">
                <h1 className="text-green-light text-4xl font-medium">Crea tu cuenta</h1>
                <p className="font-medium text-[#494949]">
                    <strong className="text-green-light">Crea</strong> tu cuenta para empezar a comunicarte directamente con tu <strong className="text-green-light">cantón</strong>
                </p>

                <section className="flex flex-col gap-4 mt-4">
                    <div className="relative  w-full max-w-md">
                        <UserRound size={20} color='#494949' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue" />
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="bg-[#f1f4ff] border text-gray-800 placeholder-strong-blue py-3 pl-12 w-full rounded-lg focus:outline-none focus:ring-green-light "
                            onChange={event => setFormSetter("firstName")(event.target.value)}
                            value={formSetter.firstName}
                        />
                    </div>

                    <div className="relative  w-full max-w-md">
                        <UserRound size={20} color='#494949' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue" />
                        <input
                            type="text"
                            placeholder="Apellidos"
                            className="bg-[#f1f4ff] border text-gray-800 placeholder-strong-blue py-3 pl-12 w-full rounded-lg focus:outline-none focus:ring-green-light "
                            onChange={event => setFormSetter("lastName")(event.target.value)}
                            value={formSetter.lastName}
                        />
                    </div>

                    <div className="relative w-full max-w-md">
                        <IdCard size={20} color='#494949' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue" />
                        <input
                            type="text"
                            placeholder="Ingresa Cédula"
                            className="bg-[#f1f4ff] border text-gray-800 placeholder-strong-blue py-3 pl-12 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-light"
                            onChange={event => setFormSetter("cedula")(event.target.value)}
                            value={formSetter.cedula}
                        />
                    </div>

                    <div className="relative  w-full max-w-md">
                        <Mail size={20} color='#494949' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue" />
                        <input
                            type="text"
                            placeholder="Ingresa tu email"
                            className="bg-[#f1f4ff] border text-gray-800 placeholder-strong-blue py-3 pl-12 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-light"
                            onChange={event => setFormSetter("email")(event.target.value)}
                            value={formSetter.email}
                        />
                    </div>

                    <div className="relative w-full max-w-md">
                        <KeyRound size={20} color='#494949' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue" />
                        <input
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            className="bg-[#f1f4ff] border text-gray-800 placeholder-strong-blue py-3 pl-12 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-light"
                            onChange={event => setFormSetter("password")(event.target.value)}
                            value={formSetter.password}
                        />
                    </div>

                    <button className="bg-green-light text-white font-medium py-3 rounded-lg mt-4 transition duration-300"
                        onClick={() => registerMutation.mutate(formSetter)}
                    >
                        Regístrate
                    </button>
                </section>
                <Link to={"/"} className='text-[#494949] font-medium'>¿Ya tienes cuenta?</Link>
            </section>
        </main>
    );
}
