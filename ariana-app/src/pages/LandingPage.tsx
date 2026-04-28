import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { Trust } from '../components/sections/Trust';
import { Services } from '../components/sections/Services';
import { BookingWizard } from '../components/booking/BookingWizard';
import { FAQ } from '../components/sections/FAQ';
import { Gallery } from '../components/sections/Gallery';
import { FinalCTA } from '../components/sections/FinalCTA';

export function LandingPage() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <Trust />
      <Services />
      <BookingWizard />
      <FAQ />
      <Gallery />
      <FinalCTA />
      <Footer />
    </div>
  );
}
