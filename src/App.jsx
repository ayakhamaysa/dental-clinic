import { MotionConfig } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <Hero />
      <Services />
      <BookingForm />
      <Footer />
    </MotionConfig>
  );
}
