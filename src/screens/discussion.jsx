import { ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createComment, getComments } from '../api/comments';
import useFormSetters from '../hooks/useFormSetter';
import { useToast } from '@chakra-ui/react';
import profileStore from '../store/profile-store'; // Asegúrate de que esta línea esté presente
import { format } from 'date-fns'; // Para formatear la fecha

export default function Discussion() {
  const { id } = useParams(); // Id de la discusión
  const [formSetter, setFormSetter] = useFormSetters({ content: "" });
  const toast = useToast();
  const { user } = profileStore(); // Obtener el usuario

  // Fetch comments using react-query
  const { data: comments, error, isLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getComments(id), // Función que trae los comentarios
  });


  // Mutación para crear un comentario
  const commentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      toast({
        title: "Comentario añadido",
        description: "Tu comentario se ha añadido correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setFormSetter({ content: "" }); // Limpiar el campo del comentario tras el éxito
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Hubo un problema al añadir tu comentario.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
  });

  const handleCommentSubmit = () => {
    if (!formSetter.content.trim()) {
      toast({
        title: "Error",
        description: "El comentario no puede estar vacío.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (!id || !user?.id) {
      toast({
        title: "Error",
        description: "Falta información del usuario o de la discusión.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    commentMutation.mutate({
      content: formSetter.content,
      discussionId: id,
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex w-full justify-between items-center p-3">
        <Link to="/app/forum">
          <ChevronLeft size={36} />
        </Link>
        <h1 className="font-bold text-3xl">Discusión</h1>
      </div>

      <div className="p-4">
        <h2 className="font-semibold text-xl mb-4">Comentarios</h2>

        {isLoading ? (
          <p>Cargando comentarios...</p>
        ) : error ? (
          <p>Error al cargar los comentarios.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {comments?.map((comment) => (
              <div key={comment.id} className="p-4 border rounded shadow">
                <p className="text-lg font-semibold">
                  {comment.createdBy.firstName} {comment.createdBy.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(comment.createdAt), 'dd/MM/yyyy HH:mm')}
                </p>
                <p className="mt-2">{comment.content}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Escribe un comentario..."
            onChange={(event) => setFormSetter("content")(event.target.value)}
            value={formSetter.content}
          />
          <button
            className="mt-2 p-2 bg-blue-500 text-white rounded"
            onClick={handleCommentSubmit}
          >
            Añadir Comentario
          </button>
        </div>
      </div>
    </div>
  );
}
