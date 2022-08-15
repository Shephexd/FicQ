import React, { useState, useEffect } from 'react';
import { Col, Row, Divider } from 'antd';
import { Treemap } from '@ant-design/plots';


const DemoTreemap = (assetKey: string) => {
  const [fetchData, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://7ch64e1bgc.execute-api.ap-northeast-2.amazonaws.com/dev/api/market/map/' + assetKey)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const data = {
    name: 'root',
    children: fetchData,
  };
  const config = {
    data,
    colorField: 'category',
    tooltip: {
      follow: true,
      enterable: true,
      offset: 5,
      customContent: (value: any, items: any[]) => {
        if (!items || items.length <= 0) return;
        const { data: itemData } = items[0];
        const parent = itemData.path[1];
        const root = itemData.path[itemData.path.length - 1];
        return (
          `<div class='container'>` +
          `<div class='title'>${itemData.name}</div>` +
          `<div class='tooltip-item'><span>Category: </span><span>${itemData.category}</span></div>` +
          `</div>`
        );
      },
    },
  };

  return <Treemap {...config} />;
};

  const MarketPage = () => {

    return <div>
        <Divider orientation="left">ETFs</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={24}>
            {DemoTreemap("etfs")}
          </Col>
        </Row>      
        <Divider orientation="left">Stocks</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={24}>
            {DemoTreemap("stocks")}
          </Col>
        </Row>              
      </div>
  }
  
  export {MarketPage};