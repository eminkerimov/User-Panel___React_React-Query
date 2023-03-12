import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUsers, addUser, deleteUser, searchUser } from "../../api/usersApi";
import CreateModal from "../../components/CreateModal/CreateModal";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Home.scss";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";

const Home = () => {
  const [createModalShow, setCreateModalShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: users,
  } = useQuery("users", getUsers, {
    select: (data) => data.sort((a, b) => b.id - a.id),
  });

  const addUserMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const searchUserMutation = useMutation(searchUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const handleSubmit = (user) => {
    addUserMutation.mutate(user);
  };


  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    content = users.map((user) => {
      return (
        <div className="home__users__item" key={user.id}>
          <div>{user.name}</div>
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>{user.phone}</div>
          <div className="editBtn">
            <Link to={`edit/${user.id}`}>
              <EditIcon />
            </Link>
          </div>
          <div className="deleteBtn">
            <DeleteIcon
              onClick={() => deleteUserMutation.mutate({ id: user.id })}
            />
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <CreateModal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
        handleSubmit={handleSubmit}
      />
      <div className="home">
        <h1>Home</h1>
        <div className="home__head">
          <div className="home__head__search">
            <input
              type="text"
              className={searchValue === "" ? "disabled" : ""}
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              className="btn__contained"
              onClick={()=> searchUserMutation.mutate(searchValue)}
              disabled={!searchValue?.length}
            >
              Search
            </button>
          </div>
          <button
            className="btn__contained"
            onClick={() => {
              setCreateModalShow(true);
            }}
          >
            <PersonAddAlt1Icon />
            Create New Employee
          </button>
        </div>
        <div className="home__users">
          <div className="home__users__title">
            <div>Name</div>
            <div>Surname</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Edit</div>
            <div>Delete</div>
          </div>
          {content}
        </div>
      </div>
    </>
  );
};

export default Home;
