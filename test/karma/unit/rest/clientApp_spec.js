var frisby = require('frisby');

/*
	GET method testing for ClientApp Route
*/

frisby.create('Get all ClientApplications')
    .get('http://localhost:3000/apps')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
	.expectBodyContains('iLog')
	.expectBodyContains('iCar')
	.expectBodyContains('en_US')
	.expectBodyContains('es_ES')
	.expectBodyContains('admin')
	.expectBodyContains('users')
	.expectBodyContains('drivers')
    .toss();


frisby.create('New ClientApplication POST')
    .put('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c', {
        locale_codes: ['es_ES', 'Italian'],
        created_by: 'newBrad',              //Should not change
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes({
            _id: String,
            created_by: String,
            primary_locale_code: String,
            name: String,
            __v: Number,
            created_date: String,
            locale_codes: Array,
            access_groups: Array,
            last_modified_by: String,
            last_modified_date: String
    })
    .expectJSON({
        created_by: 'BradWare',
        primary_locale_code: 'es_ES',
        name: 'iCar',
        locale_codes: ['es_ES', 'Italian'],
        access_groups: ['drivers'],
        created_date: '2014-06-29T19:53:10.113Z'
    })
    .toss();


frisby.create('Get iCar ClientApplication  ID:/53b06ea66d79fb15f51f2b8c')
    .get('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes({
    		_id: String,
    		created_by: String,
    		primary_locale_code: String,
    		name: String,
    		__v: Number,
    		created_date: String,
    		locale_codes: Array,
    		access_groups: Array,
            last_modified_by: String,
            last_modified_date: String
    })
    .expectJSON({
    	_id: '53b06ea66d79fb15f51f2b8c',
		created_by: 'BradWare',
		primary_locale_code: 'es_ES',
		name: 'iCar',
		created_date: '2014-06-29T19:53:10.113Z',
		locale_codes: ['es_ES', 'Italian'],
		access_groups: ['drivers']
    })
    .toss();


frisby.create('Get iLog ClientApplication  ID:/53b06dbc90329bfef335f476')
    .get('http://localhost:3000/apps/53b06dbc90329bfef335f476')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes({
    		_id: String,
    		created_by: String,
    		primary_locale_code: String,
    		name: String,
    		__v: Number,
    		created_date: String,
    		locale_codes: Array,
    		access_groups: Array,
            last_modified_by: String,
            last_modified_date: String
    })
    .expectJSON({
    	_id: '53b06dbc90329bfef335f476',
		created_by: 'BradWare',
		primary_locale_code: 'en_US',
		name: 'iLog',
		created_date: '2014-06-29T19:49:16.798Z',
		locale_codes: ['en_US', 'es_ES'],
		access_groups: ['users', 'admins']
    })
    .toss();


/*
	PUT Test method on dummy application. Tested and works, change the locale_codes if you want to see it work
*/

frisby.create('New ClientApplication POST')
    .put('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c', {
    	locale_codes: ['es_ES', 'en_US', 'eu_IT'],
    	created_by: 'newBrad',				//Should not change
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes({
    		_id: String,
    		created_by: String,
    		primary_locale_code: String,
    		name: String,
    		__v: Number,
    		created_date: String,
    		locale_codes: Array,
    		access_groups: Array,
            last_modified_by: String,
            last_modified_date: String
    })
    .expectJSON({
		created_by: 'BradWare',
		primary_locale_code: 'es_ES',
		name: 'iCar',
		locale_codes: ['es_ES', 'en_US', 'eu_IT'],
		access_groups: ['drivers'],
		created_date: '2014-06-29T19:53:10.113Z'
    })
    .toss();

frisby.create('Get iCar ClientApplication  ID:/53b06ea66d79fb15f51f2b8c')
    .get('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes({
            _id: String,
            created_by: String,
            primary_locale_code: String,
            name: String,
            __v: Number,
            created_date: String,
            locale_codes: Array,
            access_groups: Array,
            last_modified_by: String,
            last_modified_date: String
    })
    .expectJSON({
        _id: '53b06ea66d79fb15f51f2b8c',
        created_by: 'BradWare',
        primary_locale_code: 'es_ES',
        name: 'iCar',
        created_date: '2014-06-29T19:53:10.113Z',
        locale_codes: ['es_ES', 'en_US', 'eu_IT'],
        access_groups: ['drivers']
    })
    .toss();

/*
	POST Test method on dummy application. Commented to not make a bunch of apps.
*/

frisby.create('New ClientApplication POST')
    .post('http://localhost:3000/apps/', {
    	name: 'DummyApp',
    	access_groups: ['testing'],
    	primary_locale_code: 'English',
    	locale_codes: ['English', 'Italian'],
    	created_by: 'testBrad',
    	created_date: '6/25/2014',  //should not do anything
        last_modified_by: 'bware'
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes({
    		_id: String,
    		created_by: String,
    		primary_locale_code: String,
    		name: String,
    		__v: Number,
    		created_date: String,
    		locale_codes: Array,
    		access_groups: Array,
            last_modified_by: String,
            last_modified_date: String
    })
    .expectJSON({
		created_by: 'testBrad',
		primary_locale_code: 'English',
		name: 'DummyApp',
		__v: 0,
		locale_codes: ['English', 'Italian'],
		access_groups: ['testing']
    })
    .toss();


/*
	DELETE. Going to make an App to delete and then delete it. Put the dummyApp 
	that is created here to delete as a new one will be generated


frisby.create('ClientApplication DELETE')
    .delete('http://localhost:3000/apps/:DUMMYAPPID' )
    .expectJSON({
		message: 'Application Deleted!'
    })
    .toss();


*/

