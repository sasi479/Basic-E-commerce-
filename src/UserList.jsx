import { useState } from "react"
import './userList.css'




function UserList() {
  let [users, setUsers] = useState([
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "phone": "1-770-736-8031 x56442",

    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "phone": "010-692-6593 x09125",

    },

  ])
  let [formData, setFormData] = useState({ id: null, name: '', username: '', email: '', phone: '' })
  let [isEditing, setIsEditing] = useState(false);
  let [newUserId, setnewUserId] = useState(3);

  let handleFormData = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value })

  }

  let handlSubmit = (e) => {
    e.preventDefault()
    if (isEditing) {
      let updatedUsers = users.map(user => {
        if (user.id == formData.id) return formData
        else return user

      })
      setUsers(updatedUsers);
      setIsEditing(false);
    }
    else {

      let newUser={...formData,id:newUserId};
      setnewUserId(newUserId+1)
      setUsers([...users,newUser])

    }

  }
  let handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true)

  }
  let handleDelete = (id)=>{

    let updatedUsers=[...users];
    let index = updatedUsers.findIndex(user => user.id == id);

      updatedUsers.splice(index, 1);
      setUsers(updatedUsers)
  }

  return (
    <>
      <h1>User Management  </h1>
      <form onSubmit={handlSubmit}>
        <div className="formgroup"><label>Name: </label><input type="text" value={formData.name} name="name" onChange={handleFormData} /></div>
        <div className="formgroup"><label>UserName: </label><input type="text" value={formData.username} name="username" onChange={handleFormData} /></div>
        <div className="formgroup"><label>Email: </label><input type="email" value={formData.email} name="email" onChange={handleFormData} /></div>
        <div className="formgroup"><label>Phone: </label><input type="text" value={formData.phone} name="phone" onChange={handleFormData} /></div>
        <button >{isEditing?"update":"Add User"} </button>
      </form>
      <div className="userList">

        {
          users.map((user) => (
            <UserCard user={user} key={user.id} onEdit={handleEdit} onDelete={handleDelete} />
          )
          )
        }
      </div>
    </>
  )
}

function UserCard({ user, onEdit , onDelete}) {

  return (
    <div className="userCard">
      <p>Name: {user.name}</p>
      <p>Username: {user?.username}</p>
      <p>Email:{user?.email}</p>
      <p>Phone: {user.phone}</p>
      <button onClick={() => onEdit(user)}>Edit</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>

  )
}
