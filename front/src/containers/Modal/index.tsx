import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';

import './index.scss'
import { Context } from '../../App';

const ModalContainer: React.FC = () => {
  const {
    isFormValid,
    modalContent,
    isModalShow,
    setIsModalShow
  } = useContext(Context);

  const handleClose = () => setIsModalShow(false);

  return <div className="ErrorHandler">
    <Modal show={isModalShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalContent.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
}

export default ModalContainer;
