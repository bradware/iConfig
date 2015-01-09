var frisby = require('frisby');

frisby.create('Get all Projects in the Database')
    .get('http://localhost:3000/projects/')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
	.expectBodyContains('FirstProject')
	.expectBodyContains('Project1')
	.expectBodyContains('53b19d3428d57e0000e0e77e')
	.expectBodyContains('statuses')
	.expectBodyContains('description')
    .expectBodyContains('BradWare')
	.toss();


frisby.create('POST a Project')
    .post('http://localhost:3000/projects/', {
    	name: 'DummyProject',
    	created_by: 'testBrad',
    	created_date: '04/01/2044',    //this should not have an effect
    	description: 'This is a test project'
        //Statuses can't be posted this way formatting error
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes({
    		name: String,
    		created_by: String,
    		description: String,
    		created_date: String,
    		_id: String,
    		statuses: [ ],
            assets: [ ]
    })
	.toss();

frisby.create('GET a Project based on its ID')
    .get('http://localhost:3000/projects/53b19d3428d57e0000e0e77e')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes({
    		name: String,
    		created_by: String,
    		description: String,
    		created_date: String,
    		_id: String,
    		statuses: [ ],
            assets: [ ]
    })
    .expectJSON({
		_id: '53b19d3428d57e0000e0e77e',
        last_modified_by: 'BWare',
        created_by: 'BradWare',
        description: 'FirstProject',
        name: 'Project1',
        assets: [ ],
        statuses: [ ],
        created_date: '2014-06-30T17:24:04.089Z'
    })
	.toss();


frisby.create('PUT change something about the ')
    .put('http://localhost:3000/projects/53b19d3428d57e0000e0e77e', {
    	description: 'TheFirstProject'
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes({
    		name: String,
    		created_by: String,
    		description: String,
    		created_date: String,
    		_id: String,
    		statuses: [ ],
            assets: [ ]
    })
    .expectJSON({
		_id: '53b19d3428d57e0000e0e77e',
        last_modified_by: 'BWare',
        created_by: 'BradWare',
        description: 'TheFirstProject',
        name: 'Project1',
        assets: [ ],
        statuses: [ ],
        created_date: '2014-06-30T17:24:04.089Z'
    })
	.toss();

frisby.create('PUT change something about the ')
    .put('http://localhost:3000/projects/53b19d3428d57e0000e0e77e', {
        description: 'FirstProject'
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes({
            name: String,
            created_by: String,
            description: String,
            created_date: String,
            _id: String,
            statuses: [ ],
            assets: [ ]
    })
    .expectJSON({
        _id: '53b19d3428d57e0000e0e77e',
        last_modified_by: 'BWare',
        created_by: 'BradWare',
        description: 'FirstProject',
        name: 'Project1',
        assets: [ ],
        statuses: [ ],
        created_date: '2014-06-30T17:24:04.089Z'
    })
    .toss();

frisby.create('POST a Project Status based on its ID')
    .post('http://localhost:3000/projects/53b19d3428d57e0000e0e77e/statuses', {
        status: 'TestStatus' 
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes([ {
            status: String,
            _id: String,
            date: String
    } ])
    .toss();


frisby.create('GET a Project Statuses based on its ID')
    .get('http://localhost:3000/projects/53b19d3428d57e0000e0e77e/statuses')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes([ {
            status: String,
            _id: String,
            date: String
    } ])
    .expectBodyContains('TestStatus')
    .toss();


/*
	GETS ALL OF THE CURRENT STATUS  WITH THE ASSOCIATED PROJECT
*/

frisby.create('GET a Project Statuses based whether it is CURRENT')
    .get('http://localhost:3000/projects/53b19d3428d57e0000e0e77e/statuses/current')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes([ {
    		status: String,
    		_id: String,
    		date: String
    } ])
    .expectBodyContains('TestStatus')
	.toss();


frisby.create('GET a Project Status based on its ID')
    .get('http://localhost:3000/projects/53b19d3428d57e0000e0e77e/statuses/53b1d7eb09a3ac831d744ff0')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes( {
    		status: String,
    		_id: String,
    		date: String
    })
    .expectJSON(
    	{
			status: 'FirstProjectStatus',
			_id: '53b1d7eb09a3ac831d744ff0',
			date: '2014-06-30T21:34:35.041Z'
		} )
	.toss();


frisby.create('GET a Project Asset based on its AssetID')
    .get('http://localhost:3000/projects/53b19d3428d57e0000e0e77e/assets')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectBodyContains('53b08fc2cc5faf00007d6354')
    .toss();


frisby.create('POST a Project Asset based on its AssetID')
    .post('http://localhost:3000/projects/53b19d3428d57e0000e0e77e/assets', {
        asset: '53b08fcfcc5faf00007d6356'
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectBodyContains('53b08fc2cc5faf00007d6354')
    .expectBodyContains('53b08fcfcc5faf00007d6356')
    .toss();


frisby.create('DELETE a Project Asset based on its AssetID')
    .delete('http://localhost:3000/projects/53b19d3428d57e0000e0e77e/assets', {
        asset: '53b08fcfcc5faf00007d6356'
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectBodyContains('53b08fc2cc5faf00007d6354')
    .toss();

/*
	RUN THIS FILE ONCE AND THEN DELETE THE DUMMYPROJECT CREATED
*/

/*

frisby.create('DELETE a PROJECT with its ID')
	.delete('http://localhost:3000/projects/53accc4b6ab493b86f5e561d')
	.expectStatus(200)
	.expectHeaderContains('Content-Type', 'json')
	.expectJSON({
		message: 'Project Deleted!'
    })
    .toss();
*/
