import './App.css';
import { HomePage } from "./pages/home";
import { NewsPage } from "./pages/news";
import { WordCloudPage } from "./pages/wordcloud";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";

import {
  Routes,
  Route,
  Link,
  BrowserRouter
} from 'react-router-dom';
const {Header, Content, Footer} = Layout;


const menuItems = [
  {
    label: <Link to="/">Home</Link>,
    key: "home"
  },
  {
    label: <Link to="/news">News</Link>,
    key: "news"
  },
  {
    label: <Link to="/wc">WordCloud</Link>,
    key: "wc"
  }
]


function App() {
  return (
    <div className="App">
      <Layout style={{ height: '100vh' }}>
        <BrowserRouter>        
            <Menu mode="horizontal" items={menuItems}/>
            
          <Content style={{ padding: '0 50px', height: '85vh'}}>
              <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/news" element={<NewsPage/>} />
              <Route path="/wc" element={<WordCloudPage/>} />
            </Routes>
          </Content>
          </BrowserRouter>
        <Footer>FinQ created By AnyCompany, 2022</Footer>
      </Layout>
    </div>      
  );
}

export default App;
