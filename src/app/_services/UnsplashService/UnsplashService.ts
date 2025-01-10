import { UnsplashPhoto } from "./types";
import { mapUnsplashPhotoToSearchBoxResult } from "./UnsplashService.mapper";

const UnsplashService = {
  getTrendingPhotos: async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_UNSPLASH_API_URL}/photos/random?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&count=2`
    );
    const data = (await res.json()) as UnsplashPhoto[];
    const searchBoxResults = data.map(mapUnsplashPhotoToSearchBoxResult);
    return searchBoxResults;
  },
};

export default UnsplashService;
