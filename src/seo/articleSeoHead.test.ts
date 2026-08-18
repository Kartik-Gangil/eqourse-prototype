// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { applyArticleSeo } from "./articleSeoHead";

const selectors = {
  title: "head > title",
  description: 'head > meta[name="description"]',
  canonical: 'head > link[rel="canonical"]',
};

describe("CMS article SEO ownership", () => {
  it("replaces every server and client duplicate with one admin-sourced value", () => {
    document.head.innerHTML = `
      <title>Homepage title</title><title>Old article title</title>
      <meta name="description" content="Homepage description">
      <meta name="description" content="Old description">
      <link rel="canonical" href="https://www.eqourse.com/">
      <link rel="canonical" href="https://www.eqourse.com/blog/old">
      <meta property="og:title" content="Homepage title">
    `;

    applyArticleSeo(document, {
      title: "Admin Blog Title | eQOURSE",
      description: "The description saved in the admin panel.",
      canonical: "https://www.eqourse.com/blog/new-blog",
      keywords: ["education", "K12"],
      image: "https://www.eqourse.com/uploads/new-blog.webp",
    });

    expect(document.querySelectorAll(selectors.title)).toHaveLength(1);
    expect(document.querySelectorAll(selectors.description)).toHaveLength(1);
    expect(document.querySelectorAll(selectors.canonical)).toHaveLength(1);
    expect(document.title).toBe("Admin Blog Title | eQOURSE");
    expect(document.querySelector<HTMLMetaElement>(selectors.description)?.content).toBe(
      "The description saved in the admin panel.",
    );
    expect(document.querySelector<HTMLLinkElement>(selectors.canonical)?.href).toBe(
      "https://www.eqourse.com/blog/new-blog",
    );
  });

  it("replaces previous metadata when a published case study is edited", () => {
    applyArticleSeo(document, {
      title: "First title",
      description: "First description",
      canonical: "https://www.eqourse.com/casestudy/example",
    });
    applyArticleSeo(document, {
      title: "Updated admin title",
      description: "Updated admin description",
      canonical: "https://www.eqourse.com/casestudy/example",
    });

    expect(document.querySelectorAll(selectors.title)).toHaveLength(1);
    expect(document.querySelectorAll(selectors.description)).toHaveLength(1);
    expect(document.title).toBe("Updated admin title");
    expect(document.querySelector<HTMLMetaElement>(selectors.description)?.content).toBe(
      "Updated admin description",
    );
  });
});
