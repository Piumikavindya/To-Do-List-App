import React from 'react'

export default function Submit({ value}) {
  return (
   <input type="submit" className="w-full rounded dark:bg-white bg-secondary mt-4 hover:bg-opacity
   -90 transition dark:text-secondary text-white  text-center font-semibold text-lg cursor-pointer p-1  "
     value={value}/>

     
  );
}
