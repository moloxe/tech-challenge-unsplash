import { SearchBoxResult } from "@/app/_types/search-box";
import { UnsplashPhoto } from "./UnsplashService.types";

const mapUnsplashPhotoDate = (date: string): string => {
  const parseDate = new Date(date);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = parseDate.getUTCDate();
  const month = months[parseDate.getUTCMonth()];
  const year = parseDate.getUTCFullYear();

  return `${month} ${day}, ${year}`;
};

export const mapUnsplashPhotoToSearchBoxResult = (
  photo: UnsplashPhoto
): SearchBoxResult => {
  const date = mapUnsplashPhotoDate(photo.created_at);
  const tags = Object.keys(photo.topic_submissions).slice(0, 3);
  return {
    id: photo.id,
    author: photo.user.name,
    tags,
    imageUrl: photo.urls.small,
    takenDate: date,
  };
};
