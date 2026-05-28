"use client";

// Perhatikan ada tambahan /next-page/ di jalurnya
import PopularProducts from "./next-page/PopularProducts";
import FootInfo from "./next-page/FootInfo";
import WhyChooseUs from "./next-page/WhyChooseUs";
import HowToTopUp from "./next-page/HowToTopUp";
import Testimonials from "./next-page/Testimonials";
import FaqAndFooter from "./next-page/FaqAndFooter";

export default function NextPage() {
  return (
    <>
      <PopularProducts />
      <FootInfo />
      <WhyChooseUs />
      <HowToTopUp />
      <Testimonials />
      <FaqAndFooter />
    </>
  );
}