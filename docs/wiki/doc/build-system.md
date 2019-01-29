# Build system  

### Config
Settings for config builder
```json
const config = {  
    PRODUCTION: false, // it is / it is not  production build
	BASE_PATH: resolve(__dirname, "./../../"),  // base path of project
	HTTPS: true,  // is https enabled
	ENTRY_POINTS: {admin: BASE_PATH + "/build/js/app.tsx"},  // webpack entry points
	ANALYZE: false,  // output of chunks sizes at end of build 
	PUBLIC_PATH: "/assets/dist/",  // public path location
	PATH: resolve(BASE_PATH, "./public/assets/dist/"),  // path to put compiled sources
	BROWSERS: ["last 1 Chrome versions", "last 1 Firefox versions", "last 1 Edge versions"], // @babel/preset-env settings for browsers
	NODE_CACHE_DIR: resolve(BASE_PATH, "./node_modules/.cache"), // node cache dir 
};
```
### Package Commands  
  
`storybook` - runs storybook in dev mode, option to develop with hot reloading   
  
`server` - starting test server as  backend integration for controls ( eg. form editing , table sorting ... )

`build` - building lib from sources
command option | value
-------|-----
env.CACHE_DIR | Cache dir for build


`babel-watch` - run babel typescript -> js compiler in watch mode  
  
`rebuild` - rebuild whole js and sass sources to lib dir  

`build-storybook`   - build static version of storybook