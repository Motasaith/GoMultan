import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex flex-col items-center py-28 text-center">
      <p className="section-title animate-fade-up text-[8rem] font-semibold leading-none text-clay">404</p>
      <h1 className="section-title mt-4 animate-fade-up text-3xl font-semibold [animation-delay:120ms]">Page not found</h1>
      <p className="mt-3 animate-fade-up text-muted [animation-delay:240ms]">The page you&apos;re looking for has moved or doesn&apos;t exist.</p>
      <Link href="/" className="btn btn-dark mt-8 animate-fade-up [animation-delay:360ms]">Back to home</Link>
    </section>
  );
}
