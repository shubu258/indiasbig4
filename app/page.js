import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Reviews from "@/components/Reviews";
import Process from "@/components/Process";
import Brands from "@/components/Brands";
import Faqs from "@/components/Faqs";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Effects from "@/components/Effects";

export default function Home() {
  return (
    <>
      <div className="preloader" aria-hidden="true">
        <div className="pl-cube">
          <span className="face front">S&amp;S</span>
          <span className="face back" />
          <span className="face right" />
          <span className="face left" />
          <span className="face top" />
          <span className="face bottom" />
        </div>
      </div>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Team />
        <Reviews />
        <Process />
        <Brands />
        <Faqs />
        <Newsletter />
      </main>
      <Footer />
      <Effects />
    </>
  );
}
