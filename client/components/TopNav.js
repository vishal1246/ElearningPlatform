import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link"; //No destructure in nextjs
import {
  AppstoreAddOutlined,
  CoffeeOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
const { Item, SubMenu, ItemGroup } = Menu;
function TopNav() {
  // const location = useLocation();
  const [current, setCurrent] = useState("");

  const Router = useRouter();
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    Router.push("/login");
  };
  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreAddOutlined />}
      >
        <Link href="/">Home</Link>
      </Item>
      {user && user.role && user.role.includes("Instructor") ? (
        <Item
          key="/instructor/course/create"
          onClick={(e) => setCurrent(e.key)}
          icon={<CarryOutOutlined />}
        >
          <Link href="/instructor/course/create">Create Course</Link>
        </Item>
      ) : (
        <Item
          key="/user/become-instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
        >
          <Link href="/user/become-instructor">Become Instructor</Link>
        </Item>
      )}
      {user === null && (
        <>
          <Item
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LogoutOutlined />}
          >
            <Link href="/login">Login</Link>
          </Item>
          <Item
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link href="/register">Register</Link>
          </Item>
        </>
      )}
      {user !== null && (
        <>
          <SubMenu
            icon={<CoffeeOutlined />}
            title={user && user.name}
            className="float-right"
          >
            <ItemGroup>
              <Item>
                <Link href="/user">Dashboard</Link>
              </Item>
              <Item onClick={logout} icon={<LogoutOutlined />}>
                Logout
              </Item>
            </ItemGroup>
          </SubMenu>
        </>
      )}

      {user && user.role && user.role.includes("Instructor") && (
        <Item
          key="/instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
          className="float-right"
        >
          <Link href="/instructor">Instructor</Link>
        </Item>
      )}
    </Menu>
  );
}
export default TopNav;
