import { describe, expect, test } from "vitest";
import { mapUnsplashPhotoToSearchBoxResult } from "./UnsplashService.mapper";
import { UnsplashPhoto } from "./UnsplashService.types";

describe("UnsplashService", () => {
  test("mapUnsplashPhotoToSearchBoxResult", () => {
    const photo: UnsplashPhoto = {
      id: "123",
      user: {
        name: "John Doe",
      },
      alt_description: "A photo",
      urls: {
        small: "https://example.com/image.jpg",
        full: "https://example.com/image.jpg",
        raw: "https://example.com/image.jpg",
        regular: "https://example.com/image.jpg",
        small_s3: "https://example.com/image.jpg",
        thumb: "https://example.com/image.jpg",
      },
      created_at: "2025-01-01T00:00:00Z",
      topic_submissions: {
        topic1: {
          approved_on: "2025-01-01T00:00:00Z",
          status: "approved",
        },
        topic2: {
          approved_on: "2025-01-01T00:00:00Z",
          status: "approved",
        },
      },
    };

    const result = mapUnsplashPhotoToSearchBoxResult(photo);

    expect(result).toEqual({
      id: "123",
      author: "John Doe",
      tags: ["topic1", "topic2"],
      imageUrl: "https://example.com/image.jpg",
      takenDate: "January 1, 2025",
    });
  });
});
