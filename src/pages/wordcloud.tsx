import React, {useState, useEffect} from 'react';
import { WordCloud } from '@ant-design/plots';


const WordCloudPage = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      if(data.length === 0)
        asyncFetch();
    }, []);
  
    const asyncFetch = () => {
      fetch('https://7ch64e1bgc.execute-api.ap-northeast-2.amazonaws.com/dev/api/analytics/wc/topics')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error);
        });
    };
    const config = {
      data,
      autoFit: false,
      wordField: 'text',
      weightField: 'value',
      colorField: 'text',
      wordStyle: {
        fontFamily: 'Verdana',
      }
    };
    return <WordCloud {...config} />;
  };

  export {WordCloudPage};