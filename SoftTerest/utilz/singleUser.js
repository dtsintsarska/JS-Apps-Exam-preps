import models from '../models/Index.js'
import docModifier from './doc-modifier.js'

export default function (context) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            context.isLoggedIn = true;
            context.username = user.email;
            context.userId = user.uid;
            localStorage.setItem('userId', user.uid)
            localStorage.setItem('userEmail', user.email)


        } else {
            context.isLoggedIn = false;
            context.username = null;
            context.userId = null;

            context.wishes = null;
            context.treks = null;
            context.count = null;
            context.hasNoWishes = null;

            localStorage.removeItem('userId')
            localStorage.removeItem('userEmail')
        }
    });

    return context.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
    })
}