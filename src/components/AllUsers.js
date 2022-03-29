import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      await fetch("/api/users/getallusers")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Something went wrong");
        })
        .then((responseJson) => {
          // Do something with the response
          console.log(responseJson);
          setUsers(responseJson);
          setLoading(false);
        })
        .catch((error) => {
          setError(true);
          console.log(error);
          setLoading(false);
        });
    }
    fetchUsers();
  }, []);

  console.log(users);
  //console.log(bookings.data.length);
  return (
    <div className="row">
      <div className="col-md-12">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : (
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>Identifiant de l'utilisateur</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Administrateur</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td className="text-break">{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Oui" : "Non"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
