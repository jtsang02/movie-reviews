import { useEffect, useRef, RefObject } from 'react';
import baseURL from '../../api/baseURL';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import Movie from '../model/Movie';
import axios, {AxiosError} from 'axios';

interface ReviewsProps {
    getMovie: (movieId: string) => void;
    movie: Movie | undefined;
    reviews: string[] | undefined;
    setReviews: (reviews: string[]) => void;
}

const Reviews: React.FC<ReviewsProps> = ({ getMovie, movie, reviews, setReviews }) => {

    const url = baseURL;
    const revText: RefObject<HTMLTextAreaElement | null> = useRef(null);
    const params = useParams<{ movieId: string }>();
    const movieId = params.movieId;

    useEffect(() => {
        getMovie(movieId ?? '');
    }, [getMovie, movieId])

    const addReview = async (e: React.FormEvent) => {
        e.preventDefault();
        const rev = revText.current;
        if (!rev) return;

        await axios.post(url + "/api/v1/reviews", { reviewBody: rev?.value, imdbId: movieId }).then(() => {
            const updatedReviews: string[] = [...reviews ?? [], rev?.value ?? ''];
            if (rev) rev.value = "";
            setReviews(updatedReviews);
        }).catch((error: Error | AxiosError) => {
            console.error(error);
        });
    };

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm
                                        handleSubmit={(e: React.FormEvent) => addReview(e)}
                                        revText={revText as RefObject<HTMLTextAreaElement>}
                                        labelText="Write a Review?"
                                        defaultValue=""
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((review, index) => {
                            return (
                                <Row key={index}>
                                    <Col>
                                        <div>{review}</div>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews;