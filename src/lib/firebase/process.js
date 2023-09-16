import { firestore } from './app';
import { collection, doc, setDoc, getDoc, arrayUnion } from "firebase/firestore";
import axios from 'axios';

var WeekObject = {
    Daily: [],
    users: {},
    weekly: []
}

/**
 * @param {string | number} id
 */
export async function getPointsOnWinAndSave(id) {
    let weekId = getWeekId()
    const docRef = doc(firestore, 'Score', weekId);
    const docSnap = await getDoc(docRef);
    let points

    if (docSnap.exists() && docSnap.get('daily') != undefined) {
        let winnersToday = docSnap.get('daily')
        console.log(winnersToday)
        points = 5 - winnersToday.length
        if (points < 0) points = 0
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        console.log("Creating document");
        points = 5
    }
    // shouldn't be a problem since normally this is only called once a day per user
    //else might have to restructure how this is saved in firestore
    await setDoc(docRef, { daily: arrayUnion({ [id]: points }) }, { merge: true, })
    return points
}
// /**
//  * @param {string} id
//  */
// export async function getPoints(id) {
//     let weekId = getWeekId()
//     const docRef = doc(firestore, 'Score', weekId);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data().users[id]);
//     } else {
//         // docSnap.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }
// /**
//  * @param {string} id
//  * @param {number} points
//  */
// export async function setPoints(id, points) {
//     let weekId = getWeekId()
//     const docRef = doc(firestore, 'Score', weekId);
//     await setDoc(docRef, { 'users': { [id]: points } }, { merge: true });
// }

export async function getTodayWinners() {
    let weekId = getWeekId()
    const docRef = doc(firestore, 'Score', weekId,);
    const docSnap = await getDoc(docRef);
    let winnersToday = {}
    if (docSnap.exists()) {
        let daily = docSnap.get('Daily')
        if (daily != undefined) {
            winnersToday = daily[new Date().getDay()]
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
    const docRef = doc(firestore, 'Score', weekId,);
    let winnersWeek = []
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let weekly = docSnap.get('weekly')
        if (weekly != undefined) {
            winnersWeek = weekly
        }
        console.log("Document data:", winnersWeek);
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
    return winnersWeek
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

export default { getWinPoints: getPointsOnWinAndSave };