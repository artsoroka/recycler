module.exports = {
	APP: {
		port: process.env.RECYCLER_PORT || 8080
	}, 
	dataProvider: {
		cityInfoUrl: 'http://recyclemap.ru/ajax_city_info.php', 
		cityMarkers: 'http://recyclemap.ru/ajax_markers_xml.php', 
	}
}; 