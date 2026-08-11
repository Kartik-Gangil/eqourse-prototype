import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ArticleContent from "./ArticleContent";

function renderContent(content: string, format: "markdown" | "html" = "markdown") {
  return render(
    <MemoryRouter>
      <ArticleContent content={content} format={format} />
    </MemoryRouter>,
  );
}

describe("ArticleContent", () => {
  it("renders Markdown links, bare URLs and GFM tables as crawlable HTML", () => {
    const { container } = renderContent(`
[Internal page](/learning-solutions) and [NCERT](https://ncert.nic.in/).

Also see https://www.eqourse.com/educational-content-development.

| Service | Result |
| --- | --- |
| Bridge course | Recovery |
`);

    expect(screen.getByRole("link", { name: "Internal page" })).toHaveAttribute("href", "/learning-solutions");
    expect(screen.getByRole("link", { name: "NCERT" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "https://www.eqourse.com/educational-content-development" })).toHaveAttribute("href", "/educational-content-development");
    expect(container.querySelector("table")).toBeInTheDocument();
  });

  it("does not execute raw HTML embedded in Markdown", () => {
    const { container } = renderContent('Safe text<script>alert("xss")</script>');
    expect(container.querySelector("script")).not.toBeInTheDocument();
  });

  it("sanitizes legacy HTML posts", () => {
    const { container } = renderContent('<p>Safe</p><img src="x" onerror="alert(1)"><script>alert(1)</script>', "html");
    expect(container.querySelector("script")).not.toBeInTheDocument();
    expect(container.querySelector("img")).not.toHaveAttribute("onerror");
  });
});
