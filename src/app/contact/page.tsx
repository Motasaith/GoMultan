import type { Metadata } from "next";
import { brand } from "@/lib/data";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Contact" };

const cards = [
  { icon: PinIcon, title: "Visit us", text: brand.address },
  { icon: PhoneIcon, title: "Call or WhatsApp", text: brand.phone },
  { icon: MailIcon, title: "Email", text: brand.email },
];

export default function ContactPage() {
  return (
    <>
      <PageBanner title="Contact Us" crumbs={[{ label: "Contact" }]} />
      <section className="container-x py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <div className="group h-full border border-line p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-clay hover:shadow-xl">
                <span className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-sand text-clay transition-colors group-hover:bg-clay group-hover:text-white">
                  <c.icon size={26} />
                </span>
                <h2 className="font-display text-xl font-semibold">{c.title}</h2>
                <p className="mt-2 text-muted">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-16 max-w-3xl">
          <h2 className="section-title mb-2 text-center text-3xl font-semibold">Send us a message</h2>
          <p className="mb-8 text-center text-muted">We usually reply within one working day.</p>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
