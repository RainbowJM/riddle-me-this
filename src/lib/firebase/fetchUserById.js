import { db } from './app';
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

/**
 * @param {string} uid
 */
export default async function (uid) {
    let user = {
        name: "",
        photo: "",
        email: "",
    }
    const docRef = doc(db, 'Users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        user.name = docSnap.data().DisplayName
        user.email = docSnap.data().Email
        user.photo = docSnap.data().Photo

        console.log("Document data:", user);
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
    return user
}
