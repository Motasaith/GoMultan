import Reveal from "@/components/Reveal";
import { HeadsetIcon, RefreshIcon, ShieldIcon, TruckIcon } from "@/components/icons";

const features = [
  { icon: TruckIcon, title: "Nationwide Delivery", text: "Free on orders over Rs 5,000" },
  { icon: RefreshIcon, title: "Easy Exchanges", text: "Within 14 days of delivery" },
  { icon: ShieldIcon, title: "Secure Payments", text: "Cards, wallets or cash on delivery" },
  { icon: HeadsetIcon, title: "Real Human Support", text: "WhatsApp us 10am to 8pm" },
];

export default function FeatureStrip() {
  return (
    <section className="border-b border-line">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <Reveal
            key={f.title}
            delay={i * 100}
            className={`group flex flex-col items-center gap-3 px-3 py-8 text-center sm:flex-row sm:text-left ${
              i % 2 === 0 ? "border-r border-line" : "lg:border-r"
            } ${i < 2 ? "border-b border-line lg:border-b-0" : ""} lg:last:border-r-0`}
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-sand text-clay transition-all duration-500 group-hover:bg-clay group-hover:text-white group-hover:[transform:rotateY(180deg)]">
              <f.icon size={26} />
            </span>
            <div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-muted">{f.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
