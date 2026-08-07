export type RoboticsAnalyticsEvent =
  | "robotics_page_view"
  | "robotics_primary_cta_click"
  | "robotics_secondary_cta_click"
  | "robotics_video_first_play"
  | "robotics_video_visible_4s"
  | "robotics_faq_open"
  | "robotics_internal_link_click"
  | "robotics_form_start";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackRoboticsEvent = (
  event: RoboticsAnalyticsEvent,
  parameters: Record<string, string | number | boolean | undefined> = {},
) => {
  if (typeof window === "undefined") return;

  const payload = Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => value !== undefined),
  );

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
};
