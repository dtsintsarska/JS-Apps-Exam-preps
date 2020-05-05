class Article {

    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this._comments = [];
        this._likes = [];
        this._id = 1;
    }

    get likes() {
        if (this._likes.length === 0) {
            return `${this.title} has 0 likes`
        }

        if (this._likes.length == 1) {
            return `${this._likes[0]} likes this article!`
        }

        return `${this._likes[0]} and ${this._likes.length - 1} others like this article!`
    }

    like(username) {

        if (this._likes.includes(username)) {
            throw new Error(`You can't like the same article twice!`)
        }

        if (this.creator === username) {
            throw new Error(`You can't like your own articles!`)
        }

        this._likes.push(username)
        return `${username} liked ${this.title}!`
    }

    dislike(username) {

        if (!this._likes.includes(username)) {
            throw new Error(`You can't dislike this article!`)
        }

        this._likes = this._likes.filter((x) => x !== username)
        return `${username} disliked ${this.title}`
    }

    comment(username, content, id) {

        let match = this._comments.find((x) => x.id === id)

        if (id == undefined || (match == undefined)) {

            let commentInfo = {
                'id': this._id,
                username,
                content,
                replies: []
            }

            this._comments.push(commentInfo)
            this._id++
            return `${username} commented on ${this.title}`

        }

        if (match) {

            let replyId = `${match.id}.${match.replies.length + 1}`
            let reply = {
                'id': replyId,
                username,
                content
            }
            match.replies.push(reply)
            return `You replied successfully`
        }
    }

    toString(sortingType) {

        let result = ''

        result += `Title: ${this.title}\nCreator: ${this.creator}\nLikes: ${this._likes.length}\nComments:\n`

        if (sortingType === 'asc') {

            this._comments = this._comments.sort((a, b) => a.id - b.id)

            this._comments.forEach((x) => {
                result += `-- ${x.id}. ${x.username}: ${x.content}\n`
                if (x.replies.length > 0) {
                    x.replies = x.replies.sort((c, d) => c.id - d.id)
                    x.replies.forEach((r) => {
                        result += `--- ${r.id}. ${r.username}: ${r.content}\n`
                    })
                }
            })


        } else if (sortingType === 'desc') {

            this._comments = this._comments.sort((a, b) => b.id - a.id)

            this._comments.forEach((x) => {
                result += `-- ${x.id}. ${x.username}: ${x.content}\n`
                if (x.replies.length > 0) {
                    x.replies = x.replies.sort((c, d) => d.id - c.id)
                    x.replies.forEach((r) => {
                        result += `--- ${r.id}. ${r.username}: ${r.content}\n`
                    })
                }
            })

        } else if (sortingType === 'username') {

            this._comments = this._comments.sort((a, b) => a.username.localeCompare(b.username))

            this._comments.forEach((x) => {
                result += `-- ${x.id}. ${x.username}: ${x.content}\n`
                if (x.replies.length > 0) {
                    x.replies = x.replies.sort((c, d) => c.username.localeCompare(d.username))
                    x.replies.forEach((r) => {
                        result += `--- ${r.id}. ${r.username}: ${r.content}\n`
                    })
                }
            })
        }

        return result.trim()
    }
}

let art = new Article("My Article", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("John");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
console.log(art.comment("SAmmy", "Reply@", 1));
console.log()
console.log(art.toString('username'));
console.log()
art.like("Zane");
console.log(art.toString('desc'));