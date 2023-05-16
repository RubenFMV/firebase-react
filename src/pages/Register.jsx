import { useState } from "react";
import { register } from "../config/firebase";
import { useRedirectActiveUser } from "../hooks/useRedirectAcitveUser";
import { useUserContext } from "../context/UserContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useUserContext();

  useRedirectActiveUser(user, "/dashboard");

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("diste submitting");
    try {
      const credencialUser = await register({ email, password });
      console.log(credencialUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handlesubmit}>
        <input
          type="email"
          name=""
          id=""
          placeholder="ingrese email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="ingrese password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
