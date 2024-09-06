import "./Recommended.css"
import { useEffect, useState } from "react"
import { valueConverter, youtubeAPI } from "../../data"
import { Link } from "react-router-dom"
const Recommended = ({ categoryId }) => {

  const [recomendedVideodata, setRecommendedVideoData] = useState([])

  const fetchData = async () => {
    const relatedVideoURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${youtubeAPI}`
    
    fetch(relatedVideoURL).then(res => res.json()).then(data => setRecommendedVideoData(data.items))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="recomended">
      {recomendedVideodata.map((item,index) => {
        return (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={index}>
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{valueConverter(item.statistics.viewCount)} views</p>
            </div>
          </Link>
        )
      })}


    </div>
  )
}

export default Recommended
