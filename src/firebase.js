//firebase configuration file:
import firebase from 'firebase'

//config object:
let config ={
 apiKey: "AIzaSyDTg94JGEQKCJURJd84PiAoT6XvElXS5LI",
 authDomain: "hobbyexploratorphotos.firebaseapp.com",
 databaseURL: "https://hobbyexploratorphotos.firebaseio.com",
 projectId: "hobbyexploratorphotos",
 storageBucket: "hobbyexploratorphotos.appspot.com",
 messagingSenderId: "1069276141665",
 appId: "1:1069276141665:web:249a2ec9b4bea1ea2a3220",
 measurementId: "G-WMXZ8FQN1J"

}

//initialize firebase app:
firebase.initializeApp(config);

export default firebase;