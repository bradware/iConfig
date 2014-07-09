var frisby = require('frisby');

//Based off of key1.iLog
frisby.create('Get all Values with an AssetID')
    .get('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/53b08fc2cc5faf00007d6354/values')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
	.expectBodyContains('BradWare')
	.expectBodyContains('Value1Test')
    .expectBodyContains('Not Translated')
	.toss();


//Creates this value into key2.iLog or the one with MangeshTag
frisby.create('POST a Value with an AssetID')
    .post('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/53b08fc2cc5faf00007d6354/values', {
    	string: 'TestingDummyVal',
        status: 'Translated',
        locale_code: 'es_ES',
        created_by: 'testBrad'
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes([ {
    		string: String,
    		locale_code: String,
    		created_by: String,
    		created_date: String,
    		status: String,
            _id: String
    } ])
    .expectBodyContains('testBrad')
    .expectBodyContains('es_ES')
    .expectBodyContains('TestingDummyVal')
	.toss();

frisby.create('Get all Values with an AssetID that are current')
    .get('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/53b08fc2cc5faf00007d6354/values/current')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes([ {
            string: String,
            locale_code: String,
            created_by: String,
            created_date: String,
            status: String,
            _id: String
    } ])
    .expectBodyContains('testBrad')
    .expectBodyContains('es_ES')
    .expectBodyContains('TestingDummyVal')
    .toss();

frisby.create('Get Value with the AssetID and that is current')
    .get('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/53b08fc2cc5faf00007d6354/values/current/?locale=es')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
     .expectJSONTypes([ {
    		string: String,
    		locale_code: String,
    		created_by: String,
    		created_date: String,
    		status: String,
            _id: String
    } ])
    .expectBodyContains('testBrad')
    .expectBodyContains('es_ES')
    .expectBodyContains('TestingDummyVal')
	.toss();

frisby.create('Get Value with the AssetID and that is current')
    .get('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/53b08fc2cc5faf00007d6354/values/?locale=en')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
     .expectJSONTypes([ {
            string: String,
            locale_code: String,
            created_by: String,
            created_date: String,
            status: String,
            _id: String
    } ])
    .expectBodyContains('en_US')
    .expectBodyContains('BWare')
    .expectBodyContains('Not Translated')
    .toss();

/*
    Helper for cleaning up testing

*/
frisby.create('DELETE a value with RegEx by String')
	.delete('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/53b08fc2cc5faf00007d6354/values/?string=TestingDummyVal')
	.expectStatus(200)
	.expectHeaderContains('Content-Type', 'json')
    .toss();


