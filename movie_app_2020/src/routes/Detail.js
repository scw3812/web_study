import React from 'react';

class Detail extends React.Component{
    componentDidMount() {
        const { location, history } = this.props;

        if (location.state === undefined) {
            history.push('/');
        }
    }

    render() {
        const { location } = this.props;

        if (location.state) {
            return (
                <div>
                    <h1>{location.state.title}</h1>
                    <img src={location.state.poster}/>
                </div>
            );
        } else {
            return null;
        } 
    }
}

export default Detail;