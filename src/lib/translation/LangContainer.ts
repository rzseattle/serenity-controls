class LangContainer {

    constructor() {
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
let x = null;
//console.log(langContainer, "lang container");
if(typeof window !== "undefined") {
// @ts-ignore
    if (window.langContainer === undefined) {
        // @ts-ignore
        window.langContainer = new LangContainer();
    }
// @ts-ignore
    x = window.langContainer;
}else{
    x = new LangContainer();
}
export default x;
