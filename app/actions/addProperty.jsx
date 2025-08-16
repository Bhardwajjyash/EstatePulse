"use server";

import { prisma } from "@/lib/prisma";
import  getSessionUser  from "@/utils/getSessionUser";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function addProperty(formData) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const amenities = formData.getAll("amenities");
  const images = formData
    .getAll("images")
    .filter((img) => img.name !== "");

  const property = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    street: formData.get("location.street"),
    city: formData.get("location.city"),
    state: formData.get("location.state"),
    zipcode: formData.get("location.zipcode"),
    beds: parseInt(formData.get("beds")),
    baths: parseInt(formData.get("baths")),
    squareFeet: parseInt(formData.get("square_feet")),
    amenities,
    nightly: parseInt(formData.get("rates.nightly")) || null,
    weekly: parseInt(formData.get("rates.weekly")) || null,
    monthly: parseInt(formData.get("rates.monthly")) || null,
    sellerName: formData.get("seller_info.name"),
    sellerEmail: formData.get("seller_info.email"),
    sellerPhone: formData.get("seller_info.phone"),
    isFeatured: false,
  };
  const imageUrls = [];
  for(const imageFile of images){
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);
    //convert to base 64
    const imageBase64 = imageData.toString('base64');
    //make request tot cloudinary
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`,{
        folder:'propertypulse'
    });
    imageUrls.push(result.secure_url);
  }
  property.images = imageUrls;

    const createdProperty = await prisma.property.create({
      data: property,
    });
    


    redirect(`/Properties/${createdProperty.id}`);
}

export default addProperty;
