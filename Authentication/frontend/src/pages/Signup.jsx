import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  
  return (
    <>
      <form action="" method="post">
        <div>
          <label className="" htmlFor="name">Name: </label>
          <input type="text" id="name" name="name" onChange={handleChange} value={formData.name} />
        </div>
        <div>
          <label className="" htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" onChange={handleChange} value={formData.email} />
        </div>
        <div>
          <label className="" htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" onChange={handleChange} value={formData.password} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>Already have an account? <Link to="/signin">Signin</Link></div>
    </>
  )
}

export default Signup