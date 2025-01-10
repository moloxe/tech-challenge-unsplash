import { SearchBoxResult } from "@/app/_types/search-box";
import { UnsplashPhoto } from "./types";

export const mapUnsplashPhotoToSearchBoxResult = (
  photo: UnsplashPhoto
): SearchBoxResult => {
  const date = new Date(photo.created_at);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  const tags = Object.keys(photo.topic_submissions).slice(0, 3);
  return {
    id: photo.id,
    author: photo.user.name,
    tags,
    imageUrl: photo.urls.small,
    takenDate: `${month} ${day}, ${year}`,
  };
};
