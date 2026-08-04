import type QueryResult from './types/QueryResult';

/** This is the base plugin class and has no search items/actions of its own.
 *  All search items/actions should be added by the plugin developer in a subclass.
 */
export default class Plugin {
    private readonly pluginName: string;
    private readonly pluginVersion: string;
    private readonly pluginDeveloper: string;
    private readonly pluginDescription: string;
    private readonly queryResults: QueryResult[] = [];

    public constructor(pluginInfo: { name: string, version: string, developer: string, description: string }, queries: QueryResult[]) {
        this.pluginDescription = pluginInfo.description;
        this.pluginDeveloper = pluginInfo.developer;
        this.pluginVersion = pluginInfo.version;
        this.pluginName = pluginInfo.name;
        this.queryResults = queries;
    }

    public getPluginInfo() {
        return {
            name: this.pluginName,
            version: this.pluginVersion,
            developer: this.pluginDeveloper,
            description: this.pluginDescription,
        }
    }

    public searchFor(query: string) {
        return this.queryResults.filter(item => item.title.includes(query) || item.description.startsWith(query));
    }
};