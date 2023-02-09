import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Modal.css"
function ModalPopup({response,getResponse}) {
    const closePop = ()=>{
        getResponse("")
    }
    const handler = ()=>{

    }
  return (
    <div
      className="modal show"
      style={{ display: `${response?.message ?"block":"none"}` }}
    >
      <Modal.Dialog className='modal-dialog'>
        <Modal.Header >
          <Modal.Title className="modal-title">Success</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body">
          <p>{response?.greeting}</p>
          <p>{response?.message}</p>
        </Modal.Body>

        <Modal.Footer >
          
          <Button variant="secondary" onClick={closePop}>Close</Button>
          <Button variant="primary" onClick={handler}>Go to Home</Button>
         
          
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
export default ModalPopup