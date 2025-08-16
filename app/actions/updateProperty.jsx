'use server'
import getSessionUser from "@/utils/getSessionUser";
import {prisma} from '@/lib/prisma';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
 async function updateProperty(propertyId ,formData)  {
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      throw new Error("User ID is required");
    }
  
    const { userId } = sessionUser;
    const existingUser = await prisma.property.findUnique({
        where:{
            id:propertyId,
        }
    });
    if(existingUser.owner.toString()!==userId){
        throw new Error('current user do not own this Property');
    }
    const updatedPropertyData = {
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
        amenities: formData.getAll("amenities"),
        nightly: parseInt(formData.get("rates.nightly")) || null,
        weekly: parseInt(formData.get("rates.weekly")) || null,
        monthly: parseInt(formData.get("rates.monthly")) || null,
        sellerName: formData.get("seller_info.name"),
        sellerEmail: formData.get("seller_info.email"),
        sellerPhone: formData.get("seller_info.phone"),
        isFeatured: false,
      };
      const updateProperty = await prisma.property.update({
        where:{
            id:propertyId,
        },
        data:updatedPropertyData,
      });
      revalidatePath('/','layout');
      redirect(`/Properties/${updateProperty.id}`);

 }
  
 export default updateProperty;