import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

function SingleComment(props) {
    
    const videoId = props.postId
    const user = useSelector(state => state.user)
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    const onClickReply = e => {
        setOpenReply(!OpenReply)
    }

    const handleChange = e => {
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = e => {
        e.preventDefault()

        const variable = {
            content: CommentValue,
            writer: user.userData._id,
            postId: videoId,
            responseTo: props.comment
        }
        Axios.post('/api/comment/saveComment', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result)
                } else {
                    alert('코멘트 저장 실패')
                }
            })
    }

    const actions = [
        <span onClick={onClickReply} key="comment-basic-reply-to">Reply</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt />}
                content={<p>{props.comment.content}</p>}
            />

            {OpenReply &&
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
            }
        </div>
    )
}

export default SingleComment
