import moment from 'moment';
import { firestore } from '$lib/firebase/app';
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { writable, type Writable } from 'svelte/store';
import { fetchUserByUid } from './users';
import { getAuthUserInfo } from '$lib/firebase/auth';

const initialStandingListState: StandingFormat[] = [];
const initialTodayWinnerListState: DayWinnerFormat[] = [];

export const standingListState: Writable<StandingFormat[]> = writable(initialStandingListState);
export const todayWinnerListState: Writable<DayWinnerFormat[]> = writable(
	initialTodayWinnerListState
);

/**
 * Subscribes to Firestore changes for the list of standings and sets the `standingListState` accordingly.
 *
 * **Caution**! Remember to unsubscribe from the return property of this method to prevent memory leaks
 */
export const watchFirestoreStandings = () =>
	onSnapshot(collection(firestore, 'Standings'), (snapShot) => {
		const userArray: StandingFormat[] = [];
		snapShot.forEach((doc) => userArray.push(doc.data() as StandingFormat));
		standingListState.set(userArray);
	});

/**
 * Subscribes to Firestore changes for the list of standings and sets the `standingListState` accordingly.
 *
 * **Caution**! Remember to unsubscribe from the return property of this method to prevent memory leaks
 */
export const watchTodayStandings = () =>
	onSnapshot(doc(firestore, 'Standings', moment().format('YYYY-MM-DD')), (doc) => {
		const standings = doc.data() as StandingFormat;
		buildWinnersList(standings).then((winners) => todayWinnerListState.set(winners));
	});

/**
 * Checks whether there is room on today's standings for the current winner
 *
 * @param uid the id of the winning user
 */
export const setTodayStandings = (uid: string) =>
	getDoc(doc(firestore, 'Standings', moment().format('YYYY-MM-DD'))).then((snapshot) => {
		const standings = snapshot.data() as StandingFormat;
		addStandingIfAble(uid, standings);
	});

/**
 * Private Helper Function to build the list of winners from the `StandingFormat`
 */
const buildWinnersList = async (standings: StandingFormat) => {
	const winnersList: DayWinnerFormat[] = [];

	if (standings.first) {
		const firstUser = await fetchUserByUid(standings.first);
		winnersList.push({ ...firstUser, ...dayScoreBreakdown.first });
	}
	if (standings.second) {
		const secondUser = await fetchUserByUid(standings.second);
		winnersList.push({ ...secondUser, ...dayScoreBreakdown.second });
	}
	if (standings.third) {
		const thirdUser = await fetchUserByUid(standings.third);
		winnersList.push({ ...thirdUser, ...dayScoreBreakdown.third });
	}
	if (standings.fourth) {
		const fourthUser = await fetchUserByUid(standings.fourth);
		winnersList.push({ ...fourthUser, ...dayScoreBreakdown.fourth });
	}
	if (standings.fifth) {
		const fifthUser = await fetchUserByUid(standings.fifth);
		winnersList.push({ ...fifthUser, ...dayScoreBreakdown.fifth });
	}

	return winnersList;
};

/**
 * Private Helper Function to add a new winner to the list if podium spots are available
 */
const addStandingIfAble = async (uid: string, standings: StandingFormat) => {
	const todayStandingsRef = doc(firestore, 'Standings', moment().format('YYYY-MM-DD'));

	if (!standings) return setDoc(todayStandingsRef, { first: uid });
	if (isUidAlreadyInStandings(uid, standings)) return;

	if (!standings.first) return setDoc(todayStandingsRef, { first: uid });
	if (!standings.second) return updateDoc(todayStandingsRef, { second: uid });
	if (!standings.third) return updateDoc(todayStandingsRef, { third: uid });
	if (!standings.fourth) return updateDoc(todayStandingsRef, { fourth: uid });
	if (!standings.fifth) return updateDoc(todayStandingsRef, { fifth: uid });
};

/**
 * Private Helper Function to check if uid is already present on podium
 */
const isUidAlreadyInStandings = (uid: string, standings: StandingFormat) => {
	if (standings?.first === uid) return true;
	if (standings?.second === uid) return true;
	if (standings?.third === uid) return true;
	if (standings?.fourth === uid) return true;
	if (standings?.fifth === uid) return true;

	return false;
};

/**
 * Score Breakdown Object
 */
export const dayScoreBreakdown = {
	first: { place: 'first', score: 25 },
	second: { place: 'second', score: 18 },
	third: { place: 'third', score: 15 },
	fourth: { place: 'fourth', score: 12 },
	fifth: { place: 'fifth', score: 10 }
};

/**
 * Firestore format for the Standing Document Fields
 */
export type StandingFormat = {
	first: string;
	second: string;
	third: string;
	fourth: string;
	fifth: string;
};

/**
 * Firestore format for the User Document Fields
 */
export type DayWinnerFormat = {
	uid: string;
	displayName: string;
	email: string;
	photoURL: string;
	place: string;
	score: number;
};
