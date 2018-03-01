global.config = {
    project: {
        name: 'MTB World',
        title: 'In Mountain Bike We Trust',
        description: 'A boilerplate for a simple web application with a Node.JS and Express backend, with an EJS template with using Twitter Bootstrap.',
        version: '1.0'
    },
    author: {
        name: 'André Rosa',
        contact: 'development.pit@gmail.com'
    },
    social: {
        twitter: '//twitter.com/candrelsrosa',
        facebook: '//facebook.com/candrelsrosa',
        googlePlus: '//plus.google.com/+candrelsrosa/'
    },
    database: {
        host: 'localhost',
        port: '27017',
        catalog: 'MTBWorld',
        getConnectionString: function() {
            return this.host + ':' + this.port + '/' + this.catalog;
        }
    },
    email: {
        user: 'development.pit@gmail.com',
        pass: 'devpit2015'
    }
};