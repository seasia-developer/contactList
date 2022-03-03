import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import PropTypes from "prop-types";

const ConfirmationModal = (props) => {
  const { isOpen, toggleModal, onConfirm, text } = props;
  return (
    <Modal centered isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Are you sure?</ModalHeader>
      <ModalBody className="text-center">
        <p>{text}</p>
      </ModalBody>
      <ModalFooter className="justify-content-center">
        <Button color="light" onClick={toggleModal}>
          No
        </Button>
        <Button color="danger" onClick={onConfirm}>
          Yes
        </Button>
      </ModalFooter>
    </Modal>
  );
};
ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool,
  text: PropTypes.string,
  toggleModal: PropTypes.func,
  onConfirm: PropTypes.func,
};
export default ConfirmationModal;
