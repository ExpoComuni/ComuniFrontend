import { useState } from "react";
import { Edit, Trash, PlusCircle } from "lucide-react";
import {
  Box,
  Button,
  Image,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import AddNewsModal from "../../components/AddNews";
import EditNewsModal from "../../components/EditNews";
import DeleteNewsModal from "../../components/DeleteNews";
import { getAllNews } from "../../api/news";

const NewsScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNews, setSelectedNews] = useState(null);
  const [modalType, setModalType] = useState(""); 

  const {
    data: newsList = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["news"],
    queryFn: () => getAllNews(),
  });
  console.log(newsList);

  const handleAddNews = () => {
    setModalType("add");
    setSelectedNews(null);
    onOpen();
  };

  const handleEditNews = (news) => {
    setSelectedNews(news);
    setModalType("edit");
    onOpen();
  };

  const handleDeleteNews = (news) => {
    setSelectedNews(news);
    setModalType("delete");
    onOpen();
  };

  const handleSave = (newData) => {
    onClose();
  };
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    console.log(error)
    return <Text>Error descargando noticias</Text>;
  }

  return (
    <div className="p-10 w-full">
      <div className="flex justify-between">
        <Text fontSize="3xl" fontWeight="bold">
          Noticias
        </Text>
        <Button
          onClick={handleAddNews}
          leftIcon={<PlusCircle />}
          colorScheme="blue"
        >
          Agregar noticias
        </Button>
      </div>

      <div className="flex flex-wrap gap-8">
        {newsList && newsList.length > 0 ?  (
          newsList?.map((news) => (
            <Box key={news.id} p={5} bg="white" shadow="md" borderRadius="md" maxW={300}>
              <div className="flex justify-center">
                <Image
                  width={100}
                  src={news.img}
                  alt={news.title}
                  mb={4}
                  borderRadius="md"
                />
              </div>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {news.title}
              </Text>
              <Text mb={3}>{news.content}</Text>
              <Text fontSize="sm" color="gray.500">
                Por {news.author} el {news.publishedDate}
              </Text>
              <Box mt={4} display="flex" gap={3}>
                <Button
                  onClick={() => handleEditNews(news)}
                  leftIcon={<Edit />}
                  colorScheme="yellow"
                >
                  Editar
                </Button>
                <Button
                  onClick={() => handleDeleteNews(news)}
                  leftIcon={<Trash />}
                  colorScheme="red"
                >
                  Eliminar
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Text>No noticias disponibles</Text>
        )}
      </div>

      {/* Modal para añadir, editar o eliminar noticias */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalType === "add" && "Add News"}
            {modalType === "edit" && "Edit News"}
            {modalType === "delete" && "Delete News"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalType === "add" && <AddNewsModal onClose={onClose} />}
            {modalType === "edit" && (
              <EditNewsModal onClose={onClose} news={selectedNews} onSave={handleSave} />
            )}
            {modalType === "delete" && (
              <DeleteNewsModal
                news={selectedNews}
                onClose={onClose}
                onSave={handleSave}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default NewsScreen;
