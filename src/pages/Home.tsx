import Hero from '../components/home/Hero';
import ServicesPreview from '../components/home/ServicesPreview';
import Stats from '../components/home/Stats';
import WhyUs from '../components/home/WhyUs';

const Home = () => {
    return (
        <>
            <Hero />
            <ServicesPreview />
            <Stats />
            <WhyUs />
        </>
    );
};

export default Home;