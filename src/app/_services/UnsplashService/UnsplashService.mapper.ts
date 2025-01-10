import { SearchBoxResult } from "@/app/_types/search-box";
import { UnsplashPhoto } from "./UnsplashService.types";

export const mapUnsplashPhotoToSearchBoxResult = (
  photo: UnsplashPhoto
): SearchBoxResult => {
  const date = new Date(photo.created_at);
  let month = date.toLocaleString("en-US", {
    month: "long",
  });
  month = month.charAt(0).toUpperCase() + month.slice(1);
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
