// Only needed data type is specified
export type UnsplashPhoto = {
  id: string;
  created_at: string;
  alt_description: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  topic_submissions: {
    [tag: string]: {
      status: string;
      approved_on: string;
    };
  };
  user: {
    name: string;
  };
};
