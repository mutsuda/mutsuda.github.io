document.addEventListener('DOMContentLoaded', function () {
    const flightArea = document.getElementById('flightArea');
    const minLat = 41.31601;
    const maxLat = 41.46848;
    const minLon = 2.13284;
    const maxLon = 2.48867;



    function fetchFlights() {
        fetch(`http://flights.mutsuda.com/api/flightsinarea?min_lat=${minLat}&max_lat=${maxLat}&min_lon=${minLon}&max_lon=${maxLon}`)
            .then(response => response.json())
            .then(data => updateFlights(data.filter(flight => flight.altitude <= 5000))) // Filtrar por altitud
            .catch(error => console.error('Error fetching flight data:', error));
    }

function updateFlights(flights) {
    const existingPlanes = document.querySelectorAll('.airplane-container');
    const flightDataMap = new Map(flights.map(flight => [flight.flight.trim(), flight]));

    existingPlanes.forEach(planeContainer => {
        const flightCode = planeContainer.querySelector('.flight-info').textContent;
        if (flightDataMap.has(flightCode)) {
            const flight = flightDataMap.get(flightCode);
            const xPosition = 100 - ((flight.lon - minLon) / (maxLon - minLon)) * 100;
            const yPosition = 100 - (flight.altitude / 5000) * 100;

            planeContainer.style.left = `${xPosition}%`;
            planeContainer.style.top = `${yPosition}%`;
            flightDataMap.delete(flightCode);
        } else {
            planeContainer.remove(); // Remove the plane if it's no longer in the data
        }
    });

    // Add new planes
    flightDataMap.forEach((flight, flightCode) => {
        createPlaneElement(flight, flightCode);
    });
}

function createPlaneElement(flight, flightCode) {
    const planeContainer = document.createElement('div');
    planeContainer.className = 'airplane-container';
    const xPosition = 100 - ((flight.lon - minLon) / (maxLon - minLon)) * 100;
    const yPosition = 100 - (flight.altitude / 5000) * 100;

    planeContainer.style.left = `${xPosition}%`;
    planeContainer.style.top = `${yPosition}%`;

    const plane = document.createElement('img');
    plane.src = '/assets/images/flights/airplane-icon.svg';
    plane.className = 'airplane';
    plane.style.width = '50px';  // Fuerza el tamaño a ser constante
    plane.style.height = '50px'; // Fuerza el tamaño a ser constante

    const flightInfo = document.createElement('div');
    flightInfo.className = 'flight-info';
    flightInfo.textContent = flightCode;

    planeContainer.appendChild(plane);
    planeContainer.appendChild(flightInfo);
    flightArea.appendChild(planeContainer);
}
    setInterval(fetchFlights, 3000); // Actualizar cada 3 segundos
    fetchFlights(); // Llamada inicial
});


document.addEventListener('DOMContentLoaded', function () {
    const scaleContainer = document.getElementById('altitudeScale');
    const maxAltitude = 5000;  // Altitud máxima en pies
    const step = 500;  // Cada 500 pies una marca

    for (let altitude = 0; altitude <= maxAltitude; altitude += step) {
        const mark = document.createElement('div');
        mark.className = 'scale-mark';
        mark.style.bottom = `${(altitude / maxAltitude) * 100}%`; // Usar bottom para alinear desde abajo
        mark.textContent = `${altitude} ft`;

        scaleContainer.appendChild(mark);
    }
});