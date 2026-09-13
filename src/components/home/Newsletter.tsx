"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { CheckIcon, MailIcon } from "@/components/icons";

export default function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <section className="bg-sand py-16">
      <Reveal className="container-x flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
        <div className="flex flex-col items-center gap-5 lg:flex-row">
          <span className="grid size-16 place-items-center rounded-full bg-white text-clay">
            <MailIcon size={28} />
          </span>
          <div>
            <h2 className="section-title text-3xl font-semibold">Join the GoMultan Circle</h2>
            <p className="text-muted">Get 10% off your first order, plus early access to new drops.</p>
          </div>
        </div>

        {done ? (
          <p className="flex animate-fade-up items-center gap-2 font-medium text-clay">
            <CheckIcon /> Thanks! Check your inbox for your code.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="flex w-full max-w-lg"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="h-14 flex-1 border border-r-0 border-line bg-white px-5 outline-none focus:border-ink"
            />
            <button className="btn btn-dark h-14">Subscribe</button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
