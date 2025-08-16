import PropertyEditForm from "@/comonents/PropertyEditForm";
import { prisma } from "@/lib/prisma";
const edit = async ( {params} ) => {
  const { id } = params;

  const property = await prisma.property.findUnique({
    where: {id},
  });
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24 ">
        <div className="bg-white px-6 py-8 mb-8 shadow-md rounded-md border m-4 md:m-0">
        <PropertyEditForm property={property} />
        </div>
      </div>{" "}
    </section>
  );
};

export default edit;
