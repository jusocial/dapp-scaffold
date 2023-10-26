import Header from './components/layouts/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/layouts/Footer';
import { Container } from '@mui/material';

export default function App() {

  return (
    <>
      <Header />

      <div id="main">
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </div>

      <Footer />
    </>
  );
}
