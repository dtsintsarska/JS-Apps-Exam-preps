export default {
    create(data) {
        return firebase.firestore().collection('treks').add(data)
    },
    getAll() {
        return firebase.firestore().collection('treks').get()
    },

    getSingle(id) {
        return firebase.firestore().collection('treks').doc(id).get()
    },
    edit(id, data) {
        return firebase.firestore().collection('treks').doc(id).update(data)
    },
    close(id) {
        return firebase.firestore().collection('treks').doc(id).delete()
    }
}