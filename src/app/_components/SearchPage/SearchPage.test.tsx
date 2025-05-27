import { describe, expect, test, vitest } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SearchPage from "./SearchPage";
import { AppRouterContextProviderMock } from "@/app/_tests/app-router.mock";
import { SearchBoxProvider } from "@/app/_hooks/useSearchBox";

global.IntersectionObserver = class MockIntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {}

  disconnect(): void {}

  observe(target: Element): void {}

  takeRecords(): any {
    return [];
  }

  unobserve(target: Element): void {}
};

describe("SearchPage", () => {
  test("load trending result", async () => {
    const push = vitest.fn();
    const { unmount } = render(
      <AppRouterContextProviderMock router={{ push }}>
        <SearchBoxProvider>
          <SearchPage />
        </SearchBoxProvider>
      </AppRouterContextProviderMock>
    );

    expect(screen.getByLabelText("Loading")).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByLabelText("Results")).toBeTruthy();
    });

    expect(screen.getByLabelText("Results").textContent).toMatch(
      /Trending Photos Right Now/
    );

    unmount();
  });
  test("load search results", async () => {
    const push = vitest.fn();
    const { unmount } = render(
      <AppRouterContextProviderMock router={{ push }}>
        <SearchBoxProvider>
          <SearchPage />
        </SearchBoxProvider>
      </AppRouterContextProviderMock>
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Results")).toBeTruthy();
    });

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "cats" } });
    fireEvent.click(screen.getByText("Search"));

    expect(screen.getByLabelText("Loading")).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByLabelText("Results")).toBeTruthy();
    });

    expect(screen.getByLabelText("Results").textContent).toMatch(/Results/);

    unmount();
  });
});
