import React, {useState} from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import DropZone from 'react-dropzone';
import Axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    {value: 0, label: "Private"},
    {value: 1, labke: "Public"}
]

const CategoryOptions = [
    {value: 0, label: "Film & Animation"},
    {value: 1, labke: "Autos & Vehicles"},
    {value: 2, labke: "Music"},
    {value: 3, labke: "Pets & Animals"},
]

function VideoUploadPage() {
    
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")

    const onTitleChange = e => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = e => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = e => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = e => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {

                } else {
                    alert("비디오 업로드를 실패했습니다")
                }
            })
    }

    return (
        <div syle={{ maxwidth: '700px', margin:'2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <DropZone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={100000000}
                    >
                        {({ getRootProps, getInputProps}) => (
                            <div style={{ width:'300px', height:'240px', border:'1px solid lightgray', display:'flex',
                            alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize:'3rem'}} />
                            </div>
                        )}
                        
                    </DropZone>
                    <div>
                        <img src alt />
                    </div>
                </div>

                <br/>
                <br/>
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br/>
                <br/>
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br/>
                <br/>

                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br/>
                <br/>
                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                
                <br/>
                <br/>
                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage