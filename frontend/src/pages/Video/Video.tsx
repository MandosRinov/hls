import * as classes from "./styles/main.module.css"
import {useEffect, useMemo, useState} from "react";

import VideoService from "../../services/VideoService";

import {useLocation} from "react-router-dom";
import {Comments, Description, VideoPlayer} from "./components";
import useFetching from "../../hooks/useFetching";
import {VideoMeta} from "../../interface/IVideo";

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}


function Video() {
    let query = useQuery();
    const [videoUrl, _] = useState<string>(`${__SERVER_URL__}/api/${query.get("q")}/master.m3u8`);
    const [videoDescription, setVideoDesc] = useState<VideoMeta>();

    const [fetchVideo, isDescLoading, error] = useFetching(async (videoId)=> {
        await VideoService.getVideo(videoId).then(result => {
            setVideoDesc(result)
        });
    });

    useEffect(() => {
        let videoId = query.get("q");

        if (videoId === null) return

        fetchVideo(videoId)

    }, [])


    return (
        <div className={classes.wrapper}>
            <div className={classes.videoContent}>
                <VideoPlayer videoUrl={videoUrl} />
                {!isDescLoading && (<Description videoDescription={videoDescription as VideoMeta} />)}
                <Comments/>
            </div>
            <div className={classes.otherContent}>

            </div>
        </div>
    )
}

export default Video