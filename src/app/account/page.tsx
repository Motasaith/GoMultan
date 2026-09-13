import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = { title: "My Account" };

const field = "h-12 w-full border border-line bg-white px-4 outline-none transition focus:border-ink";

export default function AccountPage() {
  return (
    <>
      <PageBanner title="My Account" crumbs={[{ label: "Account" }]} />
      <section className="container-x grid gap-10 py-16 md:grid-cols-2">
        {[
          { title: "Sign in", button: "Sign in", extra: <Link href="#" className="link-underline text-sm text-muted">Forgot password?</Link> },
          { title: "Create account", button: "Register", extra: <p className="text-sm text-muted">Get order tracking and faster checkout.</p> },
        ].map((f) => (
          <form key={f.title} className="animate-fade-up space-y-4 border border-line p-8">
            <h2 className="font-display text-2xl font-semibold">{f.title}</h2>
            <input type="email" required placeholder="Email address" className={field} />
            <input type="password" required placeholder="Password" className={field} />
            {f.extra}
            <button type="button" className="btn btn-dark w-full justify-center">{f.button}</button>
          </form>
        ))}
      </section>
    </>
  );
}
