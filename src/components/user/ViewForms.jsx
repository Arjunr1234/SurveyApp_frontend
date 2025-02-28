import React, { useEffect, useState } from "react";
import { fetchFormDataService } from "../../services/service";
import { toast } from "sonner";
import Modal from "./Modal"; 

function ViewForms() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchFormDataService();
      if (response.success) {
       
        setData(response.formData);
      } else {
        setError("Failed to fetch data");
      }
    } catch (err) {
      setError(err.message);
      console.log("Error in FetchData: ", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Listed Forms
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-center">
              <th className="p-4 w-1/4">Name</th>
              <th className="p-4 w-1/4">Email</th>
              <th className="p-4 w-1/4">Phone</th>
              <th className="p-4 w-1/4">Action</th>
            </tr>
          </thead>
          <tbody>
          {data && data.length > 0 ? (
  data.map((user, index) => (
    <tr
      key={user.id}
      className={`${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      } hover:bg-gray-100 transition duration-200 text-center`}
    >
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
  ))
) : (
  <tr>
    <td colSpan="4" className="text-center p-4">
      There is no response.
    </td>
  </tr>
)}

          </tbody>
        </table>
      </div>

     
      {selectedUser && <Modal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  );
}

export default ViewForms;
