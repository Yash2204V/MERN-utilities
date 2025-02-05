import { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <form action="" method="post">
        <div>
          <label className="" htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} />
        </div>
        <div>
          <label className="" htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>Don&apos;t have an account? <Link to="/signup">Signup</Link></div>
    </>
  )
}

export default Signin