import { Modal, Button, Form } from 'react-bootstrap';

function ContactModal({ show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            {/* أضفنا tag الـ form ليحيط بالمحتوى بالكامل */}
            <Form action="https://api.web3forms.com/submit" method="POST">
                <Modal.Header closeButton>
                    <Modal.Title>Send me a message</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    {/* مفتاح الوصول الخاص بك - استبدله بمفتاحك */}
                    <input type="hidden" name="access_key" value="903f15b5-6bdd-4252-8ad5-9d675905943b" />
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Your Email</Form.Label>
                        {/* إضافة خاصية name ليتعرف عليها Web3Forms */}
                        <Form.Control type="email" name="email" placeholder="name@example.com" required />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" name="message" rows={4} placeholder="Write your message here..." required />
                    </Form.Group>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* تحويل الزر إلى type="submit" ليقوم بإرسال النموذج */}
                    <Button variant="primary" type="submit">
                        Send Message
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ContactModal;