import Container from '../components/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';

function Home() {

  return (
    <>
    <Header home />
    <Container>
      <Hero />
      <Footer />
    </Container>
    </>
  );
}

export default Home;
