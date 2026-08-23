"use client";
import "cap-widget";
import { CAPTCHAURL } from "../_lib/captcha";

export default function Capcha() {
  return (
    <div>
      <cap-widget
        data-cap-api-endpoint={CAPTCHAURL}
      />
    </div>
  );
}