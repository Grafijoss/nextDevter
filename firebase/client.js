import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBcO8blmPjPcTJxXLPXoZEwMY0pJoEbfT4",
  authDomain: "devter-c8137.firebaseapp.com",
  databaseURL: "https://devter-c8137.firebaseio.com",
  projectId: "devter-c8137",
  storageBucket: "devter-c8137.appspot.com",
  messagingSenderId: "178554169643",
  appId: "1:178554169643:web:4704320b993003d6f57d6e",
  measurementId: "G-K2S49ZQTGV",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user;
  console.log(user);
  return {
    avatar: photoURL,
    username: displayName,
    email,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizerdUser = mapUserFromFirebaseAuthToUser(user);
    onChange(normalizerdUser);
  });
};

export const loginWithGitHub = () => {
  const gitHubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(gitHubProvider);
  // .then(mapUserFromFirebaseAuthToUser) // this line is going to execute automatically once signInWithPopup finishes
};
