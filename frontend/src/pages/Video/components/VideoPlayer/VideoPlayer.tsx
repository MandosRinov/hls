import * as classes from "./videoPlayer.module.css";
import React, {useEffect, useRef, useState} from "react";
import Hls from "hls.js"

import {Timeline, Fullscreen, Duration, Volume, PlayPause} from "./components";




function VideoPlayer({videoUrl} : {videoUrl : string}) {
    const playerContainerRef = useRef<HTMLDivElement | null>(null);
    const timelineRef = useRef<HTMLInputElement | null>(null);
    const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [isPlayed, setIsPlayed] = useState<boolean>(false);


    const [totalDuration, setTotalDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0)


    const [isIdle, setIsIdle] = useState(false)


    function play_pauseToggle(video: HTMLVideoElement | null, state: boolean) {
        if (video) {
            state ? video.pause() : video.play()
        }
    }

    useEffect(() => {
        if (!playerContainerRef.current) return;
        if (!videoPlayerRef.current) return;
        if (!timelineRef.current) return;

        const player = playerContainerRef.current;
        const video = videoPlayerRef.current
        const timeline = timelineRef.current


        if (Hls.isSupported()) {
            console.log("Hls.isSupported");
            const hls = new Hls()

            hls.on(Hls.Events.ERROR, (event, data)=> {
                console.log(data)
            })

            hls.on(Hls.Events.LEVEL_LOADED, (event, data)=> {
                timeline.max = data.details.totalduration.toString()
                setTotalDuration(data.details.totalduration)
            })
            
            hls.loadSource(videoUrl)
            hls.attachMedia(video)
        }
        else if (video.canPlayType("application/vnd.apple.mpegurl")!) {
            video.src = videoUrl

        }

        /*    Player container element events    */

        let moveTimeout: any = null
        const mouseMoveHandler = () => {
            setIsIdle(false)
            player.style.cursor = "initial"
            if (moveTimeout) clearTimeout(moveTimeout)
            moveTimeout = setTimeout(()=> {
                player.style.cursor = "none"
                setIsIdle(true)
            }, 3000)
        }

        player.addEventListener("mousemove", mouseMoveHandler)
        player.addEventListener("mouseleave", () => {
            setIsIdle(false)
            player.style.cursor = "initial"
            if (moveTimeout) clearTimeout(moveTimeout)
            player.removeEventListener("mousemove", mouseMoveHandler)
            moveTimeout = setTimeout(()=> {
                setIsIdle(true)
            }, 200)
        })
        player.addEventListener("mouseenter", ()=> player.addEventListener("mousemove", mouseMoveHandler))

        player.addEventListener("fullscreenchange", ()=> setIsFullScreen(prev=>!prev));


        /*    Video element events    */


        video.addEventListener("play", () => { setIsPlayed(true) })
        video.addEventListener("pause", () => { setIsPlayed(false) })



        video.addEventListener("ended", () => {
            console.log("Last value:", timeline.value)
            console.log("Video ended:", video.currentTime)
        })


    }, []);


    return (
        <div ref={playerContainerRef} className={classes.video_container}>
            <video autoPlay className={classes.video_player} ref={videoPlayerRef}/>
            <div className={classes.controls_wrapper}>
                <div onClick={()=> play_pauseToggle(videoPlayerRef.current, isPlayed)} className={classes.controls_top_wrapper}/>
                <div style={{opacity: isIdle ? 0 : 1}} className={classes.controls_bottom_wrapper}>
                    <Timeline timelineRef={timelineRef} videoRef={videoPlayerRef} setCurrentTime={setCurrentTime}/>

                    <div className={classes.controls_panel}>
                        <div className={classes.controls_left}>
                            <PlayPause videoRef={videoPlayerRef} play_pauseToggle={play_pauseToggle} isPlayed={isPlayed}/>
                            <Volume videoRef={videoPlayerRef}/>
                            <Duration currentTime={currentTime} totalDuration={totalDuration}/>
                        </div>
                        <div className={classes.controls_right}>
                            <Fullscreen playerRef={playerContainerRef} isFullscreen={isFullScreen} setIsFullscreen={setIsFullScreen}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer