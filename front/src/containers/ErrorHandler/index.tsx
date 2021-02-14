import React, { useContext, useState } from 'react';
import { Alert, Button, Modal, Toast } from 'react-bootstrap';
import { CgDanger } from 'react-icons/cg';

import './index.scss'
import { Context } from '../../App';

const ErrorHandler: React.FC = () => {
  const { isFormValid, setIsFormValid } = useContext(Context);
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return <div className="ErrorHandler">
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
}

export default ErrorHandler
