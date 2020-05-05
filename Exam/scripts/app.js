import controllers from '../controllers/index.js'


const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs')

    //Home
    this.get('#/home', controllers.home.get.home)

    //User

    this.get('#/user/login', controllers.user.get.login)
    this.get('#/user/register', controllers.user.get.register)

    this.post('#/user/login', controllers.user.post.login)
    this.post('#/user/register', controllers.user.post.register)
    this.get('#/user/logout', controllers.user.get.logout)

    //Articles

    this.get('#/article/dashboard', controllers.item.get.dashboard)
    this.get('#/article/create', controllers.item.get.create)

    this.post('#/article/create', controllers.item.post.create)
    this.get('#/article/details/:id', controllers.item.get.details)

    //PUT/UPDATE
    this.get('#/article/edit/:id', controllers.item.get.edit)
    this.post('#/article/edit/:id', controllers.item.put.edit)

    //DELETE
    this.get('#/article/delete/:id', controllers.item.del.close)

    //PROFILE USER
    //this.get('#/user/profile/:id', controllers.user.get.profile)
});


(() => {
    app.run('#/home');
})();