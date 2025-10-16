import * as classes from "../videoPlayer.module.css";
import React, {RefObject, useEffect, useState} from "react";
import mute_volume from "@assets/images/video-controls/volume/mute-volume.svg";
import low_volume from "@assets/images/video-controls/volume/low-volume.svg";
import high_volume from "@assets/images/video-controls/volume/high-volume.svg";


function volumeStateHandler(volume: number, setVolumeState: (stateChanger: 0 | 1 | 2) => void) {

    if (volume == 0) {
        setVolumeState(0)
    }
    else if (volume < 0.5) {
        setVolumeState(1)
    }
    else if (volume >= 0.5) {
        setVolumeState(2)
    }

}

function setNewVolume(video: HTMLVideoElement | null, setVolumeState: any, newVolumeValue: any) {
    if (video) { video.volume = newVolumeValue.currentVolume }
    localStorage.setItem("video-volume", JSON.stringify(newVolumeValue))
    volumeStateHandler(parseFloat(newVolumeValue.currentVolume), setVolumeState)
}


function volumeChangeHandler(e: any, video: HTMLVideoElement | null, setVolumeValue: any, setVolumeState: (stateChanger: any) => void) {
    setVolumeValue((prev: any)=> {
        const newVolumeValue = {
            ...prev,
            currentVolume: parseFloat(e.target.value)
        }

        setNewVolume(video, setVolumeState, newVolumeValue)

        return newVolumeValue
    })



}

function muteVideoHandler( video: HTMLVideoElement | null, setVolumeValue: any, setVolumeState: (stateChanger: any) => void) {

    setVolumeValue((prev: any)=> {

        const newVolumeValue = ((prev.currentVolume == 0) ?
            {
                lastBeforeMuteVolume: prev.lastBeforeMuteVolume,
                currentVolume: prev.lastBeforeMuteVolume,
            } :
            {
                currentVolume: 0,
                lastBeforeMuteVolume: prev.currentVolume,
            })

        setNewVolume(video, setVolumeState, newVolumeValue)

        return newVolumeValue
    })


}


interface VolumeProps {
    videoRef: RefObject<HTMLVideoElement | null>;
}

interface VideoVolumeType {
    currentVolume: number
    lastBeforeMuteVolume: number | null
}

function Volume({videoRef}: VolumeProps) {

    const [volumeState, setVolumeState] = useState<0 | 1 | 2>(0);
    const [volumeValue, setVolumeValue] = useState<VideoVolumeType>(
        localStorage.getItem("video-volume") ? JSON.parse(localStorage.getItem("video-volume") as string) as VideoVolumeType : {
            currentVolume: 0,
            lastBeforeMuteVolume: 0.5
        },
    );
    const volumeStates = {
        0: mute_volume as string,
        1: low_volume as string,
        2: high_volume as string,
    }


    useEffect(() => {
        if (!videoRef.current) return

        const video = videoRef.current

        video.volume = volumeValue.currentVolume
        volumeStateHandler(volumeValue.currentVolume, setVolumeState)
    }, []);

    return (
        <div className={classes.controls__volume}>
            <img onClick={()=> muteVideoHandler(videoRef.current, setVolumeValue, setVolumeState)} className={classes.controls__svg} src={volumeStates[volumeState]} alt={""}/>
            <span className={classes.volume_slider__container}>
                <input className={classes.volume_slider} onChange={(e)=> volumeChangeHandler(e, videoRef.current, setVolumeValue, setVolumeState)} type={"range"} value={volumeValue.currentVolume} min={0} max={1} step={0.05}/>
            </span>
        </div>
    )
}

export {Volume}