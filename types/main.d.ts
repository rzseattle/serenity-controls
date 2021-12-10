declare module '*.sass' {
    const content: { readonly [className: string]: string };
    export default content;
}
