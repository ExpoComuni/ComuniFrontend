import { Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import useFormSetters from '../hooks/useFormSetter';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateNews } from '../api/news'; // Asegúrate de que esta ruta sea correcta

const EditNewsModal = ({ news, onClose }) => {
  const [formData, setFormValue] = useFormSetters({
    title: news?.title || '',
    content: news?.content || '',
    author: news?.author || '',
    publishedDate: news?.publishedDate || '',
    img: news?.img || '',
  });

  const [imageBase64, setImageBase64] = useState(news?.img || ''); 

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedNews) => updateNews(news.id, updatedNews), 
    onSuccess: () => {
      queryClient.invalidateQueries(['news']);
      onClose();
    },
    onError: (error) => {
      console.error('Error updating news:', error);
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
        setFormValue('img')(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    mutation.mutate({ ...formData, img: imageBase64 });
  };

  return (
    <>
      <FormControl mb={4}>
        <FormLabel>Title</FormLabel>
        <Input value={formData.title} onChange={(e) => setFormValue('title')(e.target.value)} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Content</FormLabel>
        <Textarea value={formData.content} onChange={(e) => setFormValue('content')(e.target.value)} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Author</FormLabel>
        <Input value={formData.author} onChange={(e) => setFormValue('author')(e.target.value)} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Published Date</FormLabel>
        <Input type="date" value={formData.publishedDate} onChange={(e) => setFormValue('publishedDate')(e.target.value)} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Image URL</FormLabel>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {imageBase64 && (
          <img src={imageBase64} alt="Current Image" style={{ marginTop: '10px', maxHeight: '100px' }} />
        )}
      </FormControl>
      <Button colorScheme="blue" onClick={handleSave} isLoading={mutation.isLoading}>
        Update
      </Button>
    </>
  );
};

export default EditNewsModal;
