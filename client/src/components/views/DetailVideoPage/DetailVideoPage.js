import React, { useEffect, useState } from 'react'
import { List, Avatar, Typography } from 'antd'
import Axios from 'axios';

function DetailVideoPage(props) {

    const videoId = props.match.params.videoId
    const [Video, setVideo] = useState("");

    const videoVariable = {
        videoId: videoId
    }

    useEffect(() => {
        Axios.post('/api/video/getVideo', videoVariable)
        .then(response => {
            if (response.data.success){
                console.log(response.data.video);
                setVideo(response.data.video)
            }else{
                alert('failed to get video info!')
            }
        })
    }, []);

    return (
        <div className='postPage' style={{ width: '100%', padding: '3rem 4em' }}>
            <video style={{ width: '70vw', height: '70vh' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>

            <List.Item actions={[]}>
                <List.Item.Meta avatar={<Avatar src={Video.writer && Video.writer.image}/>} title={<a href='https://antdesign'>{Video.title}</a>} description={Video.description} />
                <div></div>
            </List.Item>
        </div>
    )
}

export default DetailVideoPage
