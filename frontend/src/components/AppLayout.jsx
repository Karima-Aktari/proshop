import { Outlet } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import { Container } from "react-bootstrap";

function AppLayout() {
  return (
    <>
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default AppLayout;
