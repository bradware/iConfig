
var frisby = require('frisby');

for(var count = 0; count < 1000; count++) {
    frisby.create('New Asset POST')
    .post('http://localhost:3000/apps/53b06ea66d79fb15f51f2b8c/assets', 
    {
            name: 'testAsset-' + count,
            status: 'Not Translated',
            app_id: '53b06ea66d79fb15f51f2b8c',
            tags: ['dummy', 'test'],
            created_by: 'BradWare',
            last_modified_by: 'BWare',
    })
    .toss();
}
