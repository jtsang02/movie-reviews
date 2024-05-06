import { useEffect, useRef, RefObject } from 'react';
import baseURL from '../../api/baseURL';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import Movie from '../../model/Movie';
import Review from '../../model/Review';
import axios, { AxiosError } from 'axios';

interface ReviewsProps {
    getMovie: (movieId: string) => void;
    movie: Movie | undefined;
    reviews: Review[] | undefined;
    setReviews: (reviews: Review[]) => void;
    toggleWatched: () => void;
}

const Reviews: React.FC<ReviewsProps> = ({ getMovie, movie, reviews, setReviews, toggleWatched }) => {

    const url = baseURL;
    const revText: RefObject<HTMLTextAreaElement | null> = useRef(null);
    const params = useParams<{ movieId: string }>();
    const movieId = params.movieId;
    
    useEffect(() => {
        getMovie(movieId ?? '');
    }, [movieId]);

    async function addReview(e: React.FormEvent) {
        e.preventDefault();
        const rev = revText.current;
        if (!rev) return;

        await axios.post(url + "/api/v1/reviews", { reviewBody: rev?.value, imdbId: movieId }).then(() => {
            const updatedReviews: Review[] = [...(reviews ?? []), { body: rev.value }];
            if (rev) rev.value = "";
            setReviews(updatedReviews);
        }).catch((error: Error | AxiosError) => {
            console.error(error);
        });
    }

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
                    {<>
                        <Row>
                            <Col>
                                <ReviewForm
                                    handleSubmit={(e: React.FormEvent) => addReview(e)}
                                    revText={revText as RefObject<HTMLTextAreaElement>}
                                    labelText="Write a Review?"
                                    defaultValue=""
                                    toggleWatched={toggleWatched}
                                    isWatched={movie?.watched ?? false}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>}
                    {reviews?.map((review, index) => {
                        const key = `re_${index}`;
                        return (
                            <Row key={key}>
                                <Col>
                                    <p>{review.body}</p>
                                </Col>
                            </Row>
                        )
                    })}
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