export default function ReportCard({
    title,
    description,
    location,
    image,
    reportType,
    attended
}) {
    return (
        <div className="w-full px-2">
            <div className="relative bg-white border-2 rounded-[0.6rem] w-[18rem] h-auto overflow-hidden flex flex-col ">
                <div
                    className="absolute left-0 top-0 bottom-0 w-[0.5rem]"
                />
                <div className="flex flex-col justify-between h-full p-4 flex-grow">
                    {image && (
                        <img
                            src={image}
                            alt={title}
                            className="rounded-xl w-full h-20 object-cover mb-3"
                        />
                    )}
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-bold text-stellar-blue font-raleway truncate pr-2">
                            {title}
                        </h2>
                        <span
                            className={`text-xs font-bold py-1 px-2 rounded bg-green-light text-white`}
                        >
                            {reportType}
                        </span>
                    </div>

                    <span
                        className="text-red-500 text-[14px]"
                    >
                        {attended == false && (
                            <h1>No atendido</h1>
                        )}
                    </span>

                    {/* Descripción */}
                    <p className="text-stellar-grey text-[1rem] mb-2 line-clamp-3">
                        {description}
                    </p>

                    {/* Ubicación */}
                    {location && (
                        <p className="text-sm text-gray-500 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-stellar-blue mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zM12 21s-6-6.72-6-10a6 6 0 1112 0c0 3.28-6 10-6 10z"
                                />
                            </svg>
                            {location}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
