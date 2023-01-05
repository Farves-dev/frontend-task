import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./redux/features/userSlice";
import "./App.css";

function App() {
  const { users, loading } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }

  const fetchData = async (userId) => {
    const res = await fetch(`https://reqres.in/api/users/${userId}`);
    const data = await res.json();
    console.log(data);
    setUserDetails(data);
  };

  return (
    <div className="App">
      <div className="main-container">
        <h1 className="title">FRONT END TASK</h1>

        {!userDetails && (
          <div className="clickOn-container">
            <div />
            <p>
              Click on any button <br /> to see
            </p>
          </div>
        )}

        {userDetails && (
          <div className="userDetails-container">
            <img
              src={userDetails.data.avatar}
              alt={userDetails.data.first_name}
              title={userDetails.data.first_name}
              className="user-image"
            />

            <div className="userDetails-text">
              <p>
                {userDetails.data.first_name} {userDetails.data.last_name}
              </p>

              <p>{userDetails.data.email}</p>
            </div>
          </div>
        )}

        <div className="buttons-container">
          {users.data?.map((user) => (
            <button key={user.id} onClick={() => fetchData(user.id)}>
              {user.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
