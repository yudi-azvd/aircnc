import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import socketio from 'socket.io-client'

import api from '../../services/api'
import './styles.css'

export default function Dashboard() {
  const [spost, setSpots] = useState([])
  const [requests, setResquests] = useState([])

  const user_id = localStorage.getItem('user')
  
  // memorizar a conexão socket
  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { user_id }
  }), [user_id]) // refazer a conexão c usuário apenas quando user_id mudar
  
  useEffect(() => {
    socket.on('booking_request', data => {
      setResquests([...requests, data])
    })
  }, [requests, socket])

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

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`)    
    setResquests(requests.filter(request => request._id !== id))
  }
  
  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`)    
    setResquests(requests.filter(request => request._id !== id))
  }

  return (
    <>
    <ul className='notifications'>
      {requests.length === 0? console.log('request vazio', requests) : ''}
      {requests.map(request => (
        <li key={request._id}>
          <p>
            <strong>{request.user.email}</strong> 
            está solicitando uma reserva em <strong>{request.spot.company}</strong>
            para a data: <strong>{request.date}</strong>. 
          </p>
          <button className='accept' onClick={() => handleAccept(request._id)} >ACEITAR</button>
          <button className='reject' onClick={() => handleReject(request._id)} >REJEITAR</button>
        </li>
      ))}
    </ul>

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