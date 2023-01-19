import React, { useState } from 'react'
import { IconType } from 'react-icons';
import Link from 'next/link';

type PropsType = {
  Icon: IconType;
  text: string;
  onClick?: () => {} ; 
}

function SideBarItem({ Icon, text }: PropsType) {

  return (
    <Link href={`/user/${text}`} passHref>
      <div className="flex ">
        <div
          className="flex justify-center  p-3 rounded-full group hover:bg-slate-100 transition-all duration-300  text-black cursor-pointer lg:mr-auto "
          
        >
          <Icon className="h-[1.5rem] w-[1.5rem]" />
          <p className="pl-3 group-hover:text-blue-400  hidden lg:inline  ">
            {text}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default SideBarItem