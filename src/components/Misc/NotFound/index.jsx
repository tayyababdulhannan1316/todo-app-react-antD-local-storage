import { useLottie } from "lottie-react";
import notFoundAnimation from "../../../assets/lottie/error404.json";

const NotFound = () => {
  const options = {
    animationData: notFoundAnimation,
    loop: true,

    
  };

  const { View } = useLottie(options);

  return (
    <main className="container text-center py-3" style={{width:"300px"}}>
      {View}
      <h1>404 - Page Not Found</h1>
    </main>
  );
};

export default NotFound;
// import Lottie from "lottie-react";
// console.log(Lottie);
// import * as LottieModule from "lottie-react";
// const Lottie = LottieModule.default;
// console.log("Lottie is:", Lottie, typeof Lottie);
// // import { default as Lottie } from "lottie-react";
// import notFoundAnimation from "../../../assets/lottie/404 error.json";

// const NotFound = () => {
//   return (
//     <main className="container text-center py-5">
//       {/* <div style={{ maxWidth: "500px", margin: "0 auto" }}> */}
//       {/* </div> */}
//         <Lottie animationData={notFoundAnimation} loop={true} />

//       <h1>404 - Page Not Found</h1>
//     </main>
//   );
// };

// export default NotFound;
