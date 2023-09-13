import { db } from './app';
import { collection, doc, setDoc } from "firebase/firestore";
const axios = require('axios').default;

function getRiddle() {
    let riddle
    let answer
    let retry = true
    while (retry)
        axios.get('https://riddles-api.vercel.app/random')
            .then(function (res) {
                console.log(res)

                if ((res.data.answer.match(/ /g) || []).length <= 1) {
                    retry = false
                }
            }
            )
}

function getPoints() {
}
function setPoints() { }

function getTodayWinners() { }

function getWeekWinners() { }



