import * as classes from "../videoPlayer.module.css";
import pause from "@assets/images/video-controls/pause.svg";
import play from "@assets/images/video-controls/play.svg";
import React, { RefObject} from "react";




interface Props {
    videoRef: RefObject<HTMLVideoElement | null>;
    play_pauseToggle: (video : HTMLVideoElement | null, isPlayed: boolean) => void;
    isPlayed: boolean;
}

function PlayPause({ videoRef, play_pauseToggle, isPlayed}: Props) {
    return (
        <div onClick={()=> play_pauseToggle(videoRef.current, isPlayed)} className={classes.controls__play_pause}>
            <img className={classes.controls__svg} src={(isPlayed ? pause : play) as string}/>
        </div>
    )

}

export {PlayPause}