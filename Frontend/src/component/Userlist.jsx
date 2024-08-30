import React, {useState,useEffect} from 'react'
import axios from 'axios'

const Userlist = () => {
 const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        const result = await axios.get("http://${process.env.REACT_APP_API_URL}/users")
        setUsers(result.data)
    }
    
  return (
    <div>
      <h2>User Data</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Password:</strong> {user.password}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Userlist