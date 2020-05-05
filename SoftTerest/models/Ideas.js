export default {
    create(data) {
        return firebase.firestore().collection('ideas').add(data)
    },
    getAll() {
        return firebase.firestore().collection('ideas').get()
    },

    getSingle(id) {
        return firebase.firestore().collection('ideas').doc(id).get()
    },
    edit(id, data) {
        return firebase.firestore().collection('ideas').doc(id).update(data)
    },
    close(id) {
        return firebase.firestore().collection('ideas').doc(id).delete()
    }
}