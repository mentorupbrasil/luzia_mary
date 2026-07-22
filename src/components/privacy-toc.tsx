"use client";

import { useEffect, useState } from "react";

type TocItem = {
  href: string;
  label: string;
  short: string;
};

export function PrivacyToc({ items }: { items: readonly TocItem[] }) {
  const [active, setActive] = useState(items[0]?.href ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target;
        if (top?.id) setActive(`#${top.id}`);
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0.08, 0.25, 0.5, 0.75],
      },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="privacy-toc">
      <button
        type="button"
        className="privacy-toc-toggle"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        Nesta política
        <span aria-hidden>{open ? "−" : "+"}</span>
      </button>

      <div className={`privacy-toc-panel${open ? " is-open" : ""}`}>
        <p className="privacy-toc-title">Nesta política</p>
        <nav className="privacy-toc-nav" aria-label="Índice da política de privacidade">
          {items.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`privacy-toc-link${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="privacy-toc-link-full">{item.label}</span>
                <span className="privacy-toc-link-short">{item.short}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
