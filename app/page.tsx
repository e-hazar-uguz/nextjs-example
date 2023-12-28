'use client'
import { useEffect, useState } from 'react';

export default function Home() {
  
  const [siteTree, setSiteTree] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://carv.ist/api.php?job=get_site_tree&lang=1');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();

        const aliasValues = data.map((item:any) => item.alias);
        
        const setLocalStorageData = (key:any, data:any) => {
          try {
            localStorage.setItem(key, JSON.stringify(data));
          } catch (error) {
            console.error('LocalStorage error: ', error);
          }
        };
        setLocalStorageData('aliasData', aliasValues);

        setSiteTree(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (siteTree === null) {
    return <p>Geliyor</p>;
  }

  return (
    <div>
      <pre>{JSON.stringify(siteTree, null, 2)}</pre>
    </div>
  );
}
