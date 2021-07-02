import { writable } from "svelte/store";

export const heroView = writable(null);
export const heroSearchBarFilter = writable("");