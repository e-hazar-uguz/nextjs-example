'use client'
import { useEffect, useState } from 'react';

export default function Home() {
  
  const [siteTree, setSiteTree] = useState(null);
  let idURL='https://carv.ist/api.php?job=get_template&id='
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://carv.ist/api.php?job=get_site_tree&lang=1');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setSiteTree(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  let firstElement:any = siteTree?siteTree[0]:'';


  return (
    <div>
      <h1>Anasayfa gelecek</h1>
      <p>{idURL}{firstElement.id}</p>
    </div>
  );
}
