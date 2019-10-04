import React, { useState } from 'react'
import api from '../../services/api'

export default function Login({ history }) {
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault()

    const response = await api.post('/sessions', { email })
    const { _id } = response.data

    localStorage.setItem('user', _id)
    console.log()
    history.push('/dashboard') // ir p pgain de dashboard
  }

  return (
    <>
      <p>ofereça <strong>spots</strong> para programadores e 
      encontre <strong>talentos</strong> para sua empresa! </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">EMAIL *</label>
        <input 
          type="email" 
          id="email"
          placeholder="seu melhor email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          />
        <button className="btn">Entrar</button>
      </form>
    </>
  )
}