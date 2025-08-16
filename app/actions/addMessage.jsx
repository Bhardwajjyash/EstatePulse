"use server";

import { prisma } from "@/lib/prisma";
import  getSessionUser  from "@/utils/getSessionUser";


async function addMessage(formData) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;
  const recipient =  formData.get('recipient')
  if(userId === recipient){
    return(error:'You can not send Message to yourself ')
  }
}

export default addMessage;
