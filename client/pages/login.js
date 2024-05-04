import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
const Login = () => {
  const [email, setEmail] = useState("vishalaggarwal372@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState("");
  const Router = useRouter();
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  useEffect(() => {
    if (user !== null) Router.push("/user");
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent Defalut behaviour as the page reloads
    try {
      setLoading(true);
      const { data } = await axios.post("/api/login", {
        email,
        password,
      });
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      window.localStorage.setItem("user", JSON.stringify(data));
      // redirect
      Router.push("user");
      toast.success("Login successful.");
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">Login</h1>
      <div className="container col-md-4 offset-md-4 pd-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 pd-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <input
            type="text"
            className="form-control mb-4 pd-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <button
            className="btn btn-block btn-primary"
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin></SyncOutlined> : "Submit"}
          </button>
        </form>
        <p className="text-center pt-3">
          Not registered?
          <Link href="/register">register</Link>
        </p>
        <p className="text-center">
          <Link href="/forgot-password" className="text-danger">
            Forgot Password
          </Link>
        </p>
      </div>
    </>
  );
};
export default Login;
