import React from 'react';
import {VideoMeta} from "../../../../interface/IVideo";

import * as classes from "./description.module.css";

const Description = ({videoDescription}: {videoDescription: VideoMeta}) => {

    console.log(videoDescription);

    return (
        <div className={classes.container}>
            <div className={classes.video_title}>
                <h2>{videoDescription.title}</h2>
            </div>
            <div className={classes.video_author}>
                <img src="#"/>
                <h3>{videoDescription.username}</h3>
            </div>
            <div className={classes.video_description}>

            </div>
        </div>
    );
};

export default Description;