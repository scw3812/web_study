import React, { useEffect, useState } from 'react'
import Axios from 'axios';

function Favorite(props) {

    const userFrom = props.userFrom
    const movieId = props.movieId
    const movieTitle = props.movieInfo? props.movieInfo.title : ""
    const moviePost = props.movieInfo? props.movieInfo.backdrop_path : ""
    const movieRunTime = props.movieInfo? props.movieInfo.runtime : ""

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variable = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }

    useEffect(() => {
        Axios.post('/api/favorite/number', variable)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('숫자 불러오기 실패')
                }
            })

        Axios.post('/api/favorite/favorited', variable)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert('정보 불러오기 실패')
                }
            })
    })

    const onClickFavorite = e => {
        if (Favorited) {
            Axios.post('/api/favorite/removeFavorite', variable)
                .then(response => {
                    if (response.data.success) {
                        setFavorited(!Favorited)
                        setFavoriteNumber(FavoriteNumber - 1)
                    } else {
                        alert("삭제 실패")
                    }
                })
        } else {
            Axios.post('/api/favorite/addFavorite', variable)
                .then(response => {
                    if (response.data.success) {
                        setFavorited(!Favorited)
                        setFavoriteNumber(FavoriteNumber + 1)
                    } else {
                        alert("추가 실패")
                    }
                })
        }
    }

    return (
        <div>
            <button onClick={onClickFavorite}>{Favorited? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</button>
        </div>
    )
}

export default Favorite
