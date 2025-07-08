import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Home'
import ItemDetailPage from "./ItemDetailPage";

const App = () => {
  const [data, setData] = useState(null)
  const urlAPI = 'http://localhost:3000'

  const fetchData = async() => {
    try {
      const res = await fetch(urlAPI)
      if(!res.ok) throw new Error('Problem fetching from database')
      const resData = await res.json()
      setData(resData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  return (
    <Router>
      <div>
        <nav>
          <Link to='/'>Inicio</Link>
        </nav>
        {data === null ? (
          <div>Cargando...</div>
          ) : (
          <Routes>
            <Route path="/" element={<Home data={data}/>}/>
            {data.map(item => {
              return <Route key={item._id} path={`/${item._id}`} element={<ItemDetailPage item={item}/>}/>
            })}
          </Routes>
        )}
      </div>
    </Router>
  )
};

export default App;
