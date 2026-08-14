"use client";
import "cap-widget";

export const CAP_API_ENDPOINT = "https://cap.rgsscs.org/624b125cd5/"; //TODO: Change to env

export default function Capcha() {
  return (
    <div suppressHydrationWarning>
      <cap-widget
        data-cap-api-endpoint={CAP_API_ENDPOINT}
        suppressHydrationWarning
      />
    </div>
  );
}