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
      .get()
      // snapshot.docs
      .then(({ docs }) => {
        return docs.map((doc) => {
          // we must convert the data into an object
          const data = doc.data()
          // we must return the unique id of document
          const id = doc.id
          const { createAt } = data
          //   const intl = new Intl.DateTimeFormat('de-ES')
          //   const normalizedCreatedAt = firebase.firestore.Timestamp.toDate(
          //     new Date(createAt.seconds)
          //   )
          //   const normalizedCreatedAt = intl.format(new Date(createAt.seconds))
          return {
            ...data,
            id,
            createAt: createAt.seconds,
          }
        })
      })
  )
}
