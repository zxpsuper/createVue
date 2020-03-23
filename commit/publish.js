var ghpages = require('gh-pages')
ghpages.publish(
    './dist',
    {
        branch: 'gh-pages',
    },
    function(err) {
        console.log(err)
        console.log('docs同步完成!')
    }
)
