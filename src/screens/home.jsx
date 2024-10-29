import { Spinner } from "@chakra-ui/react"; // Importa el Spinner de Chakra UI
import "../assets/styles/home.css";
import profileStore from "../store/profile-store";
import { getAllNews } from "../api/news";
import { useQuery } from "@tanstack/react-query";
import { getAllReportsByUserId } from '../api/reports';
import ReportCard from "../components/ReportCard";

export default function Home() {
  const { user } = profileStore();

  const {
    data: news = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["news"],
    queryFn: () => getAllNews(),
  });

  const getReportsQuery = useQuery({ queryKey: ["reports"], queryFn: () => getAllReportsByUserId() })


  return (
    <div className="flex flex-col w-full gap-8">
      <header className="flex justify-center">
        <section className="cross text-white rounded-3xl text-center flex items-center justify-center w-[98%] px-9 py-10 relative">
          <div>
            <h1 className="text-2xl font-bold text-left pl-4">
              ¡Bienvenido {user?.firstName}!
            </h1>
            <p className="text-sm mt-2 text-left pl-4 font-semibold">
              Aquí puedes conocer más de tu cantón, Alajuelita.
            </p>
          </div>
        </section>
      </header>

      <section className="flex flex-col gap-8">
        <h1 className="pl-4 text-xl font-medium text-stellar-blue">
          <span className="inline-block border-b-[0.1rem] border-yellow-400 pb-1">
            <b>Tus reportes</b>
          </span>
        </h1>
        <div className="flex gap-3 items-center w-[100vw] overflow-auto">
          {getReportsQuery.isFetching ? (
            <div className="w-full flex justify-center">
              <Spinner size="xl" />
            </div>
          ) : getReportsQuery.data?.length > 0 ? (
            getReportsQuery.data.map((report, idx) => (
              <ReportCard
                key={idx}
                title={report.title}
                description={report.description}
                location={report.location}
                image={report.image}
                reportType={report.reportType}
                attended={report.attended}
              />
            ))
          ) : (
            <p>No hay reportes disponibles</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h1 className="pl-4 text-xl font-medium text-stellar-blue">
          <span className="inline-block border-b-[0.1rem] border-yellow-400 pb-1">
            <b>Noticias importantes</b>
          </span>
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner size="xl" />
          </div>
        ) : news?.length > 0 ? (
          <div className="flex flex-col gap-3 items-center h-full overflow-auto">
            {news?.map((notice, idx) => (
              <News key={idx} {...notice} />
            ))}
          </div>
        ) :
          (
            <p className="text-center">No hay noticias disponibles</p>
          )
        }

      </section>
    </div>
  );
}

function News({ img, title, content, publishedDate }) {
  return (
    <article className="flex gap-3 bg-white rounded-xl w-[95%] border-2 p-4">
      <img draggable="false" src={img} alt={title} className="rounded-xl h-28 w-28" />
      <div className="flex flex-col justify-evenly w-full px-6">
        <div className="flex justify-between">
          <h2 className="font-bold text-lg">{title}</h2>
        </div>
        <p>{content}</p>
        <p>{publishedDate}</p>
      </div>
    </article>
  );
}

