import extend from '../utilz/singleUser.js'
import models from '../models/Index.js'
import docModifier from '../utilz/doc-modifier.js'

// import {
//     noteError,
//     noteLoading,
//     noteSuccess
// } from './notifications.js'


export default {
    get: {
        //GET ALL ITEMS! 
        dashboard(context) {

            models.Item.getAll()
                .then((res) => {
                    let articles = res.docs.map(docModifier);

                    let JavaScriptArticles = [];
                    let CSharpArticles = [];
                    let JavaArticles = [];
                    let PytonArticles = [];

                    for (let i = 0; i < articles.length; i++) {
                        let categoryArticle = articles[i].category;

                        if (categoryArticle === 'JavaScript') {
                            JavaScriptArticles.push(articles[i])
                            JavaScriptArticles = JavaScriptArticles.sort((a, b) => a.title.localeCompare(b.title))
                        } else if (categoryArticle === 'C#') {
                            CSharpArticles.push(articles[i])
                            CSharpArticles = CSharpArticles.sort((a, b) => a.title.localeCompare(b.title))
                        } else if (categoryArticle === 'Java') {
                            JavaArticles.push(articles[i])
                            JavaArticles = JavaArticles.sort((a, b) => a.title.localeCompare(b.title))
                        } else if (categoryArticle === 'Pyton') {
                            PytonArticles.push(articles[i])
                            PytonArticles = PytonArticles.sort((a, b) => a.title.localeCompare(b.title))
                        }
                    }

                    context.JavaScriptArticles = JavaScriptArticles;
                    context.JavaArticles = JavaArticles
                    context.CSharpArticles = CSharpArticles
                    context.PytonArticles = PytonArticles

                    extend(context).then(function () {
                        this.partial('../templates/item/dashboard.hbs')
                    })
                })
                .catch((err) => console.error(err))
        },
        //CREATE FORM FOR NEW ITEM!
        create(context) {
            extend(context).then(function () {
                this.partial('../templates/item/create.hbs')
            })
        },
        //GET A SINGLE ITEM VIEW!
        details(context) {
            let {
                id
            } = context.params

            models.Item.getSingle(id)
                .then((res) => {
                    let currentArticle = docModifier(res)
                    context.currentArticle = currentArticle

                    //Check for author of item! 
                    if (currentArticle.uid !== localStorage.getItem('userId')) {
                        context.isAuthor = false;
                    } else {
                        context.isAuthor = true;
                    }

                    extend(context).then(function () {
                        this.partial('../templates/item/details.hbs')
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
                this.partial('../templates/item/edit.hbs')

                //LOADING DATE FOR EDITED ITEM! 
                models.Item.getSingle(id)
                    .then((res) => {

                        let article = docModifier(res)
                        let $title = document.querySelector("#title")
                        $title.value = article.title
                        let $category = document.querySelector("#category")
                        $category.value = article.category
                        let $content = document.querySelector("#content")
                        $content.value = article.content
                    })
            })
        },
    },
    post: {
        //CREATE NEW ITEM!
        create(context) {

            let possibleCategories = ['JavaScript', 'C#', 'Java', 'Pyton']
            let data = {
                ...context.params,
                uid: localStorage.getItem('userId'),
                creator: localStorage.getItem('userEmail')
            }

            if (possibleCategories.includes(data.category)) {
                models.Item.create(data)
                    .then(() => {
                        context.redirect('#/article/dashboard')
                    })
                    .catch((err) => console.error(err))
            } else {
                alert('Please choose valid category!')
                context.redirect('#/article/create')
            }
        }

    },
    // DELETE ITEM
    del: {
        close(context) {
            let {
                id
            } = context.params
            if (confirm('Do you want to delete this article?')) {
                models.Item.close(id)
                    .then((res) => {

                        context.redirect('#/article/dashboard')
                        //noteSuccess('You closed the article successfully.')
                    })
                    .catch((err) => console.error(err))
            }
        }

    },
    //UPDATE ITEM! 
    put: {
        edit(context) {
            let {
                id,
                title,
                category,
                content
            } = context.params

            models.Item.getSingle(id)
                .then((res) => {

                    let article = docModifier(res)
                    article.title = title;
                    article.category = category;
                    article.content = content

                    return models.Item.edit(id, article)
                })
                .then((res) => {

                    context.redirect('#/article/dashboard')
                    //noteSuccess('Trek edited successfully.')
                })
                .catch((err) => console.error(err))
        },
        // like(context) {
        //     let {
        //         id
        //     } = context.params

        //     noteLoading('block')
        //     models.Item.getSingle(id)
        //         .then((res) => {
        //             let trek = docModifier(res)
        //             trek.likes += 1;

        //             // if (!cause.donors.includes(localStorage.getItem('userEmail'))) {
        //             //     cause.donors.push(localStorage.getItem('userEmail'))
        //             // }
        //             return models.Item.edit(id, trek)
        //         })
        //         .then((res) => {

        //             noteLoading('none')
        //             context.redirect('#/treks/dashboard')
        //             noteSuccess('You liked the trek successfully.')
        //         })
        //         .catch((err) => console.error(err))

        // }
    }
}