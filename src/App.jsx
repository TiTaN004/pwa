import { useEffect, useState } from "react";
import Home from "./components/Home";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import Products from "./components/Products";
import AboutUs from "./components/AboutUs";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import ProductSection from "./components/sections/ProductSection";
import ContactUsPage from "./components/ContactUsPage";
import SmoothScroller from "./components/common/SmoothScroolling";
import FloatingWhatsApp from "./components/common/FloatingWhatsApp";
import ProductDetails from "./components/ProductDetails";
import PremiumTextAnimation from "./components/PremiumTextAnimation";
import ECataloguePage from "./components/ECataloguePage";

function App() {
  const [showAnimation, setShowAnimation] = useState(true);

  // useEffect(() => {
  //   // Check if animation has been shown in this session
  //   const hasSeenAnimation = sessionStorage.getItem('hasSeenAnimation');
    
  //   if (hasSeenAnimation) {
  //     setShowAnimation(false);
  //   } else {
  //     sessionStorage.setItem('hasSeenAnimation', 'true');
  //   }
  // }, []);

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  if (showAnimation) {
    return <PremiumTextAnimation onComplete={handleAnimationComplete} />;
  }
  return (
    <>
      <main>
      {/* <SmoothScroller> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="products" element={<ProductSection />} />
          <Route path="contact" element={<ContactUsPage />} />
          <Route path="/product/:slug" element={<ProductDetails/>} />
          {/* <Route path="/product/:id" element={<ProductDetails/>} /> */}
          <Route path="/e-catalogue" element={<ECataloguePage/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <FloatingWhatsApp/>
      {/* </SmoothScroller> */}
      </main>
    </>
  );
}

export default App;
