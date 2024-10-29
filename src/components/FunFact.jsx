export default function FunFact({ Icon, title, description }) {
  return (
    <article className="flex justify-center">
      <div className="bg-white text-black p-4 rounded-lg flex items-center justify-between w-[95%] shadow">
        <div className="flex items-center">
          <div className="bg-[#36a6ba] rounded-full p-2">
            <Icon size={28} className="text-white" />
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm mt-1">{description}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

