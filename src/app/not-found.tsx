import Link from "next/link";

export default function NotFound() {
  return (
    <div className="tb-frame mx-auto max-w-2xl bg-[#fffdf9] p-10 text-center">
      <div className="tb-section-chip bg-[#f5c1b5]">404</div>
      <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-[#25314d]">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-slate-700">
        The page you requested does not exist. If you followed a task link, the index may be outdated.
      </p>
      <div className="mt-6">
        <Link
          className="tb-focus-ring tb-button-primary"
          href="/"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
