import Plugin from './plugin';

// EVERYTHING SEARCH by Crooms Bell Schedule
export default class EverythingSearch {
    private useSearchSuggestions = false;
    private query = '';

    public constructor(useSearchSuggestions: boolean) {
        this.useSearchSuggestions = useSearchSuggestions;
    }

    public getQuery = () => this.query;

    public setQuery(query: string) {
        if (!query) return;
        this.query = query;
    }
};

// Plugin imports