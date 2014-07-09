var frisby = require('frisby');


frisby.create('Get all Locales')
    .get('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/locales')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
	.expectBodyContains('en_US')
	.expectBodyContains('es_ES')
	.expectBodyContains('eu_IT')
    .toss();


frisby.create('POST a new Locale')
    .post('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/locales', {
    	locale_codes: ['es_ES', 'en_US', 'Japanese', 'Chinese']
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
	.expectBodyContains('en_US')
	.expectBodyContains('es_ES')
    .expectBodyContains('eu_IT')
	.expectBodyContains('Japanese')
	.expectBodyContains('Chinese')
    .toss();


frisby.create('PUT and replace the locales with a new group')
    .put('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/locales', {
    	locale_codes: ['es_ES', 'en_US', 'eu_IT']
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
	.expectBodyContains('en_US')
	.expectBodyContains('es_ES')
	.expectBodyContains('eu_IT')
    .toss();


