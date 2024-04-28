import {useParams} from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Trailer.css';
import React from 'react'


interface TrailerParams {
    ytTrailerId: string;
    [key: string]: string;
}

const Trailer: React.FC = () => {

        const params = useParams<TrailerParams>();
        const key = params.ytTrailerId;

    return (
        <div className="react-player-container">
            {(key!=null)?<ReactPlayer controls={true} playing={true} url ={`https://www.youtube.com/watch?v=${key}`} 
            width = '100%' height='100%' />:null}
        </div>
    )
}

export default Trailer