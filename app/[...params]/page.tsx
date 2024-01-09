'use client'
import React, { FC, useEffect, useState } from 'react'
import Custom404 from '../404/page';
import { useRouter } from 'next/router';

interface pageProps{
  params: {params:string}
}

interface SiteTreeItem {
id: string;
title: string;
alias: string;
template: string;
link: string;
description: string;
keywords: string;
seo_title: string;
sub_pages?: SubPage[];
}

interface SubPage {
id: string;
title: string;
alias: string;
}

const fetchDataAndRenderPage = async () => {
try {
  const response = await fetch('https://carv.ist/api.php?job=get_site_tree&lang=1');
  if (response.ok) {
    const data = await response.json();
    let subPagesData: any[] = [];
    let aliasValues = data.map((item: any) => ({
      alias: item.alias,
      id: item.id,
    }));

    data.forEach((el: any) => {
      if (el.sub_pages) {
        const subPagesAlias = el.alias;
        subPagesData = el.sub_pages.map((item: any) => ({
          alias: subPagesAlias + '/' + item.alias,
          id: item.id,
        }));
      }
    });
    const mergedPageData = [...aliasValues, ...subPagesData];
    return mergedPageData;
  } else {
    console.error('Veri alınamadı:', response.statusText);
    return []; 
  }
} catch (error) {
  return []; 
}
};

const Page : React.FC<pageProps> = ({ params }) => {

const [pageData, setPageData] = useState<any[]>([]);

useEffect(() => {
  const fetchData = async () => {
    const data = await fetchDataAndRenderPage();
    if (data.length > 0) {
      setPageData(data);
    }
  };

  if (pageData.length === 0) {
    fetchData();
  }
}, [pageData]);

let originParams:any;
if(params.params.length>1){
  originParams=params.params;
  originParams=originParams.join('/')
  console.log('en az 2 parametre var ',originParams)
}
else{
  originParams=params.params.toString();
}

const aliasData:any = [];

pageData.forEach(res => {
    if (res &&  res.alias.includes(originParams)) {
        aliasData.push(res);
    }
});

  if (aliasData.length === 0) {
    return (
      <div>
          <Custom404></Custom404>
      </div>
    
    );
  }
    return (
      <div>
        <h1>İstek yapılan parametre: "{params.params}" sistemde var olan</h1>
      </div>
    );
  
};

export default Page