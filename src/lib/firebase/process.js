import { db } from './app';
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
const axios = require('axios').default;

function getRiddle() {
    let riddle
    let retry = true
    while (retry) {

        axios.get('https://riddles-api.vercel.app/random')
            .then(function (res) {
                console.log(res)

                if ((res.data.answer.match(/ /g) || []).length <= 1) {
                    riddle = res.data
                    retry = false
                }
            }
            )
    }
    return riddle
}

/**
 * @param {string} id
 */
async function getPoints(id) {
    let weekId = getWeekid()
    const docRef = doc(db, 'Scores', weekId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().users[id]);
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }

}
/**
 * @param {string} id
 * @param {number} points
 */
async function setPoints(id, points) {
    let weekId = getWeekid()
    const docRef = doc(db, 'Scores', weekId);
    await setDoc(docRef, { 'users': { id: points } }, { merge: true });
}

async function getTodayWinners() {
    let weekId = getWeekid()
    const docRef = doc(db, 'Scores', weekId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().Daily);
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }

}

async function getWeekWinners() {
    let weekId = getWeekid()
    const docRef = doc(db, 'Scores', weekId,);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().Weekly);
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}


function getWeekid() {
    let date = new Date()
    let year = date.getFullYear()
    // Copy the date so we don't modify the original
    date = new Date(date);

    let startDate = new Date(date.getFullYear(), 0, 1);
    var days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));

    var weekNumber = Math.ceil(days / 7);

    // Display the calculated result      
    console.log("Week number of " + date +
        " is :   " + weekNumber);
    let weekId = year.toString() + weekNumber.toString()
    return weekId;
}
