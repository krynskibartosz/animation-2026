import ShowOnDesktop from "@/components/projects/the-line/components/Client/ShowOnDesktop";
import ContactDesktop from "@/components/projects/the-line/components/ContactDesktop";
import ContactMobile from "@/components/projects/the-line/components/ContactMobile";

export default function Contact() {
  return (
    <section className="relative z-20">
      <ContactMobile className="lg:hidden" />
      <ShowOnDesktop>
        <ContactDesktop />
      </ShowOnDesktop>
    </section>
  );
}
