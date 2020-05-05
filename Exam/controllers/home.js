import extend from '../utilz/singleUser.js'
export default {
    get: {
        home(context) {
            extend(context).then(function () {
                this.partial('../templates/home/homePage.hbs')
                context.redirect('#/user/login')
            });
        }
    }
}