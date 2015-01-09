var frisby = require('frisby');


frisby.create('Get all Tags for an App')
    .get('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/tags')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
	.expectBodyContains('tag1')
	.expectBodyContains('tagCity')
	.expectBodyContains('tag3')
	.expectBodyContains('MangeshTag')
    .expectBodyContains('Cali')
    .expectBodyContains('iCar')
	.toss();




frisby.create('Get all Tags for an Asset')
    .get('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/53b08fcfcc5faf00007d6356/tags')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
	.expectBodyContains('tag1')
	.expectBodyContains('tagCity')
	.expectBodyContains('test')
	.expectBodyContains('Mangesh')
	.toss();



frisby.create('POST new tags to an Asset')
    .post('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/53b08fc2cc5faf00007d6354/tags', {
    	tags: ['WorldCupTag', 'AnotherTag', 'tag1']
    	
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectBodyContains('tag1')
    .expectBodyContains('tagCity')
    .expectBodyContains('Cali')
    .expectBodyContains('iCar')
    .expectBodyContains('MangeshTag')
    .expectBodyContains('WorldCupTag')
    .expectBodyContains('AnotherTag')
    .toss();


frisby.create('GET new tags to an Asset')  
    .get('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/53b08fc2cc5faf00007d6354/tags')
	 .expectBodyContains('tag1')
    .expectBodyContains('tagCity')
    .expectBodyContains('Cali')
    .expectBodyContains('iCar')
    .expectBodyContains('MangeshTag')
    .expectBodyContains('WorldCupTag')
    .expectBodyContains('AnotherTag')
	.toss();



frisby.create('PUT new tags to an Asset')
    .put('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/53b08fc2cc5faf00007d6354/tags', {
    	tags: ['tag1', 'tag3', 'tagCity', 'helloWorld', 'MangeshTag', 'Cali', 'iCar']
    	
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectBodyContains('tag1')
	.expectBodyContains('tagCity')
	.expectBodyContains('tag3')
	.expectBodyContains('helloWorld')
	.expectBodyContains('MangeshTag')
    .toss();


frisby.create('DELETE new tags to an Asset')
    .delete('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets/53b08fc2cc5faf00007d6354/tags', {
    	tags: ['helloWorld']
    	
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectBodyContains('tag1')
	.expectBodyContains('tagCity')
	.expectBodyContains('tag3')
	.expectBodyContains('MangeshTag')
    .toss();

