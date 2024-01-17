import React from 'react'
import Custom404 from '../404/page';
import { getAllData } from '../page';
import axios from 'axios';


interface PageProps{
  params: {params:string}
}

const Page: React.FC<PageProps> = ({ params }) => {

const fetchData = async () => {

  const siteTree = await getAllData();

  let originParams :any;
  originParams=params.params;
  if (originParams.length > 1) {
    console.log('default params :',originParams)
    originParams = originParams.join('/');
  } else {
    originParams=params.params.toString(); 
  }

  let subPagesData: any[] = [];
  let aliasValues = siteTree.map((item: any) => ({
    alias: item.alias,
    id: item.id,
  }));

  siteTree.forEach((el: any) => {
    if (el.sub_pages) {
      const subPagesAlias = el.alias;
      subPagesData = el.sub_pages.map((item: any) => ({
        alias: subPagesAlias + '/' + item.alias,
        id: item.id,
      }));
    }
  });

  const mergedPageData = [...aliasValues, ...subPagesData];

  let filteredData = mergedPageData.filter((res: any) => res.alias.includes(originParams));

  if (filteredData.length === 0) {
    return (
      <div>
        <Custom404 />
      </div>
    );
  }
  
  let hazar = filteredData.find((item:any) => item.alias == originParams);
  let templateUrl = `https://carv.ist/api.php?job=get_template&id=${hazar.id}`;

  const fetchTemplateHtml = async () => {
    try {
      const response = await axios.get(templateUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching template:', error);
      return '';
    }
  };
  
  const templateHtml = await fetchTemplateHtml();
  console.log(templateHtml)
   return <div dangerouslySetInnerHTML={{ __html: templateHtml.page }} />;
   //<div>  <h1>İstek yapılan parametre: "{params.params}" sistemde var olan</h1></div>    
};

return fetchData();
};



export default Page;

