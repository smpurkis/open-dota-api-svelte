import { writable } from "svelte/store";

// Set store varables to default values
export const heroView = writable(null);
export const heroSearchBarFilter = writable("");
export const heroSearchBarFilterCategories = writable({});