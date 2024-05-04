//Next js uses
//Ant design = pros easy to use, supports IOS,Android, and web applications
//Code written in type script
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "../public/css/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "../components/TopNav";
import { Provider } from "../context";
// Normal fuction vs Arrow function
function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
