import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Baloni from "@/components/Baloni";
import Dekoracije from "@/components/Dekoracije";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Baloni />
        <Dekoracije />
        <Contact />
      </main>
    </>
  );
}
