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
            noteLoading('block')
            models.User.logout()
                .then(() => {
                    noteLoading('none')
                    context.redirect('#/home')
                    noteSuccess('Logout successful.')
                    localStorage.clear()
                })
                .catch((err) => console.error(err))
        },
        //GET PROFILE OF USER!!!
        profile(context) {

            //CHECK FOR WISHED TREKS
            models.Treks.getAll()
                .then((res) => {
                    let treks = res.docs.map(docModifier);
                    context.treks = treks

                    context.wishes = []
                    for (let i = 0; i < treks.length; i++) {

                        let authorTrek = treks[i].author;
                        let username = localStorage.getItem('userEmail')
                        if (authorTrek === username) {
                            context.wishes.push(treks[i].location)
                        }
                    }
                    context.count = context.wishes.length

                    if (context.count == 0) {
                        context.hasNoWishes = true;
                    } else {
                        context.hasNoWishes = false;
                    }
                })
                .then(() => {
                    extend(context).then(function () {
                        // console.log(context)
                        this.partial('../templates/user/profilUser.hbs')
                    })
                })
        }
    },
    post: {
        login(context) {
            let {
                username,
                password
            } = context.params
            noteLoading('block')
            models.User.login(username, password)
                .then((res) => {
                    context.user = res;
                    context.username = res.email
                    context.isLoggedIn = true;

                    noteLoading('none')
                    context.redirect('#/treks/dashboard')
                    noteSuccess('Successfully logged user.')

                })
                .catch((err) => {
                    noteError('The password or username you have entered is invalid. Please try again.')
                    context.redirect('#/user/login')
                    console.error(err)
                })
        },
        register(context) {

            let {
                username,
                password,
                rePassword
            } = context.params

            if (username.length < 3) {
                noteError('The username should be at least 3 characters long!');
                context.redirect('#/user/register')
            } else if (password.length < 3) {
                noteError('The password should be at least 3 characters long!');
                context.redirect('#/user/register')
            } else if (password !== rePassword) {
                noteError('The repeat password should be equal to the password!');
                context.redirect('#/user/register')
            } else {
                noteLoading('block')
                models.User.register(username, password)
                    .then((res) => {
                        noteLoading('none')

                        context.redirect('#/treks/dashboard')
                        noteSuccess('Successfully registered user.')
                    })
                    .catch((err) => console.error(err))

            }

        }
    }
}