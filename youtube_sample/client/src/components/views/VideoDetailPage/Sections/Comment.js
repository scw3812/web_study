import Axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';

function Comment(props) {
    const videoId = props.postId
    const user = useSelector(state => state.user)
    const [CommentValue, setCommentValue] = useState("")

    const handleChange = e => {
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = e => {
        e.preventDefault()

        if (user.userData._id) {
            const variable = {
                content: CommentValue,
                writer: user.userData._id,
                postId: videoId
            }
            Axios.post('/api/comment/saveComment', variable)
                .then(response => {
                    if (response.data.success) {
                        console.log(response.data.result)
                    } else {
                        alert('코멘트 저장 실패')
                    }
                })
        } else {
            alert('로그인하세요')
        }
    }

    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {props.comments && props.comments.map((comment, index) =>(
                <SingleComment key={index} comment={comment} postId={videoId}/>
            ))}
            

            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={CommentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
