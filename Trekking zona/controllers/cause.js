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

            models.Treks.getAll()
                .then((res) => {
                    let treks = res.docs.map(docModifier);
                    context.treks = treks

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

            models.Treks.getSingle(id)
                .then((res) => {
                    let currentTrek = docModifier(res)
                    context.trek = currentTrek

                    //Check for author of cause! 
                    if (currentTrek.uid !== localStorage.getItem('userId')) {
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
                models.Treks.getSingle(id)
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
                author: localStorage.getItem('userEmail')
            }

            noteLoading()
            if (data.location.length < 6) {
                noteError('The location should be at least 6 characters long!');
                context.redirect('#/treks/create')
            } else if (data.description.length < 10) {
                noteError('The description should be at least 10 characters long!');
                context.redirect('#/treks/create')
            } else {
                noteLoading('block')
                models.Treks.create(data)
                    .then(() => {
                        noteLoading('none')
                        context.redirect('#/treks/dashboard')
                        noteSuccess('Trek created successfully.')
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
            models.Treks.close(id)
                .then((res) => {
                    noteLoading('none')
                    context.redirect('#/treks/dashboard')
                    noteSuccess('You closed the trek successfully.')
                })
                .catch((err) => console.error(err))
        }
    },
    //UPDATE CAUSE! 
    put: {
        edit(context) {
            let {
                id,
                location,
                dateTime,
                description,
                imageURL
            } = context.params

            console.log(id, location, dateTime, description, imageURL)
            models.Treks.getSingle(id)
                .then((res) => {
                    noteLoading('block')
                    let trek = docModifier(res)
                    trek.dateTime = dateTime;
                    trek.location = location;
                    trek.description = description;
                    trek.imageURL = imageURL;

                    // if (!cause.donors.includes(localStorage.getItem('userEmail'))) {
                    //     cause.donors.push(localStorage.getItem('userEmail'))
                    // }
                    return models.Treks.edit(id, trek)
                })
                .then((res) => {
                    noteLoading('none')
                    context.redirect('#/treks/dashboard')
                    noteSuccess('Trek edited successfully.')
                })
                .catch((err) => console.error(err))
        },
        like(context) {
            let {
                id
            } = context.params

            noteLoading('block')
            models.Treks.getSingle(id)
                .then((res) => {
                    let trek = docModifier(res)
                    trek.likes += 1;

                    // if (!cause.donors.includes(localStorage.getItem('userEmail'))) {
                    //     cause.donors.push(localStorage.getItem('userEmail'))
                    // }
                    return models.Treks.edit(id, trek)
                })
                .then((res) => {

                    noteLoading('none')
                    context.redirect('#/treks/dashboard')
                    noteSuccess('You liked the trek successfully.')
                })
                .catch((err) => console.error(err))

        }
    }
}