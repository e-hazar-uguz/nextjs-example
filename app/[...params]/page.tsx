'use client'
import React, { FC } from 'react'
import Custom404 from '../404/page';

// interface pageProps{
//     params: {params:string}
// }

// const page : FC<pageProps>  = ({params}) => {
//     console.log(params)
//   return (
//     <div>
//         <h1> istek yapılan parametre: {params.params} </h1>
//     </div>
//   )
// }

interface pageProps{
  params: {params:string};
  requestedParam: string;
}

const page : FC<pageProps>  = ({params,requestedParam}) => {
  console.log(params)
  if (requestedParam !== params.params) {
    return (
      <div>
         <Custom404></Custom404>
      </div>
    
    );
  }
  return (
    <div>
      <h1>İstek yapılan parametre: {params.params}</h1>
    </div>
  );
};

export default page