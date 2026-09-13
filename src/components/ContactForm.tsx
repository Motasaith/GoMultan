"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/icons";

const field = "h-12 w-full border border-line bg-white px-4 outline-none transition focus:border-ink";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="flex animate-fade-up items-center justify-center gap-2 bg-sand p-8 font-medium text-clay">
        <CheckIcon /> Thanks, your message is on its way.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      <input required placeholder="Your name" className={field} />
      <input required type="email" placeholder="Email address" className={field} />
      <input placeholder="Phone (optional)" className={`${field} sm:col-span-2`} />
      <textarea required rows={6} placeholder="How can we help?" className={`${field} h-auto py-3 sm:col-span-2`} />
      <button className="btn btn-dark justify-center sm:col-span-2">Send message</button>
    </form>
  );
}
