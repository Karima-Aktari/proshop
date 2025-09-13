import Footer from "../components/Footer";
import products from "../products";

function HomeScreen() {
  return (
    <>
      <main className="py-6">
        <div className="container">
          <h1 className="text-3xl  text-amber-300 font-bold underline">
            Latest Products
          </h1>
        </div>
        <div>
          {products.map((product) => (
            <div className="col-12 md:col-6 lg:col-3 key={product._id}">
              <h3>{product.name}</h3>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default HomeScreen;
