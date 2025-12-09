import FAQ from "../../components/FAQ/FAQ";
import Footer from "../../components/footer/Footer";
import HeroSection from "../../components/hero/HeroSection";
import OurPlans from "../../components/our_plans/OurPlans";
import OurServices from "../../components/our_services/OurServices";
import OurTrainers from "../../components/our_trainers/OurTrainers";



function HomePage() {
    return (
        <>
            <HeroSection />
            <OurServices />
            <OurPlans />
            <OurTrainers />
            <FAQ />
            <Footer />
        </>
    )
}

export default HomePage;
