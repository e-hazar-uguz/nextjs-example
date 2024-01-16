'use client'
import React, { FC, useEffect, useState } from 'react'
import Custom404 from '../404/page';
import { useSiteTree } from '../page';

interface PageProps{
  params: {params:string}
}

const Page: React.FC<PageProps> = ({ params }) => {
  
  const siteTree = useSiteTree() || [];
  console.log(siteTree)
  if (siteTree.length === 0) {
    return (
      <div>
        <Custom404 />
      </div>
    );
  }

  let originParams :any;
  originParams=params.params;
  if (originParams.length > 1) {
    originParams = originParams.join('/');
    console.log('en az 2 parametre var ', originParams);
  } else {
    console.log('tek parametre var ', originParams);
  }

  const aliasData = siteTree.flatMap((page: any) => {
    const pageAliases = [page.alias, ...(page.sub_pages || []).map((subPage: any) => `${page.alias}/${subPage.alias}`)];
    return pageAliases.map((alias: string) => ({
      alias,
      id: page.id,
    }));
  });

  const filteredData = aliasData.filter((res: any) => res.alias.includes(originParams));

  if (filteredData.length === 0) {
    return (
      <div>
        <Custom404 />
      </div>
    );
  }

  return (
    <div>
      <h1>İstek yapılan parametre: "{params.params}" sistemde var olan</h1>
    </div>
  );
};


export default Page;

