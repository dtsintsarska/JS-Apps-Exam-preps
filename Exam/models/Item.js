export default {
    create(data) {
        return firebase.firestore().collection('articles').add(data)
    },
    getAll() {
        return firebase.firestore().collection('articles').get()
    },

    getSingle(id) {
        return firebase.firestore().collection('articles').doc(id).get()
    },
    edit(id, data) {
        return firebase.firestore().collection('articles').doc(id).update(data)
    },
    close(id) {
        return firebase.firestore().collection('articles').doc(id).delete()
    }
}