import "./PlayVideo.css"
import video1 from "../../assets/video.mp4"
import like from "../../assets/like.png"
import dislike from "../../assets/dislike.png"
import share from "../../assets/share.png"
import save from "../../assets/save.png"
import jack from "../../assets/jack.png"
import user_profile from "../../assets/user_profile.jpg"
import { useEffect, useState } from "react"
import { valueConverter, youtubeAPI } from "../../data"
import moment from "moment"
import { useParams } from "react-router-dom"


const PlayVideo = () => {
    const {videoId} = useParams()
    const [apiData, setApidata] = useState(null)
    const [channelData, setChanneldata] = useState(null)
    const [commentData, setCommentData] = useState([])
    const fetchVideodata = async () => {
        // fetching videos data 
        const videoDetailsURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${youtubeAPI}`
        await fetch(videoDetailsURL).then(res => res.json()).then(data => setApidata(data.items[0]))


    }

    const fetchChannelData = async () => {
        // fetching channel data 
        const channelDataURL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${youtubeAPI}`
        await fetch(channelDataURL).then(res => res.json()).then(data => setChanneldata(data.items[0]))

        // fetching comment data 

        const commentURL = ` https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${youtubeAPI}`
       
        await fetch(commentURL).then(res => res.json()).then(data => setCommentData(data.items))

        
    }

    useEffect(() => {
        fetchVideodata()

    }, [videoId])
    useEffect(() => {

        fetchChannelData()
    }, [apiData])
    console.log()
    return (
        <div className="play-video">
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            {/* <video src={video1} controls autoPlay muted></video> */}
            <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
            <div className="play-video-info">
                <p>{apiData ? valueConverter(apiData.statistics.viewCount) : "20k"} views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "1 day ago"}</p>
                <div>``
                    <span>
                        <img src={like} alt="" /> {apiData ? valueConverter(apiData.statistics.likeCount) : "200"}
                    </span>
                    <span>
                        <img src={dislike} alt="" /> 2
                    </span>
                    <span>
                        <img src={share} alt="" /> Share
                    </span>
                    <span>
                        <img src={save} alt="" /> Save
                    </span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : " "}</p>
                    <span>{channelData ? valueConverter(channelData.statistics.subscriberCount) : "1k"}</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description here.."}</p>
                <hr />
                <h4>{apiData ? valueConverter(apiData.statistics.commentCount) : "102"} Comments</h4>

                {commentData.map((item, index) => {
                    return (
                        <div key={index} className="comments">
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ado</span></h3>
                                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                <div className="comment-action">
                                    <img src={like} alt="" />
                                    <span>{valueConverter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                    <img src={dislike} alt="" />
                                </div>
                            </div>
                        </div>
                    )
                })}


            </div>
        </div>
    )
}

export default PlayVideo
