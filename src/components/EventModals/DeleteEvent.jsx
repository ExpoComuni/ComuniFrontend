import { Button, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEvent } from '../../api/events';

const DeleteEventModal = ({ event, onClose }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteEvent(event.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      onClose();
    },
    onError: (error) => {
      console.error('Error deleting event:', error);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <>
      <Text mb={4}>¿Estas seguro que quieres eliminar "{event.title}"?</Text>
      <Button colorScheme="red" onClick={handleDelete} isLoading={mutation.isLoading}>
        Eliminar
      </Button>
    </>
  );
};

export default DeleteEventModal;
