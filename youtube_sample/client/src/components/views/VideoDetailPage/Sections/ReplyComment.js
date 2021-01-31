import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {

    const videoId = props.postId

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {
        let commentNumber = 0;

        props.comments.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++;
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.comments])

    const renderReplyComment = (parentCommentId) => (
        props.comments.map((comment, index) => (
            <React.Fragment>
                {
                    comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment key={index} refreshFunction={props.refreshFunction} comment={comment} postId={videoId}/>
                        <ReplyComment refreshFunction={props.refreshFunction} postId={videoId} parentCommentId={comment._id} comments={props.comments}/>
                    </div>
                }
            </React.Fragment>
        )) 
    )

    const onHandleChange = e => {
        setOpenReplyComments(!OpenReplyComments)
    }

    return (
        <div>
            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={onHandleChange}>
                    View {ChildCommentNumber} more comment(s)
                </p>
            }
            
            
            {OpenReplyComments &&
             renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
