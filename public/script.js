const $ = (str) => document.querySelector(str);
const URL = "https://us-central1-trip-manager-api.cloudfunctions.net/api/trips";


$("#addTripsForm").onsubmit = function addDataApi(event) {
	event.preventDefault();

	axios.post(URL, {
		"id": $("#userId").value,
		"date": $("#date").value,
		"startTime": $("#startTime").value,
		"endTime": $("#endTime").value,
		"title": $("#title").value,
		"description": $("#description").value,
		"address": $("#address").value,
	})
	.then (res =>{
		console.log("votre trajet à bien été ajouter")
	})
}

axios.get(URL)
.then(res => {
	const result = res.data.result;
	for (let i = 0; i < result.length; i++) {
		const tr = document.createElement('tr');
		tr.innerHTML = `
		<td colspan="2">${result[i].date}</td>
		<td colspan="2">${result[i].title}</td>
		<td colspan="2">${result[i].startTime}</td>
		<td colspan="2">${result[i].endTime}</td>
		<td colspan="2">${result[i].description}</td>
		<td colspan="2">${result[i].address}</td>
		<td colspan="2">${result[i].userId}</td>
		`;
		$('#dataTable').append(tr);
	}
})
