import React, { Component } from 'react';
import { GoogleMapsLoader, GeoSearch, Control, Marker } from 'react-instantsearch-dom-maps';

class Map extends Component {
    render() {
        return (
            <GoogleMapsLoader apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
                {google => (
                    <GeoSearch google={google}
                        zoom={10}
                        // enableRefine={true}
                        initialPosition={{
                            lat: 40.781314849853516,
                            lng: -73.97395324707031,
                        }}>
                        {({ hits }) => {
                            return (
                                <>
                                    <Control />
                                    {hits.map(hit => (
                                        <Marker key={hit.objectID} hit={hit} />
                                    ))}
                                </>
                            )
                        }}
                    </GeoSearch>
                )}
            </GoogleMapsLoader>
        )
    }
}

export default Map;
