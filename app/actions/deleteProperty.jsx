"use server";
import cloudinary from "@/config/cloudinary";
import { prisma } from "@/lib/prisma";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
async function deleteProperty(propertyId) {
  const session = await getSessionUser();
  if (!session || !session.userId) {
    throw new Error("UserId is required");
  }
  const { userId } = session;
  const property = await prisma.property.findUnique({
    where:{
        id : propertyId
    },
  });
  if (!property) {
    throw new Error("Property not found");
  }
  if (property.owner.toString() !== userId) {
    throw new Error("User not Aauthorized");
  }
  //extract public id from image url
  const publicIds = property.images.map((imageURL) => {
    const part = imageURL.split("/");
    return part.at(-1).split(".").at(0);
  });
  //delete from cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("/EstatePulse/" + publicId);
    }
  }
  await prisma.property.delete({
    where:{
        id : propertyId
    },
  });
  revalidatePath('/','layout');
}
export default deleteProperty;
