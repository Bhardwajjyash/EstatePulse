

import PropertyCard from '@/comonents/PropertyCard';
import {prisma} from '@/lib/prisma'

const PropertiesPage = async() => {
  const properties = await prisma.property.findMany({
    orderBy:{createdAt:'desc'},
    take:10,
  })
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property}/>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default PropertiesPage;
