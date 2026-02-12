import MapWidget from "../../components/Map/MapWidget";

function Home() {
  return (
    <div className="flex flex-col w-full max-h-400px">

      <div className=" ">
        <div className="flex flex-col">
          <MapWidget />
          <div className="p-8 bg-white">
            <h2 className="text-xl font-bold">Informações Adicionais</h2>
            <p>Page onde salvará favoritos</p>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Home;
