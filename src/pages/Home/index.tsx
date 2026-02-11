import MapWidget from "../../components/Map/MapWidget";

function Home() {
  return (
    <div className="flex flex-col w-full max-h-400px">
      {/* <Header /> */}
      <div className=" ">
        <div className="flex flex-col">
          <MapWidget />
          <div className="p-8 bg-white">
            <h2 className="text-xl font-bold">Informações Adicionais</h2>
            <p>Page onde salvará favoritos</p>
          </div>
        </div>

        {/* <Sidebar /> */}
        <div className="bg-slate-200 p-4 text-center text-sm text-slate-600 bg-c-black">
          <h1>funcionos</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
