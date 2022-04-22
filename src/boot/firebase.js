// import { firestorePlugin } from 'vuefire'
import { firebase } from '@firebase/app'
import "firebase/database";
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC4adrtqKS-sDbP42zq3CzbNFznTHjMBdc",
    authDomain: "devhao-3c397.firebaseapp.com",
    databaseURL: "https://devhao-3c397-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "devhao-3c397",
    storageBucket: "devhao-3c397.appspot.com",
    messagingSenderId: "956891084392",
    appId: "1:956891084392:web:044271c391bc5a45a3eddd"
};

let firebaseApp = firebase.initializeApp(firebaseConfig)
const fireAuth = firebaseApp.auth()
const firedb = firebaseApp.database()
const fireStorage = firebaseApp.storage()
const fireStore = firebaseApp.firestore()


export default async ({ app, router, Vue, store }) => {

    Vue.prototype.$firedb = firedb
    Vue.prototype.$fireAuth = fireAuth
    Vue.prototype.$fireStorage = fireStorage
    Vue.prototype.$fireStore = fireStore



    store.firedb = firedb
    store.fireAuth = fireAuth
    store.fireStorage = fireStorage
    store.fireStore = fireStore
}




window.firedb = firedb
window.fireAuth = fireAuth
window.fireStorage = fireStorage
window.fireStore = fireStore

export { fireAuth, firedb, fireStorage, fireStore }