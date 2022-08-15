import './App.css';
import { HomePage } from "./pages/home";
import { MarketPage } from "./pages/market";
import { WordCloudPage } from "./pages/wordcloud";
import "antd/dist/antd.min.css";
import { Layout, Menu } from "antd";

import {
  Routes,
  Route,
  Link,
  BrowserRouter
} from 'react-router-dom';
const {Content} = Layout;


function App() {
  const menuItems = [
    {
      label: <Link to="/">Home</Link>,
      key: "home"
    },
    {
      label: <Link to="/market">Market</Link>,
      key: "news"
    },
    {
      label: <Link to="/wc">WordCloud</Link>,
      key: "wc"
    }
  ]

  return (
    <div className="App">
      <Layout style={{ height: '100vh' }}>
        <BrowserRouter>        
            <Menu mode="horizontal" items={menuItems}/>
            
          <Content>
              <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/market" element={<MarketPage/>} />
              <Route path="/wc" element={<WordCloudPage/>} />
            </Routes>
          </Content>
          </BrowserRouter>
        {/* <Footer>FinQ created By AnyCompany, 2022</Footer> */}
      </Layout>
    </div>      
  );
}

export default App;