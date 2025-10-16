import * as classes from "./../videoPlayer.module.css";

import fullscreen from "@assets/images/video-controls/fullscreen.svg"
import exit_fullscreen from "@assets/images/video-controls/exit-fullscreen.svg"
import {RefObject} from "react";

function fullscreenToggle(player: HTMLDivElement | null, setFullscreen: any) {
    if (player) {
        setFullscreen((prev: boolean)=> {
            if (!prev) {
                player.requestFullscreen()

            }
            else {
                document.exitFullscreen()
            }
            return prev;
        })

    }
}


interface Props{
    playerRef: RefObject<HTMLDivElement | null>
    isFullscreen:boolean
    setIsFullscreen: any
}

function Fullscreen({playerRef, isFullscreen, setIsFullscreen}: Props) {
    return (
        <div onClick={()=> fullscreenToggle(playerRef.current, setIsFullscreen)} className={classes.controls__fullscreen}>
            <img className={classes.controls__svg} src={(isFullscreen ? exit_fullscreen : fullscreen) as string}/>
        </div>
    )
}

export {Fullscreen};