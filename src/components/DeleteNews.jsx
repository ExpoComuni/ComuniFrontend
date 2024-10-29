import { Button, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNews } from '../api/news';

const DeleteNewsModal = ({ news, onClose }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteNews(news.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['news']);
      onClose();
    },
    onError: (error) => {
      console.error('Error deleting news:', error);
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <>
      <Text mb={4}>Are you sure you want to delete the news "{news.title}"?</Text>
      <Button
        colorScheme="red"
        onClick={handleDelete}
        isLoading={mutation.isLoading}
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteNewsModal;
