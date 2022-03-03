import  { useEffect, useState } from "react";
import { Button } from "reactstrap";
import "./index.css";
import {
    ConfirmationModal,
    ContactDetail,
    ContactForm,
    ContactList,
} from "../../index";
import _ from 'lodash';

const Home = () => {
  let dataList = JSON.parse(localStorage.getItem('keyName'));

  const [list, setList] = useState(dataList)
    const [searchText, setSearchText] = useState()
    const [activeContact, setActiveContact] = useState(null)
    const [formData, setFormData] = useState({ type: "Add", data: null })
    const [toggleContactForm, setToggleContactForm] = useState(false)
    const [toggleConfirmation, setToggleConfirmation] = useState(false)

    const findFirstActiveContact = () => {
      const item = _.sortBy(list, [function(o) { return o.firstName;}])
      .find(function (el) {
          return el.isActive === true;
      });
      return item ?? null;
  };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };
    const onClickContact = (id) => {
        const item = list.find(function (el) {
            return el.id === id;
        });
        if (item) {
            setActiveContact(item)
        }
    };
    const onDeleteContact = () => {
        toggleConfirmationModal();
    };
    const onDeleteContactConfirm = (id) => {
        const newList = list.map((el) => {
            if (el.id === id) {
                el.isActive = false;
            }
            return el;
        });
        setList(newList)
        setActiveContact(findFirstActiveContact())
    }
    const onClickAddContact = () => {
        setFormData({
            type: "Add",
            data: null,
        })
        setToggleContactForm(!toggleContactForm)
    };
    const onClickEditContact = () => {
        setFormData({
            type: "Edit",
            data: activeContact,
        })
        setToggleContactForm(!toggleContactForm)
    };
    const addToContactList = (postData) => {
        if (postData.errors) delete postData.errors;

        const ids = list.map((el) => el.id);
        const maxId = Math.max(...ids);
        postData.id = maxId + 1;
        postData.isActive = true;
        setList([...list, postData])
        setActiveContact(findFirstActiveContact())
    };
    const editContact = (postData) => {
        if (postData.errors) delete postData.errors;

        const newList = list.map((el) => {
            if (el.id === postData.id) {
                return postData;
            } else {
                return el;
            }
        });

        setList(newList)
        setActiveContact(postData)
    };
    const toggleContactModal = () => {
        setToggleContactForm(!toggleContactForm)
    };
    const toggleConfirmationModal = () => {
        setToggleConfirmation(!toggleConfirmation)
    };

    console.log(dataList)
    useEffect(() => {
        setActiveContact(findFirstActiveContact())
        window.localStorage.setItem('keyName',  JSON.stringify(list));
    }, [list])

    return (
        <div className="main-section">
        <div className="main-body d-flex">
          <div className="list px-3 py-4 bg-dark">
            <div className="form-group has-search">
              <span className="fa fa-search form-control-feedback position-absolute d-block text-center"></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>
            <ContactList
              contacts={list||[]}
              searchText={searchText}
              onClickContact={onClickContact}
              activeContact={activeContact}
            />
            <div className="add-btn">
              <Button
                color="danger "
                className="btn-block mt-3"
                onClick={onClickAddContact}
              >
                ADD
              </Button>
            </div>
          </div>
          <ContactDetail
            activeContact={activeContact}
            onDeleteContact={onDeleteContact}
            onClickEditContact={onClickEditContact}
          />
        </div>
        <ContactForm
          formData={formData}
          addToContactList={addToContactList}
          editContact={editContact}
          isOpen={toggleContactForm}
          toggleContactModal={toggleContactModal}
          allContacts={list}
        />
        <ConfirmationModal
          isOpen={toggleConfirmation}
          toggleModal={toggleConfirmationModal}
          onConfirm={() => onDeleteContactConfirm(activeContact.id)}
          text={`The contact ${activeContact?.firstName} will be deleted and can't be undone.`}
        />
      </div>
    )
}

export default Home