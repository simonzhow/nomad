# Backend API Documentation

## TravelEntryController

```javascript
GET /api/travelentries/:user_id => getTravelEntries
req.body = {
	user_id: some_id
}
if error:
	res.status = 500
if success:
	res = {
		travelentries: [entry1, entry2, ...]
	}
```

```javascript
POST /api/travelentries/ => createTravelEntry
req.body = {
	travelEntry: {
		title: string ,
		user_id: guid ,
		location: {
			latitude: number,
			longitude: number
		}
	}
}
if title, location, user_id missing:
	res.status = 403
if unable to save location or travel entry:
	res.status = 500
if success:
	res = {
		saved: travelEntry
	}
```

```javascript
DELETE /api/travelentries/:travel_id => deleteTravelEntry
req.params = {
	travel_id: some_id
}
if error:
	res.status = 500
if success:
	res.status = 200
```
