import { Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEvent } from '../../api/events';
import useFormSetters from '../../hooks/useFormSetter';

const EditEventModal = ({ event, onClose }) => {
  const [formData, setFormValue] = useFormSetters({
    title: event?.title || '',
    description: event?.description || '',
    eventdate: event?.eventdate || '',
    hour: event?.hour || '',
    place: event?.place || '',
    audience: event?.audience || '',
    requirements: event?.requirements || '',
    link: event?.link || '',
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedEvent) => updateEvent(event.id, updatedEvent),
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      onClose();
    },
    onError: (error) => {
      console.error('Error updating event:', error);
    },
  });

  const handleSave = () => {
    mutation.mutate(formData);
  };

  return (
    <>
      <FormControl mb={4}>
        <FormLabel>Titulo</FormLabel>
        <Input value={formData.title} onChange={(e) => setFormValue('title')(e.target.value)} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Descripción</FormLabel>
        <Textarea value={formData.description} onChange={(e) => setFormValue('description')(e.target.value)} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Día del evento</FormLabel>
        <Input type="date" value={formData.eventdate} onChange={(e) => setFormValue('eventdate')(e.target.value)} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Hora</FormLabel>
        <Input value={formData.hour} onChange={(e) => setFormValue('hour')(e.target.value)} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Lugar</FormLabel>
        <Input value={formData.place} onChange={(e) => setFormValue('place')(e.target.value)} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Audiencia</FormLabel>
        <Input value={formData.audience} onChange={(e) => setFormValue('audience')(e.target.value)} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Requerimientos</FormLabel>
        <Textarea value={formData.requirements} onChange={(e) => setFormValue('requirements')(e.target.value)} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Link</FormLabel>
        <Input value={formData.link} onChange={(e) => setFormValue('link')(e.target.value)} />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSave} isLoading={mutation.isLoading}>
        Actualizar
      </Button>
    </>
  );
};

export default EditEventModal;
