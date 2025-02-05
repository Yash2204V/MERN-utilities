import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
    <h1 className="bg-green-400">This is a joke right?</h1>
        <div className="flex gap-3">
          <Link to="/signup">SignUp</Link>
          <Link to="/signup">SignIn</Link>
        </div>
    </>
  )
}

export default Home