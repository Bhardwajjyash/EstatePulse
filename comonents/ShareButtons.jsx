'use client'

import { FaShare } from 'react-icons/fa';
import {
  FacebookShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
  WhatsappIcon,
  PinterestIcon
} from 'react-share';
const ShareButtons = ({ property }) => {
  const baseUrl = typeof window !== "undefined"
  ? window.location.origin
  : process.env.NEXTAUTH_URL; 
  const shareURL = `${baseUrl}/Properties/${property.id}`
  return (
   <>
   <h3 className='text-xl font-bold text-center pt-2'>
    Share this Property
   </h3>
   <div className='flex gap-3 justify-center pb-5'>
    <FacebookShareButton url={shareURL}
    quote={property.name}
    hashtag={`#${property.type.replace(/\s/g,'')}ForRent`}
    >
      <FacebookIcon size={40} round={true}/>
    </FacebookShareButton>
    <TwitterShareButton url={shareURL}
    title={property.name}
    hashtags={[`${property.type.replace(/\s/g,'')}ForRent`]}
    >
      <TwitterIcon size={40} round={true}/>
    </TwitterShareButton>
    <PinterestShareButton url={shareURL}
    description={property.name}
    media={property.images?.[0] || `${baseUrl}/fallback.jpg`}
    >
      <PinterestIcon size={40} round={true}/>
    </PinterestShareButton>
    <WhatsappShareButton url={shareURL}
    title={property.name}
    separator='::'
    >
      <WhatsappIcon size={40} round={true}/>
    </WhatsappShareButton>
   </div>
   </>
  );
};

export default ShareButtons;
