import cloudinary from "cloudinary";
// import fs from "fs";

cloudinary.config({
  cloud_name: "dwvw7qjhc",
  api_key: "314617868791443",
  api_secret: "QxOC9ZZgzlLs_smtURSDjejqAi8",
});

export const cloudinaryUpload = async (req) => {
  //   fs.writeFileSync("./" + req.file?.originalname, req.file?.buffer);
  const data = await cloudinary.v2.uploader.upload(req.file.path);

  //   fs.unlinkSync("./" + req.file?.originalname);

  return data;
};

//Cloudinary image delete
export const cloudinaryImageDelete = async (publicId) => {
  await cloudinary.v2.uploader.destroy(publicId);
};
