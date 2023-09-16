import { writable, type Writable } from 'svelte/store';

export const alertTextState: Writable<string> = writable('');
export const alertTypeState: Writable<AlertType> = writable('');
export const isLoadingState: Writable<boolean> = writable(false);

export type AlertType = '' | 'info' | 'success' | 'warning' | 'error';
