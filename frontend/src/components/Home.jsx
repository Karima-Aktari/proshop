import Header from "./Header";

function Home() {
  return (
    <>
      <Header />
      <main className="py-6">
        <div className="container">
          <h1 className="text-3xl  text-amber-300 font-bold underline">
            Welcome To Proshop
          </h1>
        </div>
      </main>
    </>
  );
}

export default Home;
