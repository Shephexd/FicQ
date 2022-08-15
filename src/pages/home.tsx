import { Table, Tag } from 'antd';
import { Col, Row, Divider } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {useState, useEffect} from 'react';
import { WordCloudPage } from "./wordcloud";
import { TinyColumn } from '@ant-design/plots';

const Card: React.FC<{ children: React.ReactNode; value: number }> = props => (
    <p className={`height-${props.value}`}>{props.children}</p>
  );

interface TableRowType {
    id: React.Key;
    ticker: string;
    title: string;
    release_date: string;
    provider: string;
    url: string;
  }

const columns: ColumnsType<TableRowType> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      responsive: ['md'],
      render: (value, record) => {return <a href={record.url}>{value}</a>}
    },
    {
        title: 'Symbol',
        dataIndex: 'ticker',
        key: 'ticker',
        render: text => <Tag>{text}</Tag>,
      },    
    {
        title: 'Provider',
        dataIndex: 'provider',
        key: 'provider',
        responsive: ['lg'],
      },
  ];


const NewsTable = () => {
    const [data, setData] = useState<TableRowType[]>([]);

    useEffect(() => {
        if(data.length == 0)
          asyncFetch();
      }, []);
    
    const asyncFetch = () => {
        fetch('https://7ch64e1bgc.execute-api.ap-northeast-2.amazonaws.com/dev/api/analytics/news')
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => {
            console.log('fetch data failed', error);
          });
      };
    
    return <Table columns={columns} dataSource={data} />
}


interface MarketIndexType {
    name: string;
    interval: string;
    unit: string;
    data: [];
  }


const IndexSummaryBarChart = (key: string, color: string) => {
    const TinyIndexBar = (props: {data: number[]}) => {
        
        const config = {
          height: 80,
          autoFit: true,
          data: props.data,
          smooth: true,
          color: color,
        };
        return <TinyColumn {...config} />;
      };
    
    const [name, setName] = useState<string>();
    const [interval, setInterval] = useState<string>();
    const [data, setData] = useState<number[]>([]);

    useEffect(() => {
        if(data.length === 0)
          asyncFetch(key);
      }, []);

    const asyncFetch = (key: string) => {
        fetch('https://7ch64e1bgc.execute-api.ap-northeast-2.amazonaws.com/dev/api/market/index/' + key).then(
            (response) => response.json()
        ).then(
            (resp: MarketIndexType) => {
                setName(resp.name);
                setInterval(resp.interval);
                setData(
                    resp.data.slice(0, 30).reverse().map(
                                ({date, value}: any) => parseFloat(value)
                        )
                    )
            }
        ).catch((error) => {
            console.log('fetch data failed', error);
          });
    }
        return <Card value={500}>
            <TinyIndexBar data={data}/>
            <p>{name} - {interval}</p>
        </Card>;
}


const HomePage = () => {
    const marketIndex = [
        "INFLATION", "INFLATION_EXPECTATION", "CONSUMER_SENTIMENT", "UNEMPLOYMENT"
    ];
    const indexColors = ["#80C980", "#FDAACC", "#9D0A0C", "#ADBA0C"];
    const indexRow = marketIndex.map((row, key) => (
            <Col span={6}>{IndexSummaryBarChart(row, indexColors[key])}</Col>
        ));
        
    return (
    <div>
        <Divider orientation="left">Macro Index</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {indexRow}
        </Row>
        <Divider orientation="left">Top Articles</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
                <NewsTable/>
            </Col>
        </Row>
        <Divider orientation="left">Hot Keywords</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
                <Card value={500}>
                    <WordCloudPage/>
                </Card>
            </Col>
        </Row>
    </div>)
};

export {HomePage};