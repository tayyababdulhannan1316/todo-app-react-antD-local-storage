import { Alert } from "antd";

const Topbar = () => {
  return (
    <Alert
      banner
      type="info"
      title="🎉 Free shipping on orders over $100!"
      showIcon={false}
    />
  );
};

export default Topbar;

{
  /* <Alert
      title="A simple primary alert—check it out!"
      type="info"
      showIcon
    /> */
}
