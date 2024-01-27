
"use server"
import path from "path"
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os"
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


async function savePhotoToLocal(formData){
 const files = formData.getAll('file')
 const bufferPromise = files.map(file => (
  file.arrayBuffer().then(data => {
   const buffer = Buffer.from(data)
   const name = uuidv4()
   const ext = file.type.split("/")[1]


   // const uploadDir = path.join(process.cwd(), "public", `/${name}.${ext}`)

   const tempdir = os.tmpdir();
   const uploadDir = path.join(tempdir,`/${name}.${ext}`);
   fs.writeFile(uploadDir, buffer)
   return {filePath: uploadDir, filename: file.name}
  })
 ))

 return await Promise.all(bufferPromise)
}

async function savePhotoToCloudinary(newFiles) {
  const photosPromise = newFiles.map(async (file) => {
    try {
      const result = await cloudinary.uploader.upload(file.filePath, {
        folder: "nextjs_upload",
      });
      return result;
    } catch (error) {
      throw new Error(`Error uploading file to Cloudinary: ${error.message}`);
    }
  });
  return await Promise.all(photosPromise);
}

export async function uploadImage(formData){
 try {
  const newFiles = await savePhotoToLocal(formData)
  const photos = await savePhotoToCloudinary(newFiles)

  //Delete photo files in temp folder after successful upload
  newFiles.map(file => fs.unlink(file.filePath))
   const photoData = photos.map((photo) => photo);
   return { photoData };
  
 } catch (error) {
  return {errMsg: error.message}
  
 }
}

export  async function deletePhoto (public_id){
 try {
  await cloudinary.uploader.destroy(public_id);
  return { msg: "Delete Success" };
  
 } catch (error) {
  return {errMsg: error.message}
  
 }
 

}