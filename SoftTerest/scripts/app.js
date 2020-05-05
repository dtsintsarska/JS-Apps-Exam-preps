import controllers from '../controllers/index.js'


const app = Sammy('#main', function () {

    this.use('Handlebars', 'hbs')

    //Home
    this.get('#/home', controllers.home.get.home)

    //User

    this.get('#/user/login', controllers.user.get.login)
    this.get('#/user/register', controllers.user.get.register)

    this.post('#/user/login', controllers.user.post.login)
    this.post('#/user/register', controllers.user.post.register)
    this.get('#/user/logout', controllers.user.get.logout)

    //Ideas

    this.get('#/ideas/dashboard', controllers.cause.get.dashboard)
    this.get('#/ideas/create', controllers.cause.get.create)

    this.post('#/ideas/create', controllers.cause.post.create)

    this.get('#/ideas/details/:id', controllers.cause.get.details)
    //PUT/UPDATE
    // this.get('#/treks/edit/:id', controllers.cause.get.edit)
    this.post('#/ideas/edit/:id', controllers.cause.put.edit)

    // LIKES 
    this.get('#/ideas/like/:id', controllers.cause.put.like)
    //DELETE
    this.get('#/ideas/close/:id', controllers.cause.del.close)

    //PROFILE USER

    this.get('#/user/profile/:id', controllers.user.get.profile)
});


(() => {
    app.run('#/home');
})();