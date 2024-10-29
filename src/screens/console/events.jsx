import { Button, Box, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllEvents } from '../../api/events';
import AddEventModal from '../../components/EventModals/AddEvent';
import EditEventModal from '../../components/EventModals/EditEvent';
import DeleteEventModal from '../../components/EventModals/DeleteEvent';
import { PlusCircle, Edit, Trash } from 'lucide-react';

const EventsScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalType, setModalType] = useState(''); // Controls which modal to show

  const { data: eventList, isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: () => getAllEvents(),
  });

  console.log(eventList)
  // Opens the "Add Event" modal
  const handleAddEvent = () => {
    setModalType('add');
    setSelectedEvent(null);
    onOpen();
  };

  // Opens the "Edit Event" modal with selected event
  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setModalType('edit');
    onOpen();
  };

  // Opens the "Delete Event" modal with selected event
  const handleDeleteEvent = (event) => {
    setSelectedEvent(event);
    setModalType('delete');
    onOpen();
  };

  // Show a loading message while fetching data
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Show an error message if something goes wrong
  if (isError) {
    return <Text>Error fetching events</Text>;
  }

  return (
    <div className="p-10 w-full">
      <div className="flex justify-between">
        <Text fontSize="3xl" fontWeight="bold">
          Events
        </Text>
        <Button onClick={handleAddEvent} leftIcon={<PlusCircle />} colorScheme="blue">
          Add Event
        </Button>
      </div>

      {/* List of events */}
      <div className="flex flex-wrap gap-8 mt-8">
        {eventList && eventList.length > 0 ? (
          eventList.map((event) => (
            <Box key={event.id} p={5} bg="white" shadow="md" borderRadius="md">
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {event.title}
              </Text>
              <Text mb={3}>{event.description}</Text>
              <Text fontSize="sm" color="gray.500">
                Date: {new Date(event.eventdate).toLocaleDateString()} at {event.hour}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Place: {event.place}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Audience: {event.audience}
              </Text>
              <Box mt={4} display="flex" gap={3}>
                <Button
                  onClick={() => handleEditEvent(event)}
                  leftIcon={<Edit />}
                  colorScheme="yellow"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteEvent(event)}
                  leftIcon={<Trash />}
                  colorScheme="red"
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Text className="text-black">No events available</Text>
        )}
      </div>

      {/* Modal for Add, Edit, and Delete actions */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalType === 'add' && 'Add Event'}
            {modalType === 'edit' && 'Edit Event'}
            {modalType === 'delete' && 'Delete Event'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalType === 'add' && <AddEventModal onClose={onClose} />}
            {modalType === 'edit' && <EditEventModal event={selectedEvent} onClose={onClose} />}
            {modalType === 'delete' && <DeleteEventModal event={selectedEvent} onClose={onClose} />}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EventsScreen;
