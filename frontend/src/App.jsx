import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <>
      <Header />
      <main>
        <Container className="py-3">{/* <HomeScreen /> */}</Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
