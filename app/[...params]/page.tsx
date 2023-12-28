'use client'
import React, { FC, useEffect } from 'react'
import Custom404 from '../404/page';
import { useRouter } from 'next/router';
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

const getLocalStorageData = (key:any) => {
  try {
    const data = localStorage.getItem(key);
    
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('LocalStorage error: ', error);
    return null;
  }
}
const aliasData= getLocalStorageData('aliasData');

const baseURL='https://carv.ist/tr/'
interface pageProps{
    params: {params:string}
}


const page : FC<pageProps>  = ({params}) => {

  let originParams= params.params.toString()
  const valueExists = aliasData.includes(originParams);
  console.log(valueExists)
  
  if (!valueExists) {
    return (
      <div>
         <Custom404></Custom404>
      </div>
    
    );
  }
  return (
    window.location.href =baseURL+originParams
  );
  };
export default page

/*
interface pageProps{
  params: {params:string};
  requestedParam: string;
}

const page : FC<pageProps>  = ({params,requestedParam}) => {
  console.log(params)
  console.log(requestedParam)
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
*/