import extend from '../utilz/singleUser.js'
import models from '../models/Index.js'
import docModifier from '../utilz/doc-modifier.js'

import {
    noteError,
    noteLoading,
    noteSuccess
} from './notifications.js'


export default {
    get: {
        //GET ALL TREKS! 
        dashboard(context) {

            models.Ideas.getAll()
                .then((res) => {
                    let ideas = res.docs.map(docModifier);
                    context.ideas = ideas

                    extend(context).then(function () {
                        this.partial('../templates/cause/dashboard.hbs')
                    })
                })
                .catch((err) => console.error(err))
        },
        //CREATE FORM FOR NEW CAUSE!
        create(context) {
            extend(context).then(function () {
                this.partial('../templates/cause/create.hbs')
            })
        },
        //GET A SINGLE CAUSE VIEW!
        details(context) {
            let {
                id
            } = context.params

            models.Ideas.getSingle(id)
                .then((res) => {
                    let currentIdea = docModifier(res)
                    context.idea = currentIdea
                    console.log(context.idea)
                    //Check for author of cause! 
                    if (currentIdea.uid !== localStorage.getItem('userId')) {
                        context.isAuthor = false;
                    } else {
                        context.isAuthor = true;
                    }

                    extend(context).then(function () {
                        this.partial('../templates/cause/details.hbs')
                    })
                })
                .catch((err) => console.error(err))
        },
        //LOAD EDIT FORM 
        edit(context) {

            let {
                id
            } = context.params
            context.id = id

            extend(context).then(function () {
                this.partial('../templates/cause/edit.hbs')
                //LOADING DATE FOR EDITED TREK! 
                models.Ideas.getSingle(id)
                    .then((res) => {

                        let trek = docModifier(res)
                        let $location = document.querySelector("#main > form > div:nth-child(1) > input")
                        $location.value = trek.location
                        let $dateTime = document.querySelector("#main > form > div:nth-child(2) > input");
                        $dateTime.value = trek.dateTime
                        let $description = document.querySelector("#main > form > div:nth-child(3) > textarea");
                        $description.value = trek.description
                        let $imageURL = document.querySelector("#main > form > div:nth-child(4) > input");
                        $imageURL.value = trek.imageURL
                    })
            })
        },
    },
    post: {
        //CREATE NEW TREK!
        create(context) {

            let data = {
                ...context.params,
                uid: localStorage.getItem('userId'),
                likes: 0,
                author: localStorage.getItem('userEmail'),
                comments: []

            }

            if (data.title.length < 6) {
                noteError('The title should be at least 6 characters long!');
                context.redirect('#/ideas/create')
            } else if (data.description.length < 10) {
                noteError('The description should be at least 10 characters long!');
                context.redirect('#/ideas/create')

            } else if (!data.imageURL.startsWith('http://"') || !data.imageURL.startsWith('https://" ')) {
                noteError('The image should be started with http://" or https://"')
                context.redirect('#/ideas/create')

            } else {
                noteLoading('block')
                models.Ideas.create(data)
                    .then(() => {
                        noteLoading('none')
                        context.redirect('#/ideas/dashboard')
                        noteSuccess('Idea created successfully.')
                    })
                    .catch((err) => console.error(err))
            }
        }
    },
    // DELETE CAUSE
    del: {
        close(context) {
            let {
                id
            } = context.params
            noteLoading('block')
            models.Ideas.close(id)
                .then((res) => {
                    noteLoading('none')
                    context.redirect('#/ideas/dashboard')
                    noteSuccess('Idea deleted successfully.')
                })
                .catch((err) => console.error(err))
        }
    },
    //UPDATE CAUSE! 
    put: {
        edit(context) {
            let {
                id,
                newComment
            } = context.params

            models.Ideas.getSingle(id)
                .then((res) => {
                    noteLoading('block')
                    let idea = docModifier(res)
                    console.log(idea)
                    let currentUser = localStorage.getItem('userEmail')
                    idea.comments.push(`${currentUser}: ${newComment}`)

                    // if (!cause.donors.includes(localStorage.getItem('userEmail'))) {
                    //     cause.donors.push(localStorage.getItem('userEmail'))
                    // }

                    return models.Ideas.edit(id, idea)
                })
                .then((res) => {
                    noteLoading('none')
                    context.redirect('#/ideas/dashboard')
                    noteSuccess('You have commented successfully.')
                })
                .catch((err) => console.error(err))
        },
        like(context) {
            let {
                id
            } = context.params

            noteLoading('block')
            models.Ideas.getSingle(id)
                .then((res) => {
                    let idea = docModifier(res)
                    idea.likes += 1;

                    // if (!cause.donors.includes(localStorage.getItem('userEmail'))) {
                    //     cause.donors.push(localStorage.getItem('userEmail'))
                    // }
                    return models.Ideas.edit(id, idea)
                })
                .then((res) => {

                    noteLoading('none')
                    context.redirect('#/ideas/dashboard')
                    noteSuccess('You liked the idea successfully.')
                })
                .catch((err) => console.error(err))

        }
    }
}