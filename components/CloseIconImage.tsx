import React, { SVGProps } from 'react';

const CloseIconImage = ({fill, stroke}: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" stroke="none" fill={fill}/>
    <path d="M8 8L16 16" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 8L8 16" stroke={stroke} strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export default CloseIconImage;