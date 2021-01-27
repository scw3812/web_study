import Axios from 'axios'
import React, { useEffect, useState } from 'react'

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        let variable = { userTo: props.userTo }

        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('구독자 수 정보 받아오기 실패')
                }
            })
        let subscriberVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId') }

        Axios.post('/api/subscribe/subscribed', subscriberVariable)
        .then(response => {
            if (response.data.success) {
                setSubscribed(response.data.subsribed)
            } else{
                alert('구독 정보를 받아오지 못했습니다.')
            }
        })
    }, [])

    const onSubscribe = (e) => {
        let subscribeVariable = {
            userTo: props.userTo,
            userFrom: localStorage.getItem('userId')
        }
        if (Subscribed) {
            Axios.post('/api/subscribe/unSubscribe', subscribeVariable)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('구독 취소 실패')
                    }
                })
        } else {
            Axios.post('/api/subscribe/subscribe', subscribeVariable)
                .then(response => {
                    if (response.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('구독 실패')
                    }
                })
        }
    }

    return (
        <div>
            <button
                style={{ 
                    backgroundColor: `${Subscribed? '#aaaaaa' : '#cc0000'}`, borderRadius: '4px',
                    color: 'white', padding: '10px 16px',
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase', border: 'none'
                }}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
