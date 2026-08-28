import type { HTMLAttributes, RefAttributes } from "react";
import type { CapWidget } from "cap-widget";

type CapWidgetAttributes = HTMLAttributes<CapWidget> & RefAttributes<CapWidget> & {
  "data-cap-api-endpoint"?: string;
  "data-cap-hidden-field-name"?: string;
  "data-cap-worker-count"?: string;
  "data-cap-i18n-initial-state"?: string;
  "data-cap-i18n-verifying-label"?: string;
  "data-cap-i18n-solved-label"?: string;
  "data-cap-i18n-error-label"?: string;
  "data-cap-i18n-required-label"?: string;
  "data-cap-troubleshooting-url"?: string;
  required?: boolean | "";
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "cap-widget": CapWidgetAttributes;
    }
  }
}
