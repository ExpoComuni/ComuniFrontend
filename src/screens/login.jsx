import { Link } from 'react-router-dom';
import { Mail, KeyRound } from 'lucide-react';
import useFormSetters from '../hooks/useFormSetter';
import { createLogin } from '../api/login';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import profileStore from '../store/profile-store';
import { useToast } from '@chakra-ui/react';

export default function LogIn() {
    const navigate = useNavigate();
    const [formSetter, setFormSetter] = useFormSetters({ email: '', password: '' });
    const addUserData = profileStore((state) => state.addProfileStore);
    const toast = useToast(); // Hook para manejar el toast

    const loginMutation = useMutation({
        mutationFn: createLogin,
        onSuccess: (data) => {
            const { token, user } = data;
            addUserData(token, user);
            
            // Mostrar el toast de éxito cuando el login es exitoso
            toast({
                title: "Inicio de sesión exitoso",
                description: `Bienvenido`,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });

            if (user?.role === 'ADMIN') {
                navigate('/console/reports'); 
            } else {
                navigate('/app'); 
            }
        },
        onError: (error) => {
            // Mostrar un toast de error en caso de fallo
            toast({
                title: "Error",
                description: `No se pudo iniciar sesión: ${error.message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    });

    return (
        <main className="flex justify-center items-center h-[80vh] bg-gray-50">
            <section className="flex flex-col text-center gap-4 w-80">
                <h1 className="text-green-light text-4xl font-semibold">Inicia Sesión</h1>
                <p className="font-medium text-[#494949]">
                    <strong className="text-green-light">Bienvenido,</strong> inicia sesión para comunicarte directamente con tu <strong className="text-green-light">cantón</strong>
                </p>

                <div className="flex flex-col gap-4 mt-4">
                    <div className="relative w-full max-w-md">
                        <Mail size={20} color='#494949' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue" />
                        <input
                            type="text"
                            placeholder="Ingresa tu email"
                            className="bg-[#f1f4ff] border text-green-light placeholder-strong-blue py-3 pl-12 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-light"
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
                        onClick={() => loginMutation.mutate(formSetter)}
                    >
                        Iniciar Sesión
                    </button>
                </div>
                <Link to={"/register"} className='text-[#494949] font-medium'>¿No tienes cuenta?</Link>
            </section>
        </main>
    );
}
