# Embeding

### Embeding as yarn workspace
Add Git submodule
```
[submodule "node_modules_shared/frontend"]  
   path = node_modules_shared/frontend  
   url = git@bitbucket.org:3codeGIT/frontend.git
   ```
Add to package.json 
```json
{
	"private": true,  
	"workspaces": [  
	    "node_modules_shared/*"  
	], 
}
```
Workspace embedded example of command run
`yarn workspaces frontend run build --env.CACHE_DIR=~/node_cache`

### Project integration
#### Base webpack conf file
```js
const configBuilder = require("frontend/builder/webpack/ConfigBuilder.js");  
  
module.exports = function(env = {}) {  
	const production = typeof env.production != "undefined" ? true : false;
    const config = {...}
	return configBuilder(config);   
};
```
#### Sample project commands
```json
{
	...
	"scripts": {
		...
		"dev": "webpack-dev-server --config path/to/config/webpack.config.js",  
		"build": "rimraf public/assets/dist/** && webpack --env.production --config path/to/config/webpack.config.js",
		...
	}
	...
}
```