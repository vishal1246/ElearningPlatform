import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";
const UserRoute = ({ children, showNav }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/login");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {ok ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">{showNav && <UserNav />}</div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
      ) : (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      )}
    </>
  );
};
export default UserRoute;
