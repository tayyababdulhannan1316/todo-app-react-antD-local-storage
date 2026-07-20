import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Paragraph } = Typography;

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Footer
      style={{
        background: "#1d3550",
        textAlign: "center",
        padding: "16px 0",
      }}
    >
      <Paragraph
        style={{
          color: "#fff",
          margin: 0,
          fontFamily:"ui-sans-serif",
            fontWeight:"bold",
            fontSize:19
        }}
      >
        © {currentYear}. All rights reserved.
      </Paragraph>
    </Footer>
  );
};

export default Copyright;