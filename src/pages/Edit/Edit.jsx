import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../api/usersApi";
import Loader from "../../components/Loader/Loader";
import "./Edit.scss";
import FormInput from "../../components/FormInput/FormInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const inputs = [
  {
    id: 1,
    name: "name",
    type: "text",
    placeholder: "Name",
    label: "First Name",
    required: true,
  },
  {
    id: 2,
    name: "username",
    type: "text",
    placeholder: "Surname",
    label: "Last name",
    required: true,
  },
  {
    id: 3,
    name: "email",
    type: "email",
    placeholder: "Email",
    label: "Email",
    required: true,
  },
  {
    id: 4,
    name: "phone",
    type: "text",
    placeholder: "Phone",
    label: "Phone",
    required: true,
  },
];

const Edit = () => {
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const useUserDataHook = (userId) => {
    return useQuery(["user", userId], () => getUser(userId), {
      refetchOnWindowFocus: false,
    });
  };

  const { isLoading, data, isError, error } = useUserDataHook(id);

  const updateUserMutation = useMutation(() => updateUser(id, values), {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      setValues({
        name: "",
        username: "",
        email: "",
        phone: "",
      });
      navigate("/");
    },
  });

  useEffect(() => {
    if (data) {
      setValues({
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
      });
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserMutation.mutate(id, values);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validation =
    Object.values(values).every((e) => e.length > 0) &&
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      values.email
    );

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <p>{error.message}</p>;
  } else {
    content = (
      <form className="createModal__form" onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <div className="btn__section">
          <button
            type="button"
            className="btn__outlined"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button
            disabled={!validation}
            className="btn__contained"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="edit">
      <h1>Edit</h1>
      <button className="btn__outlined" onClick={() => navigate("/")}>
        <ArrowBackIcon />
        Back
      </button>
      {content}
    </div>
  );
};

export default Edit;
