"use client";
import "cap-widget";
import { CAPTCHA_URL } from "../_lib/captcha";

export default function Capcha() {
  return (
    <div suppressHydrationWarning>
      <cap-widget
        data-cap-api-endpoint={CAPTCHA_URL}
        suppressHydrationWarning
      />
    </div>
  );
}