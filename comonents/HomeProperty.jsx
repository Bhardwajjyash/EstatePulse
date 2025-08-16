'use server';

import { prisma } from '@/lib/prisma';


import PropertyCard from './PropertyCard';

const HomeProperty = async () => {
  const recentProperty = await prisma.property.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
  });

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
          Recent Property
        </h2>

        {recentProperty.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {recentProperty.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeProperty;
