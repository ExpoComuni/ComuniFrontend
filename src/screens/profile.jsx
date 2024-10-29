import { Avatar, Stack } from '@chakra-ui/react';
import { Mail, LayoutPanelTop, UserRound, LogOut } from 'lucide-react';
import profileStore from '../store/profile-store';
import { useMutation } from '@tanstack/react-query';
import { updateUserData } from '../api/user';
import useFormSetters from '../hooks/useFormSetter';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

export default function Profile() {
  const [formSetter, setFormSetter] = useFormSetters({ firstName: '', lastName: '', email: '' });
  const { user, updateUserData: updateProfileStore, clearProfileStore } = profileStore();
  
  const navigate = useNavigate(); // Inicializar el hook de navegación

  const userMutation = useMutation({
    mutationFn: updateUserData,
    onSuccess: (data) => {
      const { user } = data;
      updateProfileStore(user);
    }
  });

  const handleLogout = () => {
    // Limpiar el store y localStorage
    clearProfileStore(); // Limpiar el store
    // Redirigir a la página principal
    navigate('/'); // Redirigir a la página principal
  };

  return (
    <>
      <div className='flex flex-col p-6 w-full'>
        <div className='flex flex-col items-center gap-4 mt-[4rem]'>
          <Stack direction='row'>
            <Avatar width={140} height={140} src='https://bit.ly/broken-link' />
          </Stack>

          <div className='flex flex-col justify-center items-center gap-2'>
            <h1 className="pl-4 text-xl font-medium text-stellar-blue">
              <span className="inline-block border-b-[0.1rem] border-yellow-400 pb-1">
                <b>{user?.firstName} {user?.lastName}</b>
              </span>
            </h1>
            <button 
              className='text-[15px] flex justify-center items-center gap-2 bg-green-light text-white px-2 rounded-xl'
              onClick={handleLogout} // Llama a handleLogout en el click
            >
              logout
              <LogOut size={15} />
            </button>
          </div>
        </div>

        <section className="w-full flex flex-col gap-4 mt-6 justify-center">
          <div className="relative">
            <UserRound size={20} color='#494949' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue" />
            <input
              type="text"
              placeholder="Modificar el nombre"
              className="bg-[#f1f4ff] border text-green-light placeholder-strong-blue py-3 pl-12 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-light"
              onChange={event => setFormSetter("firstName")(event.target.value)}
              value={formSetter.firstName}
            />
          </div>

          <div className="relative">
            <LayoutPanelTop size={20} color='#494949' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue" />
            <input
              type="text"
              placeholder="Modificar el apellido"
              className="bg-[#f1f4ff] border text-green-light placeholder-strong-blue py-3 pl-12 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-light"
              onChange={event => setFormSetter("lastName")(event.target.value)}
              value={formSetter.lastName}
            />
          </div>

          <div className="relative">
            <Mail size={20} color='#494949' className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-blue" />
            <input
              type="text"
              placeholder="Modificar el email"
              className="bg-[#f1f4ff] border text-gray-800 placeholder-strong-blue py-3 pl-12 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-light"
              onChange={event => setFormSetter("email")(event.target.value)}
              value={formSetter.email}
            />
          </div>

          <button 
            className="bg-green-light text-white font-medium py-3 rounded-lg mt-4 transition duration-300"
            onClick={() => {
              updateProfileStore(formSetter); // Actualiza el store y localStorage directamente
              userMutation.mutate(formSetter); // Ejecuta la mutación si es necesario actualizar en el servidor
            }}
          >
            Modificar
          </button>
        </section>
      </div>
    </>
  );
}
