import { Form, Button } from 'react-bootstrap';
import { RefObject } from 'react';

interface ReviewFormProps {
    handleSubmit: (e: React.FormEvent) => void;
    revText: RefObject<HTMLTextAreaElement>;
    labelText: string;
    defaultValue: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ handleSubmit, revText, labelText, defaultValue }) => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{labelText}</Form.Label>
                <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
            </Form.Group>
            <Button variant="outline-info" onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}

export default ReviewForm;