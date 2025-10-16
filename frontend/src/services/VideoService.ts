import axios from 'axios';
import {VideoMeta} from "../interface/IVideo";

export default class VideoService {
    static async getVideoList() : Promise<VideoMeta[]> {
        let response = await axios.get(`${__SERVER_URL__}/api/videos`)

        return response.data.map((video: {title: string, videoid: string})=> {
                    return {
                        ...video,
                        imgUrl: `${__SERVER_URL__}/api/${video.videoid}/preview.jpg`
                    }
                })
    }

    static async getVideo(id: string) : Promise<VideoMeta> {
        let response = await axios.get(`${__SERVER_URL__}/api/videos/${id}`)
        return response.data[0]
    }
}