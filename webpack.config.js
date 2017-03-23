module.exports = {
	//describe the entry point or start of this react application
	entry: "./app/app.js",
	//the plain compiled JavaScript will be output into this file
	output: {
		filename: "public/bundle.js"
	},
	//describe the transformations to perform
	module: {
		loaders: [
			{
				//only work with files that end with a .js or .jsx extension
				test: /\.jsx?$/,
				// webpack will only process files in the app folder. This avoids processing
				// node modules and server files unnecessarily
				include: /app/,
				loader: "babel",
				query: {
					// these are the specific transformations you will use:
					presets: ["react", "es2015"]
				}
			},
			{
				//this lets you use css files!
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				//to use various image files:
				//test: /\.(jpe?g|JPG|png|gif|svg)$/i,
				test: /\.(jpe?g|png|gif|svg)$/i,
				//loader: "file-loader?name=../app/assets/images/[name].[ext]"
				loader: "file-loader?name=[name].[ext]&publicPath=../app/assets/images/"
				//loader: "file-loader"
				//http://stackoverflow.com/questions/37671342/how-to-load-image-files-with-webpack-file-loader
			}
		]
	},
	//this will let you debug the react code in chrome dev tools. Errors will
	//have lines and file names. Without this, the console will say all errors
	//are coming from bundle.js
	devtool: "eval-source-map"
};