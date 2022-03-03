import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types";
import "./index.css";
import { groupData } from "../../utils/dev-data";
import {
  textFieldValidator,
  emailFieldValidator,
} from "../../utils/validations";
import dummyImage from "../../assets/images/dummy-user.jpg";

const ContactForm = (props) => {
  const {
    formData,
    addToContactList,
    editContact,
    isOpen,
    toggleContactModal,
    allContacts,
  } = props;
  const [formState, setFormState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    group: groupData[0],
    hideNotifications: false,
    errors: {},
  });
  useEffect(() => {
    if (formData?.type === "Edit") {
      const newState = { ...formData.data, errors: {} };
      setFormState(newState);
    }
  }, [formData]);
  const checkForError = (key = "", val = "") => {
    const newFormState = { ...formState };
    const id = newFormState?.id ? newFormState?.id : 0;
    let err;
    if (key) {
      if (newFormState.errors[key]) {
        delete newFormState.errors[key];
      }
      if (key === "middleName") {
        err = textFieldValidator(3, 10, val, false);
      } else if (key === "firstName" || key === "lastName") {
        err = textFieldValidator(3, 10, val);
      } else if (key === "email") {
        err = emailFieldValidator(val, allContacts, id);
      }
      if (err) {
        newFormState.errors[key] = err;
      }
    } else {
      newFormState.errors.firstName = textFieldValidator(
        3,
        10,
        newFormState.firstName
      );
      newFormState.errors.middleName = textFieldValidator(
        3,
        10,
        newFormState.middleName,
        false
      );
      newFormState.errors.lastName = textFieldValidator(
        3,
        10,
        newFormState.lastName
      );
      newFormState.errors.email = emailFieldValidator(
        newFormState.email,
        allContacts,
        id
      );
      let allKeys = Object.keys(newFormState?.errors);
      if (allKeys.length > 0) {
        allKeys = allKeys.forEach((el) => {
          if (newFormState?.errors[el] === "") delete newFormState?.errors[el];
        });
      }
    }
    setFormState(newFormState);
    if (Object.keys(newFormState.errors).length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const onChangeForm = (key) => (e) => {
    const newFormState = { ...formState };
    if (key === "hideNotifications") {
      newFormState[key] = !formState[key];
    } else {
      checkForError(key, e.target.value);
      newFormState[key] = e.target.value;
    }

    setFormState(newFormState);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkForError()) return false;
    if (formData?.type === "Add") {
      addToContactList(formState);
    } else {
      editContact(formState);
    }
    onCloseForm();
  };
  const onCloseForm = () => {
    setFormState({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      group: groupData[0],
      hideNotifications: false,
      errors: {},
    });
    toggleContactModal();
  };
  return (
    <Modal scrollable centered isOpen={isOpen} toggle={onCloseForm}>
      <ModalHeader toggle={onCloseForm}>{formData.type} Contact</ModalHeader>
      <ModalBody>
        <div className="profile-detail d-flex justify-content-start w-100 text-left ">
          <div className="pro-img">
            <img src={dummyImage} className="dp-img" alt="" />
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first-name"
                aria-describedby="emailHelp"
                placeholder="Enter first name"
                value={formState.firstName}
                onChange={onChangeForm("firstName")}
              />
              {formState?.errors?.firstName && (
                <small id="firstNameHelp" className="form-text text-danger">
                  {formState?.errors?.firstName}
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="middle-name">Middle Name</label>
              <input
                type="text"
                className="form-control"
                id="middle-name"
                aria-describedby="emailHelp"
                placeholder="Enter middle name"
                value={formState.middleName}
                onChange={onChangeForm("middleName")}
              />
              {formState?.errors?.middleName && (
                <small id="lastNameHelp" className="form-text text-danger">
                  {formState?.errors?.middleName}
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last-name"
                aria-describedby="emailHelp"
                placeholder="Enter last name"
                value={formState.lastName}
                onChange={onChangeForm("lastName")}
              />
              {formState?.errors?.lastName && (
                <small id="lastNameHelp" className="form-text text-danger">
                  {formState?.errors?.lastName}
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={formState.email}
                onChange={onChangeForm("email")}
              />
              {formState?.errors?.email && (
                <small id="emailHelp" className="form-text text-danger">
                  {formState?.errors?.email}
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="group">Group</label>
              <select
                className="custom-select"
                id="group"
                value={formState.group}
                onChange={onChangeForm("group")}
              >
                {groupData.map((el, i) => {
                  return (
                    <option value={el} key={i}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="notifications"
                  value={formState.hideNotifications}
                  checked={formState.hideNotifications}
                  onChange={onChangeForm("hideNotifications")}
                />
                <label className="form-check-label" htmlFor="notifications">
                  Hide notifications from this contact
                </label>
              </div>
            </div>
            <Button type="submit" color="primary" block>
              Submit
            </Button>
            <Button color="secondary" block onClick={onCloseForm}>
              Close
            </Button>
          </form>
        </div>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  );
};

ContactForm.propTypes = {
  formData: PropTypes.object,
  addToContactList: PropTypes.func,
  editContact: PropTypes.func,
  allContacts: PropTypes.array,
};
export default ContactForm;
