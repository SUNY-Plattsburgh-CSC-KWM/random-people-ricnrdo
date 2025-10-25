async function getPeople() {
	try {
		const response = await fetch("https://randomuser.me/api/?results=25&nat=us");
		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
			console.log("Error");
        }
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(`Could not get names: ${error}`);
	}
}

async function buildTable() {
	try {
		const data = await getPeople();

		const people = data.results.map(person => {
			return {
				name: `${person.name.first} ${person.name.last}`,
				address: `${person.location.street.number} ${person.location.street.name}`,
				city: person.location.city,
				state: person.location.state,
				zip: person.location.postcode,
				lat: person.location.coordinates.latitude,
				lng: person.location.coordinates.longitude,
				phone: person.phone
			};
		});

		people.sort((a, b) => a.name.split(" ")[1].localeCompare(b.name.split(" ")[1]));

		const tbody = $("#people-body");
		tbody.empty();

		people.forEach(p => {
			const row = `
				<tr>
					<td title="${p.phone}">${p.name}</td>
					<td title="${p.phone}">${p.address}</td>
					<td title="${p.phone}">${p.city}</td>
					<td title="${p.phone}">${p.state}</td>
					<td title="${p.phone}">${p.zip}</td>
					<td title="${p.phone}">${p.lat}</td>
					<td title="${p.phone}">${p.lng}</td>
				</tr>`;
			tbody.append(row);
		});
	} catch (e) {
		console.log("Error " + e);
	}
}

buildTable();