import { Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import useFormSetters from '../hooks/useFormSetter';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNews } from '../api/news';
import { useState } from 'react';

const AddNewsModal = ({ onClose }) => {
  const [formData, setFormValue] = useFormSetters({
    title: '',
    content: '',
    author: '',
    publishedDate: '',
    img: '',
  });
  const [imageBase64, setImageBase64] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      queryClient.invalidateQueries(['news']);
      onClose();
    },
    onError: (error) => {
      console.error('Error creating news:', error);
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
        <FormLabel>Image</FormLabel>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSave} isLoading={mutation.isLoading}>
        Save
      </Button>
    </>
  );
};

export default AddNewsModal;
