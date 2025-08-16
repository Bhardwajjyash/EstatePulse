import PropertyContactForm from "@/comonents/PropertyContactForm";
import PropertyDetails from "@/comonents/PropertyDetails";
import PropertyHeaderImage from "@/comonents/PropertyHeaderImage";
import PropertyImages from "@/comonents/PropertyImages";
import ShareButtons from "@/comonents/ShareButtons";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";


const PropertyPage = async ({params}) => {
  const propertyDetail = await prisma.property.findUnique({
    where: { id: params.id },
  });
  console.log("params.id:", params.id);
  console.log("propertyDetail:", propertyDetail);


  if (!propertyDetail) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Property not found</h2>
        <Link href="/Properties" className="text-blue-500 underline">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="">
      <PropertyHeaderImage image={propertyDetail.images?.[0] || "/fallback.jpg"} />
      <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/Properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className="mr-2"/> Back to Properties
        </Link>
      </div>
    </section>
    <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-[70%_30%] w-full gap-6">
        <PropertyDetails property={propertyDetail}/>
        <aside>
        <ShareButtons property={propertyDetail}/>
          <PropertyContactForm property={propertyDetail}/>
          
        </aside>
        </div>

        </div>
        </section>
      <PropertyImages images={propertyDetail.images}/>
    </div>
  );
};

export default PropertyPage;
