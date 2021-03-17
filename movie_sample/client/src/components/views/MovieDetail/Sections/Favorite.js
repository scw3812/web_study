import React, { useEffect } from 'react'

function Favorite(props) {

    useEffect(() => {

        let variable = {
            userFrom: props.userFrom,
            movieId: props.movieId
        }

        Axios.post('/api/favorite/number', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                } else {
                    alert('숫자 불러오기 실패')
                }
            })
    })

    return (
        <div>
            <button>Favorite</button>
        </div>
    )
}

export default Favorite
