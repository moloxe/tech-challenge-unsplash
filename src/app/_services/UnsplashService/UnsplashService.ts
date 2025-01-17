import { UnsplashPhoto } from "./UnsplashService.types";
import { mapUnsplashPhotoToSearchBoxResult } from "./UnsplashService.mapper";

const IMAGES_PER_QUERY = 10;

const UnsplashService = {
  getTrendingPhotos: async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_UNSPLASH_API_URL}/photos/random?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&count=${IMAGES_PER_QUERY}`
    );
    const data = (await res.json()) as UnsplashPhoto[];
    const searchBoxResults = data.map(mapUnsplashPhotoToSearchBoxResult);
    return searchBoxResults;
  },
  getPhotosByQuery: async (query: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_UNSPLASH_API_URL}/search/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&query=${query}&per_page=${IMAGES_PER_QUERY}`
    );
    const data = (await res.json()).results as UnsplashPhoto[];
    const searchBoxResults = data.map(mapUnsplashPhotoToSearchBoxResult);
    return searchBoxResults;
  },
};

export default UnsplashService;
