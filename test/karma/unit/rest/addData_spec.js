
var frisby = require('frisby');

for(var count = 0; count < 1000; count++) {
    frisby.create('New Asset POST')
    .post('http://localhost:3000/apps/53c9542826d6fc0000774b7f/assets', 
    {
            name: 'testAsset-' + count,
            status: 'Not Translated',
            app_id: '53b06ea66d79fb15f51f2b8c',
            tags: ['dummy', 'test'],
            created_by: 'BradWare',
            last_modified_by: 'BWare',
            description: 'this is for testing purposes'
    })
    .toss();
}
