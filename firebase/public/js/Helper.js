function main() {
	$.ajax({
		url: "https://script.google.com/macros/s/AKfycbxQavSesJpTI1mNOjzud8dUpHxvarjuL5DKGC53O_m758PZoUcP/exec",
		method: "POST",
		dataType: "jsonp",
		data: JSON.stringify({fnct: "Test"}),
		success: function(res) {
			console.log(res);
		}
	})
}
main();

var Helper = { // General Helper object

	// Constants

	// Functions

	parseCalendarData: function(input) {

		var output = [];
		for (var i = 0; i < input.length; i++) {

			var object = {
				id: input[i].event.attributes._id,
				title: input[i].group.attributes.groupName,
				start: moment(input[i].event.attributes.calEvent.calStart),
				end: moment(input[i].event.attributes.calEvent.calEnd)
			}
			output.push(object);

		}
		return output;

	},
	arrayWhere: function(array, field, value) {

		var output = [];
		for (var i = 0; i < array.length; i++) {

			if (array[i].attributes[field] === value) {
				output.push(array[i]);
			}

		}
		return output;

	},
	getAllEvents: function() { // Get all events / group information

		var output = [];
		for (var i = 0; i < app.eventList.length; i++) {

			var group = app.groupList.where({_id: app.eventList.models[i].attributes.groupID});
			var object = {
				id: app.eventList.models[i].attributes._id,
				title: group[0].attributes.groupName,
				start: app.eventList.models[i].attributes.calEvent.calStart,
				end: app.eventList.models[i].attributes.calEvent.calEnd
			};
			output.push(object);

		}
		return output;

	},
	updateEvent: function(json) {

		var object = JSON.parse(json);

		if (object.response === true) {
			toastr.success("Event updated!");
		} else {
			toastr.warning("Event not updated on Google Calendar");
		}

	},
	load_invoice: function(json) {

		var object = JSON.parse(json);

		if (object.response === true) {

			// Alert user
			toastr.success("Invoice created!");

			var event = app.eventList.where({_id: object.id})[0];

			// Set url to model
			event.set({
				invoice_url: object.url
			});

			// Open in new tab
			window.open(object.url, '_blank');

		}

	},
	getGroupArray: function(fields, opts) { // Fields as array of attributes

		var output = [];
		for (var i = 0; i < app.groupList.length; i++) {

			var object = {};
			var model = app.groupList.models[i];
			for (var j = 0; j < fields.length; j++) {

				object[fields[j]] = model.attributes[fields[j]];

			}
			if (opts) {
				if (opts.selectButton) {
					object.button = "<button class='btn btn-primary select-group-click' group='" + model.attributes._id + "' role='button'>Select</button>";
				}
			}
			output.push(object);

		}
		return output;

	},
	collectionContains: function(collection, value, fields) {

		var output = [];
		for (var i = 0; i < collection.length; i++) {

			for (var j = 0; j < fields.length; j++) {

				var attribute = collection[i].attributes[fields[j]].toLowerCase();
				if (attribute.indexOf(value.toLowerCase()) !== -1) { // is contained
					output.push(collection[i]);
					j = fields.length;
				}

			}

		}
		return output;

	}

}