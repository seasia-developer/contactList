import { Button } from "reactstrap";
import "./index.css";
import PropTypes from "prop-types";
import dummyImage from "../../assets/images/dummy-user.jpg";

const ContactDetail = (props) => {
  const { activeContact, onDeleteContact, onClickEditContact } = props;
  return (
    <div className="right-sec  w-100 d-flex flex-column justify-content-between p-5">
      {activeContact ? (
        <>
          <div className="profile-detail  w-100 d-flex justify-content-start">
            <div className="pro-img overflow-hidden rounded-circle d-flex align-items-center justify-content-center">
              <img src={dummyImage} className="dp-img" alt=""></img>
            </div>
            <div className="p-name text-left">
              <h3>
                {activeContact.firstName} {activeContact?.middleName}{" "}
                {activeContact.lastName}
              </h3>
              <div className="mail-cont">
                <div className="d-flex mt-5">
                  <div className="mr-4">
                    <b>Email</b>{" "}
                  </div>
                  {activeContact.email}
                </div>
                <div className="d-flex mt-3">
                  <div className="mr-4">
                    <b>Group</b>{" "}
                  </div>
                  {activeContact.group}
                </div>
              </div>
            </div>
          </div>
          <div className="btn-footer d-flex">
            <div className="btn-left d-flex mx-n2">
              <Button className="mx-2" color="outline-primary">
                Share
              </Button>
              <Button
                className="mx-2"
                color="outline-primary"
                onClick={onClickEditContact}
              >
                Edit
              </Button>
            </div>
            <div className="btn-left ml-auto">
              <Button
                color="danger"
                className="mr-3"
                block
                onClick={onDeleteContact}
              >
                Delete
              </Button>
            </div>
          </div>
        </>
      ) : (
        "No Contact"
      )}
    </div>
  );
};

ContactDetail.propTypes = {
  activeContact: PropTypes.object,
  onDeleteContact: PropTypes.func,
  onClickEditContact: PropTypes.func,
};
export default ContactDetail;
