import { firestore } from '$lib/firebase/app';
import { collection, onSnapshot } from 'firebase/firestore';
import { writable, type Writable } from 'svelte/store';

const initialUserListState: UserFormat[] = [];
const initialSelectedUserState: UserFormat = {} as UserFormat;

export const userListState: Writable<UserFormat[]> = writable(initialUserListState);
export const selectedUserState: Writable<UserFormat> = writable(initialSelectedUserState);

/**
 * Subscribes to Firestore changes for the list of users and sets the `userListState` accordingly.
 *
 * **Caution**! Remember to unsubscribe from the return property of this method to prevent memory leaks
 */
export const watchFirestoreUsers = () =>
	onSnapshot(collection(firestore, 'Users'), (snapShot) => {
		const userArray: UserFormat[] = [];
		snapShot.forEach((doc) => userArray.push(doc.data() as UserFormat));
		userListState.set(userArray);
	});

/**
 * Firestore format for the User Document Fields
 */
export type UserFormat = {
	uid: string;
	displayName: string;
	email: string;
	photo: string;
};
