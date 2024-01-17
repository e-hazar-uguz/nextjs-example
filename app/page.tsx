import axios from 'axios';
import React from 'react'


export const getAllData = async () =>{
  const response = await fetch('https://carv.ist/api.php?job=get_site_tree&lang=1');
  return response.json();
}

 async function Home() {
  const siteTreeData = await getAllData();
  let idURL = 'https://carv.ist/api.php?job=get_template&id=';
  let firstElement: any = siteTreeData ? siteTreeData[0] : '';
  let mainPageURL=idURL+firstElement.id;
  const fetchTemplateHtml = async () => {
    try {
      const response = await axios.get(mainPageURL);
      return response.data;
    } catch (error) {
      console.error('Error fetching template:', error);
      return '';
    }
  };

  const mainPageTemplateHtml = await fetchTemplateHtml();
  console.log(mainPageTemplateHtml)
  return  <div dangerouslySetInnerHTML={{ __html: mainPageTemplateHtml.page }} />;
    // <div>
    //   <h1>Anasayfa gelecek</h1>
    //   <p>{idURL}{firstElement.id}</p>
    // </div>
}

export default Home;

