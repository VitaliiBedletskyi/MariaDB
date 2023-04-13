const esbuild = require('esbuild');
const path = require('path');
const { nativeNodeModulesPlugin } = require('esbuild-native-node-modules-plugin');
const { BUILD_FOLDER_PATH } = require('./buildConstants');

esbuild
	.build({
		entryPoints: [
			path.resolve(__dirname, 'forward_engineering', 'api.js'),
			path.resolve(__dirname, 'forward_engineering', 'ddlProvider.js'),
			path.resolve(__dirname, 'reverse_engineering', 'api.js'),
		],
		bundle: true,
		platform: 'node',
		outdir: BUILD_FOLDER_PATH,
		minify: true,
		logLevel: 'info',
		plugins: [nativeNodeModulesPlugin],
	})
	.catch(() => process.exit(1));
