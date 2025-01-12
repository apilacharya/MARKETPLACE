import { v2 as cloudinary } from "cloudinary";

export const Cloudinary = {
  upload: async (image: string) => {
    const res = await cloudinary.uploader.upload(image, {
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      folder: "bazzar_assets/",
    });

    return res;
  },
};

// https://res.cloudinary.com/dyvkdgfii/image/upload/v1/bazzar_assets/qi5khzkscdqlmhnn392c?_a=BAMCkGRi0

const BASE_CLOUDINARY_URL = `https://res.cloudinary.com/dyvkdgfii/image/upload/v1/`;

export const getCloudinaryUrl = (publicId: string) => {
  return `${BASE_CLOUDINARY_URL}/${publicId}`;
};
