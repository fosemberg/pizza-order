import React, { useContext, useState } from 'react';
import { Alert, Button, Modal, Toast } from 'react-bootstrap';
import { CgDanger } from 'react-icons/cg';

import './index.scss'
import { Context } from '../../App';

const ErrorHandler: React.FC = () => {
  const {
    isFormValid,
    errorContent,
    setErrorContent,
  } = useContext(Context);

  const handleClose = () => setErrorContent({
    header: '',
    body: '',
  });

  return <div className="ErrorHandler">
    <Modal show={!!(errorContent.header || errorContent.body)} onHide={handleClose}>
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
