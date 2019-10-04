import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './styles.css'

export default function Dashboard() {
  const [spost, setSpots] = useState([]);

  useEffect(() => {
    /** executado apenas na primeira vez, geralmeente 
     * consultando uma API como em rotas index
    */
   async function loadSpots() {
      const user_id = localStorage.getItem('user')
      const response = await api.get('/dashboard', {
      headers: { user_id }
    });

    setSpots(response.data)
   }

   loadSpots()
  }, [ /* vaiaáveis que são escutadas por alterações */ ])

  return (
    <>
    <ul className="spot-list">
      {spost.map(spot => (
        <li key={spot._id}>
          <header style={{backgroundImage: `url(${spot.thumbnail_url})`}} />
          <strong>{spot.company}</strong>
          <span>{spot.price ? `R$ ${spot.price}/dia` : 'GRATUITO' }</span>
        </li>
        )
      )}
    </ul>
    
    <Link to='/new'>
      <button className='btn'>Cadastrar novo spot</button>
    </Link>

    </>
  )
}