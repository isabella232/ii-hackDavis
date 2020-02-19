import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    position: 'relative',
    width: '100%',
    height: '500px'
};

class GoogleMap extends Component {
    render() {
        return (
            <Map google={this.props.google}
                zoom={13}
                // style={mapStyles}
                containerStyle={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176 }}>
                <Marker position={{ lat: 48.00, lng: -122.00 }} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY })(GoogleMap);
