class LangContainer {

    constructor() {
        console.trace("Inicjuje -------");
    }

    private langs: { [index: string]: () => Promise<any> } = {};

    public add = (lang: string, getter: () => Promise<any>) => {
        console.log("dodaje ", lang);
        this.langs[lang] = getter;
    };

    public get = (lang: string, callback: (result: any) => any) => {
        if (this.langs[lang] !== undefined) {
            this.langs[lang]().then((result) => {
                callback(result);
            });
        } else {
            console.log(`Lang ${lang} is not defined`, this.langs);
        }
    };
}

//console.log(langContainer, "lang container");
// @ts-ignore
if (window.langContainer === undefined) {
    console.error("nowa instancja");
    // @ts-ignore
    window.langContainer = new LangContainer();
}
// @ts-ignore
const x = window.langContainer;
export default x;
