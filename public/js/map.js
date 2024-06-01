mapboxgl.accessToken = mapToken
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]
        zoom: 10 // starting zoom
    });

    const marker1 = new mapboxgl.Marker({color:"#FF385C"})
        .setLngLat(coordinates)
        .setPopup(
            new mapboxgl.Popup({offset: 30})
            .setHTML("<p>Exact location will be shown after booking!</p>")
        )
        .addTo(map);