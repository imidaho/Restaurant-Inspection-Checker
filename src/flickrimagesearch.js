import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types'


class FlickrImageSearch extends Component {
    constructor() {
        super();
        this.state = {
            flickrPhotos: []
        }
    }

    photoInput = React.createRef();

    generateImage = (farmId, serverId, Id, secret) => {
        const url = `https://farm${farmId}.staticFlickr.com/${serverId}/${Id}_${secret}_c.jpg`
        return (<div className="text-center" style={{ margin: 10 }}>
            <img className="img-fluid rounded" src={url} />
        </div>)
    }

    fetchPhotos = (e) => {
        e.preventDefault();
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=84468b7152a743aab170a8e0fee052a1&tags=${this.photoInput.current.value}&per_page=5&format=json&nojsoncallback=1`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data.photos.photo)
                this.setState({ flickrPhotos: data.photos.photo })
            }
            )
        e.currentTarget.reset();
    }
    render() {
        const photosToDisplay = this.state.flickrPhotos.map(index => this.generateImage(index.farm, index.server, index.id, index.secret))

        return (
            <div>
                <div>
                    <h1 className="title">Photo Search</h1>
                </div>
                {/* <div>
                    <span style={{ z- index: 50;font-size:0.9em;}}><img src="https://theysaidso.com/branding/theysaidso.png" height={{ 20}} width={{ 20}} alt="theysaidso.com" /><a href="https://theysaidso.com" title="Powered by quotes from theysaidso.com" style={{ color: #9fcc25, margin-left: 4, vertical-align: middle}}>theysaidso.com</a></span>
                </div > */}
                <div>
                    <form onSubmit={this.fetchPhotos} >
                        <input
                            className="form-control form-control-med"
                            type="text"
                            placeholder="Enter a Photo Search Term"
                            ref={this.photoInput}
                        />
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary mb-2 mx-auto" style={{ width: 400 }}>Search for photos with this term</button>
                        </div>
                    </form >
                </div>
                <div>{photosToDisplay} </div>
            </div >
        )
    }

}

export default FlickrImageSearch