import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    InputGroup,
    InputRightElement,
    Tooltip,
    useToast,
} from "@chakra-ui/react";
import { Megaphone } from "../assets/pngs";
import { useMutation } from "@tanstack/react-query";
import { createReport } from "../api/reports";
import useFormSetters from "../hooks/useFormSetter";
import { useState } from "react";
import { MapPinHouse } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export const ReportType = {
    CALLE: "Calle",
    FUGAS: "Fugas",
    BASURA: "Basura",
    VANDALISMO: "Vandalismo",
    OTRO: "Otro"
};


export default function ReportModal({ isOpen, onClose }) {

    const queryClient = useQueryClient();

    const toast = useToast();

    const Mutation = useMutation({
        mutationFn: createReport, onSuccess: () => {
            queryClient.invalidateQueries(["reports"]);
            onClose();
            toast({
                title: "Reporte creado",
                description: "El reporte ha sido creado exitosamente.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: `No se pudo crear el reporte: ${error.message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        },
    });


    const [formSetter, setFormSetter] = useFormSetters({
        title: '',
        description: '',
        location: '',
        image: '',
        attended: false,
        reportType: '',
    });

    const [imageBase64, setImageBase64] = useState('');

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const locString = `Lat: ${latitude}, Lon: ${longitude}`;
                    setFormSetter("location")(locString); // Actualiza el estado del formulario
                },
                (error) => {
                    console.error("Error obteniendo la ubicación: ", error);
                }
            );
        } else {
            console.error("Geolocalización no es soportada por este navegador.");
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(reader.result);
                setImageBase64(reader.result);
                setFormSetter('image')(reader.result);
            };
            reader.readAsDataURL(file); // Convierte la imagen a Base64
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <div className="flex flex-col">
                        <h2>¡Reportar un problema!</h2>
                        <p className="font-normal">¡Trabajemos juntos por una mejor comunidad!</p>
                    </div>

                    <img src={Megaphone} alt="" draggable={false} className="w-16" />
                </ModalHeader>

                <ModalBody display="flex" flexDirection="column" gap={8}>
                    <Input
                        type="text"
                        placeholder="Titulo"
                        onChange={event => setFormSetter("title")(event.target.value)}
                        value={formSetter.title}
                    />
                    <Input
                        type="text"
                        placeholder="Descripción"
                        onChange={event => setFormSetter("description")(event.target.value)}
                        value={formSetter.description}
                    />
                    <Select
                        placeholder="Seleccione el tipo de reporte"
                        onChange={(event) => setFormSetter("reportType")(event.target.value)}
                        value={formSetter.reportType}
                    >
                        {Object.entries(ReportType).map(([key, value]) => (
                            <option key={key} value={value}>{value}</option>
                        ))}
                    </Select>
                    <InputGroup>
                        <Input
                            type="text"
                            placeholder="Ubicación"
                            value={formSetter.location}
                            readOnly // Hazlo solo lectura si no deseas que el usuario edite
                        />
                        <InputRightElement>
                            <Tooltip label="Obtener ubicación">
                                <Button onClick={getLocation} size="sm">
                                    <MapPinHouse />
                                </Button>
                            </Tooltip>
                        </InputRightElement>
                    </InputGroup>
                    <Input
                        type="file"
                        accept="image/*" // Permitir solo imágenes
                        onChange={handleImageChange} // Cambia la imagen
                    />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Cerrar
                    </Button>
                    <Button colorScheme="green" onClick={() => Mutation.mutate(formSetter)}>Enviar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
