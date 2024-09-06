import { useState } from "react"
import Feed from "../../Components/Feed/Feed"
import Sidebar from "../../Components/Sidebar/Sidebar"
import "./Home.css"

const Home = ({sidebar}) => {
  const [category,setCategory] = useState(0)
  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
      <div className={`container ${sidebar?"":"larger-container"}`}>
        <Feed category={category}/>
      </div>
    </>
  )
}

export default Home
