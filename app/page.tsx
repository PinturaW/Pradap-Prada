import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeatureBar } from "@/components/feature-bar";
import { CategoryGemSection } from "@/components/category-gem-section";
import { StorySection } from "@/components/story-section";
import { QuizCtaBanner } from "@/components/quiz-cta-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StorySection />
      <CategoryGemSection />
      <QuizCtaBanner />
      <FeatureBar />
      <Footer />
    </main>
  );
}
