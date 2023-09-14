import { db } from './app';
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import axios from 'axios';

var WeekObject = {
    Daily: [],
    users: {},
    weekly: []
}

export async function getRiddleObject() {
    let riddleObject = {
        question: "",
        answer: "",
    };

    let retry = true
    while (retry) {

        await axios.get('https://riddles-api.vercel.app/random')
            .then(function (res) {

                if ((res.data.answer.match(/ /g) || []).length <= 1) {
                    riddleObject.question = res.data?.riddle;
                    riddleObject.answer = res.data?.answer;

                    retry = false
                }
            }
            )
    }

    return riddleObject;
}

/**
 * @param {string | number} id
 */
export async function getWinPoints(id) {
    let weekId = getWeekId()
    const docRef = doc(db, 'Score', weekId);
    const docSnap = await getDoc(docRef);
    let points
    let winnersToday
    if (docSnap.exists()) {
        winnersToday = docSnap.data().Daily
        points = 5 - winnersToday.length()
        points = (points < 0) ? 0 : points


    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        console.log("Creating document");
        let obj = new Map()
        obj.set(id, 5)
        winnersToday = obj
        await setDoc(docRef, { 'users': { id } }, { merge: true })
    }
    await setDoc(docRef, { 'daily': winnersToday }, { merge: true })
    console.log("Document data:", winnersToday);


}
/**
 * @param {string} id
 */
export async function getPoints(id) {
    let weekId = getWeekId()
    const docRef = doc(db, 'Score', weekId);
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
export async function setPoints(id, points) {
    let weekId = getWeekId()
    const docRef = doc(db, 'Score', weekId);
    await setDoc(docRef, { 'users': { id: points } }, { merge: true });
}

export async function getTodayWinners() {
    let weekId = getWeekId()
    const docRef = doc(db, 'Score', weekId,);
    const docSnap = await getDoc(docRef);
    let winnersToday = {}
    if (docSnap.exists()) {
        let daily = docSnap.get('Daily')
        if (daily != undefined) {
            winnersToday = docSnap.data().Daily[new Date().getDay()]
        }
        else winnersToday = {}
        console.log("Document data:", winnersToday);
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
    return winnersToday
}

async function getWeekWinners() {
    let weekId = getWeekId()
    const docRef = doc(db, 'Score', weekId,);
    let winnersWeek = null
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        winnersWeek = docSnap.data().weekly
        console.log("Document data:", winnersWeek);
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

function getWeekId() {
    let date = new Date()
    let year = date.getFullYear()
    // Copy the date so we don't modify the original
    date = new Date(date);

    let startDate = new Date(date.getFullYear(), 0, 1);
    var days = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));

    var weekNumber = Math.ceil(days / 7);

    // Display the calculated result      
    let weekId = year.toString() + weekNumber.toString().padStart(2, '0')
    console.log("WeekId is " + weekId);
    return weekId;
}

export default { getPoints };