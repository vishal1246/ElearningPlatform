import { useState, useEffect } from "react";
import Link from "next/link";

const UserNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  return (
    <div className={`nav-link ${current === "/user" && "active"}`}>
      <Link href="/user">Dashboard</Link>
    </div>
  );
};

export default UserNav;
