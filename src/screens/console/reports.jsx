import { useState } from "react";
import { Box, Button, Text, Image, Spinner, useToast } from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllReports, markReportAsAttended } from "../../api/reports";
import { CheckCircle, ExternalLink } from "lucide-react";

// Function to generate Google Maps link based on lat/lon
const generateGoogleMapsUrl = (locationString) => {
  if (!locationString) return null;

  const parts = locationString.split(',');
  const latPart = parts[0]?.split(':')[1]?.trim();
  const lonPart = parts[1]?.split(':')[1]?.trim();

  if (!latPart || !lonPart || isNaN(latPart) || isNaN(lonPart)) {
    return null; 
  }

  const lat = parseFloat(latPart);
  const lon = parseFloat(lonPart);
  
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
};

const ReportsScreen = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: reportsList = [], isLoading, isError } = useQuery({
    queryKey: ["reports"],
    queryFn: () => getAllReports(),
  });

  // Using useMutation for marking a report as attended
  const mutation = useMutation({
    mutationFn: markReportAsAttended,
    onSuccess: () => {
      queryClient.invalidateQueries("reports"); // Refetch reports after marking attended
      toast({
        title: "Report marked as attended.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "Error marking report as attended.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleMarkAsAttended = (reportId) => {
    console.log(reportId)
    mutation.mutate(reportId); // Mutate and send the report ID to be marked as attended
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Text>Error loading reports</Text>;
  }

  return (
    <div className="p-10 w-full">
      <div className="flex justify-between">
        <Text fontSize="3xl" fontWeight="bold">
          Reports
        </Text>
      </div>

      <div className="flex flex-wrap gap-8 mt-8">
        {reportsList.length > 0 ? (
          reportsList.map((report) => (
            <Box key={report.id} p={5} bg="white" shadow="md" borderRadius="md" maxW={300}>
              <Image
                width={100}
                src={report.image}
                alt={report.title}
                mb={4}
                borderRadius="md"
              />
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {report.title}
              </Text>
              <Text mb={3}>{report.description}</Text>
              <Text fontSize="sm" color="gray.500">
                Location: {report.location}
              </Text>
              {generateGoogleMapsUrl(report.location) ? (
                <Button
                  as="a"
                  href={generateGoogleMapsUrl(report.location)}
                  target="_blank"
                  colorScheme="blue"
                  leftIcon={<ExternalLink />}
                  mt={3}
                >
                  View on Maps
                </Button>
              ) : (
                <Text color="red.500">Invalid location data</Text>
              )}
              <Box mt={4} display="flex" gap={3}>
                <Button
                  onClick={() => handleMarkAsAttended(report.id)}
                  leftIcon={<CheckCircle />}
                  colorScheme="green"
                  isDisabled={report.attended}
                >
                  {report.attended ? "Attended" : "Mark as Attended"}
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Text>No reports available</Text>
        )}
      </div>
    </div>
  );
};

export default ReportsScreen;
