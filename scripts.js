document.addEventListener('DOMContentLoaded', function() {
    const pieCharts = document.querySelectorAll('.pie-chart');

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function animatePieCharts() {
        pieCharts.forEach(chart => {
            const value = parseFloat(chart.getAttribute('data-value'));
            const range = parseFloat(chart.getAttribute('data-range'));
            const percentage = (value / range) * 100;

            let currentPercentage = 0;
            const increment = percentage / 100;

            chart.style.setProperty('--percentage', `${currentPercentage}%`);
            chart.style.setProperty('--color', getRandomColor());

            const updateChart = () => {
                if (currentPercentage >= percentage) {
                    currentPercentage = 0; // Reset to 0 to start filling again
                } else {
                    currentPercentage += increment;
                }
                chart.style.setProperty('--percentage', `${currentPercentage}%`);
                chart.setAttribute('data-value', Math.floor(currentPercentage)); // Update the data-value
            };

            const interval = setInterval(updateChart, 200);

            // Change color every 2 seconds
            setInterval(() => {
                chart.style.setProperty('--color', getRandomColor());
            }, 3000);
        });
    }

    animatePieCharts(); // Apply styles initially
});

// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Maps
    const map = L.map('map').setView([20, 0], 2);
    const satellite = L.map('satellite').setView([20, 0], 2);

    // World Map Tile Layer
    L.tileLayer('https://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; Map tiles by <a href="https://stamen.com">Stamen Design</a>'
    }).addTo(map);

    // Satellite Tile Layer
    L.tileLayer('https://{s}.googleapis.com/vt?x={x}&y={y}&z={z}', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.google.com/intl/en_us/help/terms_maps.html">Google Maps</a>'
    }).addTo(satellite);

    // Sample Data Points
    const locations = [
        { lat: 40.7128, lng: -74.0060, name: 'New York', info: 'Information about New York.' },
        { lat: 34.0522, lng: -118.2437, name: 'Los Angeles', info: 'Information about Los Angeles.' },
        { lat: 48.8566, lng: 2.3522, name: 'Paris', info: 'Information about Paris.' },
        { lat: -33.8688, lng: 151.2093, name: 'Sydney', info: 'Information about Sydney.' },
        { lat: 35.6895, lng: 139.6917, name: 'Tokyo', info: 'Information about Tokyo.' }
    ];

    // Add Markers and Popups to World Map
    locations.forEach(location => {
        L.marker([location.lat, location.lng]).addTo(map)
            .bindPopup(`<div class="map-popup"><h3>${location.name}</h3><p>${location.info}</p></div>`)
            .on('click', function() {
                this.openPopup();
                map.setView([location.lat, location.lng], 5);
            });
    });

    // Add Click Events to Toggle Views
    document.getElementById('map-view').addEventListener('click', () => {
        document.getElementById('map').classList.remove('hidden');
        document.getElementById('satellite').classList.add('hidden');
        document.getElementById('map-view').classList.add('active');
        document.getElementById('satellite-view').classList.remove('active');
    });

    document.getElementById('satellite-view').addEventListener('click', () => {
        document.getElementById('map').classList.add('hidden');
        document.getElementById('satellite').classList.remove('hidden');
        document.getElementById('satellite-view').classList.add('active');
        document.getElementById('map-view').classList.remove('active');
    });

    // Add Interactivity to Satellite View
    satellite.on('click', function(e) {
        const latlng = e.latlng;
        const lat = latlng.lat.toFixed(2);
        const lng = latlng.lng.toFixed(2);
        L.popup()
            .setLatLng(latlng)
            .setContent(`<div class="map-popup"><h3>Coordinates</h3><p>Latitude: ${lat}<br>Longitude: ${lng}</p></div>`)
            .openOn(satellite);
    });
});
