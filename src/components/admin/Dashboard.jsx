import React, { useEffect, useState } from 'react'
import { fetchAllResponseServic } from '../../services/adminService'
import { toast } from 'sonner';
import Modal from '../user/Modal';

function Dashboard() {

  const [data, setData] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
       fetchDetails()
  },[])


  const fetchDetails = async() => {
      try {
         const response = await fetchAllResponseServic();
         if(response.success){
          setData(response.formData)
         }
        
      } catch (error) {
        console.log("Error in fetchDetails: ", error)
      }
  }

  return (
    <div className="p-6">
    <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
      Listed Forms
    </h1>

    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-center">
            <th className="p-4 w-1/4">User</th>
            <th className="p-4 w-1/4">Name</th>
            <th className="p-4 w-1/4">Email</th>
            <th className="p-4 w-1/4">Phone</th>
            <th className="p-4 w-1/4">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr
              key={user.id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition duration-200 text-center`}
            > 
              <td className="p-4">{user.userName}</td>
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.phone}</td>
              <td className="p-4">
                <button
                  className="bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  onClick={() => {
                    setSelectedUser(user); 
                   
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

   
    {selectedUser && <Modal user={selectedUser} onClose={() => setSelectedUser(null)} />}
  </div>
  )
}

export default Dashboard
