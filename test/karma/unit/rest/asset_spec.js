var frisby = require('frisby');

/**
CANNOT TEST VALUES BY PUT OR POST BECAUSE OF FORMATTING WITH JSON OBJECTS. NEED TO ADDRESS THIS.
*/

frisby.create('Get all Assets associated with iCar application')
    .get('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
	.expectBodyContains('AssetTest1')
	.expectBodyContains('AssetTest2')
	.expectBodyContains('en_US')
	.expectBodyContains('BradWare')
	.expectBodyContains('Value1Test')
	.expectBodyContains('tag1')
	.expectBodyContains('tagCity')
    .expectBodyContains('MangeshTag')
    .expectBodyContains('Cali')
    .expectBodyContains('iCar')
    .toss();


frisby.create('New Asset POST')
    .post('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets', 
    {
			name: 'testDummyAsset',
			status: 'Not Translated',
			app_id: '53b06ea66d79fb15f51f2b8c',
			tags: ['dummy', 'test'],
			created_by: 'BradWare',
			last_modified_by: 'BWare',
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes({
    		_id: String,
    		name: String,
    		status: String,
    		app_id: String,
    		tags: [String],
    		created_by: String,
    		__v: Number,
    		created_date: String,
            last_modified_by: String,
            last_modified_date: String,
    })
    .expectJSON({
			name: 'testDummyAsset',
			status: 'Not Translated',
			app_id: '53b06ea66d79fb15f51f2b8c',
			tags: ['dummy', 'test'],
			created_by: 'BradWare',
			last_modified_by: 'BWare',
    })
    .toss();


frisby.create('New Asset PUT')
    .put('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/?name=testDummyAsset', 
    {
		status: 'In Progress'

	})
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .toss();



frisby.create('Delete the testDummyAsset made with string search')
    .delete('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/?name=testDummyAsset')
    .expectStatus(200)
    .expectJSON({
		message: 'Asset Deleted!'
    })
    .toss();

frisby.create('Get all Assets associated with iCar application')
    .get('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/53b08fc2cc5faf00007d6354')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
	 .expectJSONTypes({
    		_id: String,
    		name: String,
    		status: String,
    		app_id: String,
    		tags: [String],
    		created_by: String,
    		__v: Number,
    		created_date: String,
            last_modified_by: String,
            last_modified_date: String,
            values: [Object]
    })
	.expectJSON({
			name: 'AssetTest1',
			status: 'Not Translated',
			app_id: '53b06ea66d79fb15f51f2b8c',
			tags: ['tag1', 'tag3'],
			created_by: 'BradWare',
			last_modified_by: 'BWare',
			_id: '53b08fc2cc5faf00007d6354',
			values: [ {
				string: 'Value1Test',
				status: 'Not Translated',
				locale_code: 'en_US',
				created_by: 'BradWare',
				_id: '53b08fc2cc5faf00007d6355',
				created_date: '2014-06-29T22:14:26.763Z'
			}]
    })
    .toss();


frisby.create('New Asset PUT')
    .put('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/53b08fcfcc5faf00007d6356', 
    {
		status: 'In Progress'

	})
	.expectJSONTypes({
    		_id: String,
    		name: String,
    		status: String,
    		app_id: String,
    		tags: [String],
    		created_by: String,
    		__v: Number,
    		created_date: String,
            last_modified_by: String,
            last_modified_date: String,
            values: [Object]
    })
	.expectJSON({
			name: 'AssetTest2',
			status: 'In Progress',
			app_id: '53b06ea66d79fb15f51f2b8c',
			tags: ['tag1', 'test'],
			created_by: 'BradWare',
			last_modified_by: 'BWare',
			_id: '53b08fcfcc5faf00007d6356',
			values: [ {
				string: 'Value1Test',
				status: 'Not Translated',
				locale_code: 'en_US',
				created_by: 'BradWare',
				_id: '53b08fcfcc5faf00007d6357',
				created_date: '2014-06-29T22:14:39.482Z'
			}]
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .toss();


/*
	CANNOT AUTOMATICALLY TEST DELETE BECAUSE OF ID PURPOSES

frisby.create('Delete the testDummyAsset made with string search')
    .delete('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/53b08ff9cc5faf00007d6358')
    .expectStatus(200)
    .expectJSON({
		message: 'Asset Deleted!'
    })
    .toss();
*/