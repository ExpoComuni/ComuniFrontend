import { useState } from "react";
import {
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiscussion, getAllDiscussionsByTopic } from "../api/discussions";
import { Plus } from "lucide-react";
import "../assets/styles/jesus.css"
import { format } from "date-fns"; // Importa la función de formateo

// Import your DiscussionTopics enum for the topic select options
const DiscussionTopics = {
  Infrastructure: "Infraestructura",
  Sustainability: "Sostenibilidad",
  Security: "Seguridad",
  Health: "Salud",
  Education: "Educación",
  Transportation: "Transporte",
  Culture: "Cultura",
  Recycling: "Reciclaje",
  Transparency: "Transparencia",
  Economy: "Economía",
  GreenSpaces: "Espacios verdes",
  Housing: "Vivienda",
  Accessibility: "Accesibilidad",
  AnimalWelfare: "Bienestar animal",
  Technology: "Tecnología",
  Emergencies: "Emergencias",
};

export default function Forum() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("Todos");
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    place: "",
    topic: "",  // Add topic here
  });

  // Fetch discussions based on topic
  const {
    data: discussions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["discussions", selectedTopic],
    queryFn: () =>
      getAllDiscussionsByTopic(selectedTopic === "Todos" ? "" : selectedTopic),
  });

  // Mutation for creating a new discussion
  const mutation = useMutation({
    mutationFn: createDiscussion,
    onSuccess: () => {
      queryClient.invalidateQueries("discussions");
      setIsOpen(false); // Close modal on success
    },
    onError: (error) => {
      console.error("Error creating discussion:", error);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDiscussion((prev) => ({ ...prev, [name]: value }));
  };

  const handleTopicChange = (e) => {
    setNewDiscussion((prev) => ({ ...prev, topic: e.target.value }));
  };

  const handleSubmit = () => {
    mutation.mutate(newDiscussion);
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  return (
    <div className="flex flex-col w-full gap-8 p-1">
      <header className="flex justify-center">
        <section className="jesus text-white rounded-3xl text-center flex items-center justify-center w-full py-10 relative">
          <div>
            <h1 className="text-2xl font-bold text-left pl-4 shadow-lg">
              ¡Infórmate!
            </h1>
            <p className="text-sm mt-2 text-left pl-4 font-semibold shadow-lg">
              Aquí puedes conocer las principales discusiones del cantón.
            </p>
          </div>
        </section>
      </header>
      <div className="flex w-full gap-4 justify-between items-center px-2">
        <p className="text-xl">
          Filtra por <strong>tema</strong>
        </p>
        <Select
          value={selectedTopic}
          onChange={handleChange}
          variant="filled"
          size="md"
          width={60}
        >
          <option value="Todos">Todos</option>
          {Object.entries(DiscussionTopics).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </Select>
        <Button onClick={handleOpen}>
          <Plus />
        </Button>
      </div>

      <section className="flex flex-col h-[80vh] overflow-auto w-full gap-4 p-2">
        {isLoading ? (
          <p>Loading discussions...</p>
        ) : isError ? (
          <p>Error fetching discussions.</p>
        ) : discussions?.length > 0 ? (
          discussions.map((discussion, index) => (
            <Discussion key={index} {...discussion} />
          ))
        ) : (
          <p>No hay discusiones disponibles.</p>
        )}
      </section>

      {/* Modal to add new discussion */}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Nueva Discusión</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Título</FormLabel>
              <Input
                name="title"
                value={newDiscussion.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Descripción</FormLabel>
              <Input
                name="content"
                value={newDiscussion.content}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Lugar</FormLabel>
              <Input
                name="place"
                value={newDiscussion.place}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Tema</FormLabel>
              <Select
                name="topic"
                value={newDiscussion.topic}
                onChange={handleTopicChange}
              >
                {Object.entries(DiscussionTopics).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={mutation.isLoading}
            >
              Agregar
            </Button>
            <Button onClick={handleClose} ml={3}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}


function Discussion({ id, title, content, place, createdAt, createdBy }) {
  const navigate = useNavigate();

  // Formatear la fecha
  const formattedDate = format(new Date(createdAt), "dd MMMM yyyy"); // Cambia el formato según tus preferencias

  return (
    <article
      className="flex flex-col gap-3 bg-white border-[1px] border-gray-300 rounded-lg p-5 cursor-pointer"
      onClick={() => navigate(`${id}`)}
    >
      <h2 className="text-lg font-medium text-stellar-blue">
        <span className="inline-block border-b-[0.1rem] border-yellow-400 pb-1">
          <strong className="text-gray-800">{title}</strong>
        </span>
      </h2>
      <p className="text-[1rem] text-gray-500">{content}</p>
      <div className="flex justify-between">
        <p className="text-sm text-gray-400">
          <strong>{formattedDate}</strong>
        </p>
        {createdBy && (
          <p className="text-sm text-gray-400">
            Creado por <strong>{createdBy.name}</strong>
          </p>
        )}
      </div>
    </article>
  );
}
