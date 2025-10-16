import * as classes from "../videoPlayer.module.css";
import {parseDurationToFormat} from "@utils/videoDurationParse";
import React, {Ref, RefObject, useEffect, useState} from "react";


function Timeline({timelineRef, videoRef, setCurrentTime}: {timelineRef: RefObject<HTMLInputElement | null>, videoRef: RefObject<HTMLVideoElement | null>, setCurrentTime: any}) {
    const [selectTimePos, setSelectTimePos] = useState<number>(0)
    const [selectTimeValue, setSelectTimeValue] = useState<number>(0)
    const [isSelectTime, setIsSelectTime] = useState<boolean>(false);


    useEffect(() => {
        if (!timelineRef.current) return;
        if (!videoRef.current) return;

        const video = videoRef.current;
        const timeline = timelineRef.current

        const updateTimelineHandle =  ()=> {
            timeline.value = video.currentTime.toString()
            setCurrentTime(parseInt(video.currentTime.toFixed(0)))
        }

        video.addEventListener("timeupdate", updateTimelineHandle);

        timeline.addEventListener("mousedown", (_) => {
            video.removeEventListener("timeupdate", updateTimelineHandle)
        })
        timeline.addEventListener("mouseup", (_) => {
            video.addEventListener("timeupdate", updateTimelineHandle);
        })

        timeline.addEventListener('mousemove', (ev)=> {
            setIsSelectTime(true)
            const rect = timeline.getBoundingClientRect();
            const percent = (ev.clientX - rect.left) / rect.width;
            const min = parseFloat(timeline.min);
            const max = parseFloat(timeline.max);
            const step = parseFloat(timeline.step) || 1;


            let value = min + percent * (max - min);
            value = Math.round(value / step) * step;
            value = Math.max(min, Math.min(max, value));
            setSelectTimePos(ev.offsetX-20)
            setSelectTimeValue(value)
        });

        timeline.addEventListener("mouseleave", (_)=> {
            setIsSelectTime(false)
        })

        timeline.addEventListener("change", (ev: any)=> {
            video.currentTime = parseFloat(ev.target.value)
            // if ((video.currentTime < parseFloat(timeline.max)) && isPlayed) {
            //     video.play()
            // }
        });
    })

    return (
        <div className={classes.video_timeline}>
            <div style={{visibility: isSelectTime ? "visible" : "hidden" ,left: selectTimePos+"px"}} className={classes.timeline_duration}>
                {parseDurationToFormat(selectTimeValue)}
            </div>
            <input ref={timelineRef} className={classes.video_controls__input} type={"range"} min={0} max={0} step={0.05} defaultValue={0}/>
        </div>
    )
}

export {Timeline}