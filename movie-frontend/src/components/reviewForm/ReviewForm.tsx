import { Form, Button } from 'react-bootstrap';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RefObject } from 'react';

interface ReviewFormProps {
    handleSubmit: (e: React.FormEvent) => void;
    revText: RefObject<HTMLTextAreaElement>;
    labelText: string;
    defaultValue: string;
    toggleWatched: () => void;
    isWatched: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ handleSubmit, revText, labelText, defaultValue, toggleWatched, isWatched }) => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{labelText}</Form.Label>
                <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
            </Form.Group>
            <Button variant="outline-info" onClick={handleSubmit}>Submit</Button>
            <Button variant="outline-danger" 
                onClick={toggleWatched}
                className="ms-2">
                {isWatched ? <FaHeart /> : <FaRegHeart />} Watch
            </Button>
        </Form>
    )
}

export default ReviewForm;