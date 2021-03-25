import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import './FavoritePage.css'
import { Popover } from 'antd'
import { IMAGE_BASE_URL } from '../../Config'

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavorites()
    }, [])

    const fetchFavorites = () => {
        Axios.post('api/favorite/getFavorites', { userFrom: localStorage.getItem('userId') })
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.favorites)
                } else {
                    alert("불러오기 실패")
                }
            })
    }

    const onClickDelete = (movieId, userFrom) => {
        Axios.post('/api/favorite/removeFavorite', { movieId, userFrom })
            .then(response => {
                if (response.data.success) {
                    fetchFavorites()
                } else {
                    alert("삭제 실패")
                }
            })
    }

    const renderCards = Favorites.map((favorite, index) => {
        
        const content = (
            <div>
                {favorite.moviePost?
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> 
                    : "no image"
                }
            </div>
        )
        
        return (
            <tr key={index}>
                <Popover content={content} title={`${favorite.movieTitle}`}>
                    <td>{favorite.movieTitle}</td>
                </Popover>
                <td>{favorite.movieRunTime} mins</td>
                <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
            </tr>
        )
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <h2> Favorite Movies </h2>
            <br/>

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Remove from Favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
