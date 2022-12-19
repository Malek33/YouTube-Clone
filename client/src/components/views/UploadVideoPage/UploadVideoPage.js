import React, { useState, useEffect } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd'
import Dropzone from 'react-dropzone'
import Axios from 'axios'
import { useSelector } from 'react-redux'

const { Title } = Typography
const { TextArea } = Input

const Private = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' },
]

const Category = [
    { value: 0, label: 'Film & Animation' },
    { value: 1, label: 'Autos & Vehicules' },
    { value: 2, label: 'Music' },
    { value: 3, label: 'Pets & Animals' },
    { value: 4, label: 'Sports' },
]


function UploadVideoPage(props) {
    const user = useSelector(state => state.user)

    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("")
    const [privacy, setPrivacy] = useState(0)
    const [Categories, setCategories] = useState("Film & Animation");
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const [Thumbnail, setThumbnail] = useState("");

    const handleChangeTitle = (e) => {
        console.log(e.currentTarget.value)
        setTitle(e.currentTarget.value)
    }

    const handleChangeDecsription = (e) => {
        console.log(e.currentTarget.value)
        setDescription(e.currentTarget.value)
    }

    const handleChangeOne = (e) => {
        console.log(e.currentTarget.value)
        setPrivacy(e.currentTarget.value)
    }

    const handleChangeTwo = (e) => {
        console.log(e.currentTarget.value)
        setCategories(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (user.userData && !user.userData.isAuth) {
            return(alert('please login first!'))
        }
        if (title === "" || Description === "" || privacy === 0 || Categories === "" || FilePath === "" || Thumbnail === "") {
            return alert('please fill all the fields!')
        }

        const variables = {
            writer: user.userData._id,
            title: title,
            description: Description,
            privacy: privacy,
            filePath: FilePath,
            category: Categories,
            duration: Duration,
            thumbnail: Thumbnail
        }

        Axios.post('/api/video/uploadVideo', variables)
        .then(res => {
            if (res.data.success) {
                alert('Video Uploaded successfully !')
                props.history.push('/')
            }else{
                alert('fail to upload video!')
            }
        })
    }

    const onDrop = ( files ) => {

        let formData = new FormData()
        const config = {
            header: { 'constent-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append("file", files[0])
        Axios.post('/api/video/uploadfiles', formData, config)
        .then(response => {
            if (response.data.success) {

                let variable = {
                    filePath: response.data.filePath,
                    fileName: response.data.fileName
                }
                setFilePath(response.data.filePath)

                // thumbnail
                Axios.post('/api/video/thumbnail', variable)
                .then(response => {
                    if (response.data.success) {
                        setDuration(response.data.fileDuration)
                        setThumbnail(response.data.thumbsFilePath)
                    }else{
                        alert('failed to make thumbnail!')
                    }
                })

            }else{
                alert('failed to save the video in server')
            }
        })
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />

                            </div>
                        )}
                    </Dropzone>

                    {Thumbnail !== "" &&
                        <div>
                            <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
                        </div>
                    }
                </div>

                <br /><br />
                <label>Title</label>
                <Input
                    onChange={handleChangeTitle}
                    value={title}
                />
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={handleChangeDecsription}
                    value={Description}
                />
                <br /><br />

                <select onChange={handleChangeOne}>
                    {Private.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <select onChange={handleChangeTwo}>
                    {Category.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>

            </Form>
        </div>
    )
}

export default UploadVideoPage
