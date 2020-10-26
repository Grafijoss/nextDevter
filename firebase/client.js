import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyBcO8blmPjPcTJxXLPXoZEwMY0pJoEbfT4',
  authDomain: 'devter-c8137.firebaseapp.com',
  databaseURL: 'https://devter-c8137.firebaseio.com',
  projectId: 'devter-c8137',
  storageBucket: 'devter-c8137.appspot.com',
  messagingSenderId: '178554169643',
  appId: '1:178554169643:web:4704320b993003d6f57d6e',
  measurementId: 'G-K2S49ZQTGV',
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

// data base service
const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user
  console.log(user)
  return {
    avatar: photoURL,
    userName: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizerdUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizerdUser)
  })
}

export const loginWithGitHub = () => {
  const gitHubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(gitHubProvider)
  // .then(mapUserFromFirebaseAuthToUser) // this line is going to execute automatically once signInWithPopup finishes
}

export const addDevit = ({ avatar, content, userId, userName }) => {
  // we  will pass the document that we have to add
  return db.collection('devis').add({
    avatar,
    content,
    userId,
    userName,
    createAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevit = () => {
  return (
    db
      .collection('devis')
      .orderBy('createAt', 'desc') // we can order items by a parameter desc asc
      .get()
      // snapshot.docs
      .then(({ docs }) => {
        return docs.map((doc) => {
          // we must convert the data into an object
          const data = doc.data()
          // we must return the unique id of document
          const id = doc.id
          const { createAt } = data
          /* native way to formate the date
          const date = new Date(createAt.seconds * 1000) // we always have to pass the time in milliseconds
          const normalizedCreatedAt = new Intl.DateTimeFormat('es-CO').format(
            date
		  )
		  */

          return {
            ...data, // todos los elementos que estan en el doc de firebase
            id,
            createAt: +createAt.toDate(),
          }
        })
      })
  )
}

export const uploadImage = (file) => {
  // the first thing is to make a reference to the storage method
  const ref = firebase.storage().ref(`images/${file.name}`)
  // I want what I give you put it in this reference like an upload
  // task: we can hear events like what is it state, progress, completed
  const task = ref.put(file)
  return task
}
