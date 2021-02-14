import React, { useContext, useState } from 'react';
import { Alert, Button, Modal, Toast } from 'react-bootstrap';
import { CgDanger } from 'react-icons/cg';

import './index.scss'
import { Context } from '../../App';

const ErrorHandler: React.FC = () => {
  const {
    isFormValid,
    errorContent,
    isErrorShow,
    setIsErrorShow
  } = useContext(Context);

  const handleClose = () => setIsErrorShow(false);

  return <div className="ErrorHandler">
    <Modal show={isErrorShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{errorContent.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{errorContent.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
}

export default ErrorHandler
