import HeroSlider from "@/components/home/HeroSlider";
import FeatureStrip from "@/components/home/FeatureStrip";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import ProductTabs from "@/components/home/ProductTabs";
import DealBanner from "@/components/home/DealBanner";
import PromoBanners from "@/components/home/PromoBanners";
import Marquee from "@/components/home/Marquee";
import BlogSection from "@/components/home/BlogSection";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeatureStrip />
      <CategoryShowcase />
      <ProductTabs />
      <DealBanner />
      <PromoBanners />
      <Marquee />
      <BlogSection />
      <Newsletter />
    </>
  );
}
