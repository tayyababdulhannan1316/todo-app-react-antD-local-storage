import {Row , Col , Typography} from "antd"

const { Title } = Typography;
const Map = () => {
  
  return (
    <div className=" py-5">
      <div className="container">
         <Row>
          <Col span={24}>
                <Title level={1} >Home Page</Title>
                <Title level={2} >Map Section</Title> 
                       
          </Col>
        </Row>
        
      </div>
    </div>
  );
};

export default Map;
