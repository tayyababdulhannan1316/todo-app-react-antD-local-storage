import { useAuthContext } from "@/context/Auth";
import {Row , Col, Typography} from "antd"

const { Title } = Typography;
const Hero = () => {
  
  const { user } = useAuthContext()
  return (
    <div className=" py-5">
      <div className="container">
         <Row>
          <Col span={24}>
                <Title level={1} >Home Page</Title>
                <Title level={2} >Hero Section</Title> 
                <Title level={2} >UID: {user.uid}</Title> 
                <Title level={2} >fullName: {user.fullName}</Title>
                <Title level={2} >Email: {user.email}</Title>
                
                       
          </Col>
        </Row>
        
      </div>
    </div>
  );
};

export default Hero;
