import { describe, expect, it } from "vitest";
import { commitments, contacts, demands, events, factChecks, posts, proposals } from "@/db/schema";

describe("updatedAt columns", () => {
  it("exists on all operational tables", () => {
    expect(demands.updatedAt).toBeTruthy();
    expect(contacts.updatedAt).toBeTruthy();
    expect(proposals.updatedAt).toBeTruthy();
    expect(commitments.updatedAt).toBeTruthy();
    expect(posts.updatedAt).toBeTruthy();
    expect(events.updatedAt).toBeTruthy();
    expect(factChecks.updatedAt).toBeTruthy();
  });
});
