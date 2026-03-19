"use client";

import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      className="tb-focus-ring tb-button-secondary w-full sm:w-[15rem]"
      onClick={handleClick}
      aria-label={`Copy email address ${email}`}
      title="Click to copy email address"
    >
      {copied ? "Copied" : email}
    </button>
  );
}
