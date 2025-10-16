import * as classes from "../main.module.css"
import { useNavigate } from "react-router";
import {useContext} from "react";

import {VideoMeta} from "../../../interface/IVideo";
import {VideoContext} from "../../../context/VideoContext";

import {parseDurationToFormat} from "@utils/videoDurationParse";

function redirectToWatch(video: VideoMeta, changeVideoContext: any, navigate: any) {
    console.log("SELECTED VIDEO: ",video);
    navigate(`/watch?q=${video.videoid}`);
    changeVideoContext(video)
}


function VideoCard({video}: {video: VideoMeta}) {
    let navigate = useNavigate();
    const {title, imgUrl, duration, username} = video;

    const context = useContext(VideoContext);

    const videoDurationFormat = parseDurationToFormat(duration)

    return (
        <div onClick={()=> redirectToWatch(video, context.changeVideoContext, navigate)} className={classes.videoCard_wrapper}>
            <div className={classes.videoCard_preview_container}>
                <div className={classes.videoCard_img_wrapper}>
                    <img className={classes.videoCard_preview_img} src={imgUrl} alt={"Preview not found"}/>
                </div>
                <span className={classes.videoCard_duration}>{videoDurationFormat}</span>
            </div>
            <div className={classes.videoCard_description_container}>
                <p title={title} className={classes.videoCard_title}>{title}</p>

            </div>
        </div>
    )
}

export default VideoCard;