import {Context, createContext, ReactNode} from 'react';
import {VideoMeta} from "../interface/IVideo";
import {useState} from "react";

interface VideoContextType {
    videoContext: VideoMeta | undefined;
    changeVideoContext: (newVideoContext: VideoMeta) => void
}



export const VideoContext = createContext<VideoContextType | Partial<VideoContextType>>({});

export const VideoContextProvider = ({children}: {children: ReactNode}) => {
    const [video, setVideo] = useState<VideoMeta | undefined>(undefined);


    const changeVideo = (newVideo: VideoMeta) : void =>  {
        setVideo(newVideo);
    }


    return (
        <VideoContext.Provider value={{ videoContext: video, changeVideoContext: changeVideo }}>
            {children}
        </VideoContext.Provider>
    )

}
