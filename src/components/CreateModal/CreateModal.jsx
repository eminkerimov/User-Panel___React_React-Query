import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./CreateModal.scss";
import FormInput from "../FormInput/FormInput";

const CreateModal = (props) => {
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

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
      type: "number",
      placeholder: "Phone",
      label: "Phone",
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(values);
    setValues({
      name: "",
      username: "",
      email: "",
      phone: "",
    });
    props.onHide();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validation =
    Object.values(values).every((e) => e.length > 0) &&
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      values.email
    )

  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="createModal"
    >
      <Modal.Header closeButton>
        <h4 className="createModal__title">Create new user</h4>
      </Modal.Header>
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
          <button type="button" className="btn__outlined" onClick={props.onHide}>
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
    </Modal>
  );
};

export default CreateModal;
