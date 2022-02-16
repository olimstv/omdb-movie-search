export const CURRENT_YEAR = new Date().getFullYear();
export const MIN_YEAR = 1892;
export const MAX_YEAR = CURRENT_YEAR;
export const MIN_SEARCH_TERM_LENGTH = 3;
export const LOCAL_STORAGE_KEY = 'homeState';
export const MOVIE_TYPE_TO_FILTER_VALUE = [
    { title: 'Any', filter: '' },
    { title: 'Movies', filter: 'movie' },
    { title: 'Series', filter: 'series' },
    { title: 'Episodes', filter: 'episode' }
];