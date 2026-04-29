import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="h1">Page not found.</h1>
      <p className="lede mt-4 max-w-md">
        That page doesn't exist — or it moved while we weren't looking.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Back home</Button>
        <Button href="/contact" variant="secondary">
          Book a free call
        </Button>
      </div>
    </section>
  );
}
