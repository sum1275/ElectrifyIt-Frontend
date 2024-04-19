import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
function UploadPopUp() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [smessage, setSmessage] = useState("");
  const [file, setFile] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handleUpload() {
    const uploadEndpoint = import.meta.env.VITE_API_URL + "bulkupload";
    // console.log("uploadEndpoint", uploadEndpoint);

    if (!file) {
      showError("No file selected");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);

    const config = {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        // console.log("Upload Progress: ", progress, "%");
        // Update UI with progress (if desired)
      },
    };

    axios
      .post(uploadEndpoint, fd, config)
      .then((res) => {
        // console.log("Upload Response:", res);
        if (res.status === 200) {
          if (res.data.status === "00") {
            showSuccess(res.data.message);
            setFile(null);
          } else {
            showError(res.data.message);
          }
        }
      })
      .catch((err) => {
        console.error("Upload Error:", err);
        showError("An error occurred while uploading the file");
      });
  }

  function showError(message) {
    setError(message);
    setTimeout(() => setError(""), 2000);
  }

  function showSuccess(message) {
    setSmessage(message);
    setTimeout(() => setSmessage(""), 2000);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Upload
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Vehicle Data CSV File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form.Group controlId="formFile" className="mb-3">
            <input
              className="form-control"
              type="file"
              onChange={(e) => {
                // console.log("e", e);
                setFile(e.target.files[0]);
              }}
            />
          </Form.Group>
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}
          {smessage && (
            <Alert
              variant="success"
              onClose={() => setSmessage(null)}
              dismissible
            >
              {smessage}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UploadPopUp;
