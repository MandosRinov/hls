import * as classes from "./main.module.css"
import {VideoCard, Header} from "./components"
import {useEffect, useState} from "react";
import VideoService from "../../services/VideoService";
import {VideoMeta} from "../../interface/IVideo";
import useFetching from "../../hooks/useFetching";


function Main() {

    const [videos, setVideos] = useState<VideoMeta[] | never>()

    const [fetchVideos, isLoading, error] = useFetching(async ()=> {
        await VideoService.getVideoList().then(videos => setVideos(videos))
    })

    useEffect(() => {
        fetchVideos()
    }, [])

    return (
        !isLoading ?
            <div>
                <div className={classes.wrapper}>
                    {videos && (videos.map((video) =>
                        <VideoCard key={video.videoid} video={video}/>
                    ))}
                </div>
            </div>
            :
            <div>
                Loading...
            </div>
    )
}

export default Main