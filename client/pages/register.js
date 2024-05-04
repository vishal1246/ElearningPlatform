import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const Router = useRouter();
  const {
    state: { user },
  } = useContext(Context);
  useEffect(() => {
    if (user !== null) Router.push("/");
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent Defalut behaviour as the page reloads
    try {
      setLoading(true);
      const { data } = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      setLoading(false);
      toast.success("Registration successful. Please Login.");
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">Register</h1>
      <div className="container col-md-4 offset-md-4 pd-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 pd-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
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
            disabled={!name || !email || !password || loading}
          >
            {loading ? <SyncOutlined spin></SyncOutlined> : "Submit"}
          </button>
        </form>
        <p className="text-center p-3">
          Already register?
          <Link href="/login">Login</Link>
        </p>
      </div>
    </>
  );
};
export default Register;
