import models from '../models/Index.js'
import extend from '../utilz/singleUser.js'
import docModifier from '../utilz/doc-modifier.js'
import {
    noteError,
    noteLoading,
    noteSuccess
} from './notifications.js'

export default {
    get: {
        login(context) {
            extend(context).then(function () {
                this.partial('../templates/user/loginPage.hbs')
            });

        },
        register(context) {
            extend(context).then(function () {
                this.partial('../templates/user/registerPage.hbs')
            });
        },
        logout(context) {

            models.User.logout()
                .then(() => {

                    context.redirect('#/user/login')
                    localStorage.clear()
                })
                .catch((err) => console.error(err))
        },
        // //GET PROFILE OF USER!!!
        // profile(context) {

        //     //CHECK FOR WISHED ITEMS
        //     models.Item.getAll()
        //         .then((res) => {
        //             let treks = res.docs.map(docModifier);
        //             context.treks = treks

        //             context.wishes = []
        //             for (let i = 0; i < treks.length; i++) {

        //                 let authorTrek = treks[i].author;
        //                 let username = localStorage.getItem('userEmail')
        //                 if (authorTrek === username) {
        //                     context.wishes.push(treks[i].location)
        //                 }
        //             }
        //             context.count = context.wishes.length

        //             if (context.count == 0) {
        //                 context.hasNoWishes = true;
        //             } else {
        //                 context.hasNoWishes = false;
        //             }
        //         })
        //         .then(() => {
        //             extend(context).then(function () {
        //                 // console.log(context)
        //                 this.partial('../templates/user/profilUser.hbs')
        //             })
        //         })
        // }
    },
    post: {
        login(context) {
            let {
                email,
                password
            } = context.params

            models.User.login(email, password)
                .then((res) => {
                    context.user = res;
                    context.username = res.email
                    context.isLoggedIn = true;

                    context.redirect('#/article/dashboard')
                })
                .catch((err) => {
                    alert('The password or username you have entered is invalid. Please try again.')
                    context.redirect('#/user/login')
                    console.error(err)
                })
        },
        register(context) {

            let {
                email,
                password
            } = context.params
            let rePassword = context.params['rep-pass']

            if (password !== rePassword) {
                alert('The repeat password should be equal to the password!')
                context.redirect('#/user/register');
            } else {
                models.User.register(email, password)
                    .then((res) => {
                        context.redirect('#/article/dashboard')
                    })
                    .catch((err) => console.error(err))
            }
        }
    }
}