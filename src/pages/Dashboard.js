import React, { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import './Dashboard.css'

export default function Dashboard() {

  async function refresh(status) {
    const token = localStorage.getItem('token');

    console.log({login: status}, {token})

    try {
      const req = await fetch('http://localhost:3030/api/user', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
          body: JSON.stringify({
            loginAt: new Date(),
            logoutAt: new Date(),
            login: status            
          })
        }
      )
      const data = await req.json()
      console.log(data)
      if (!status) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    } catch (err) {
      console.log('error')
    }
  }

   function update(event) {

    event.preventDefault()
    refresh(false)
  }

  useEffect(() => {
		const token = localStorage.getItem('token')
    console.log(token)
		if (token) {
			const user = jwt_decode(token)
      console.log(user)
			if (!user) {
        localStorage.removeItem('token')
        window.location.href = '/login'
			} else {
        refresh(true)
			}
		} else {
      window.location.href = '/login'
    }
  },[])

  return (
    <div>
    
        <div className="container">
          <div className='row'>
          <a className="navbar-brand" href="/dashboard">Calculator</a>
         
        
              <form className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button className="btn btn-sm btn-primary" type="submit" onClick={update} >Sign Out</button>
            </form>
          
           
            </div>
        </div>
     
    </div>
  )
}
