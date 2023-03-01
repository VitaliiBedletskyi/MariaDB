const esbuild = require('esbuild');
const path = require('path');
const { nativeNodeModulesPlugin } = require('esbuild-native-node-modules-plugin');
const { copyFiles, cleanPackageJson } = require('./esbuildPlugins');
const { EXCLUDED_EXTENSIONS, EXCLUDED_FILES, RELEASE_FOLDER_PATH } = require('./buildConstants');

esbuild
	.build({
		entryPoints: [
			path.resolve(__dirname, 'forward_engineering', 'api.js'),
			path.resolve(__dirname, 'forward_engineering', 'ddlProvider.js'),
			path.resolve(__dirname, 'reverse_engineering', 'api.js'),
		],
		bundle: true,
		platform: 'node',
		outdir: RELEASE_FOLDER_PATH,
		minify: true,
		logLevel: 'info',
		plugins: [
			nativeNodeModulesPlugin,
			copyFiles({
				targetFolderPath: RELEASE_FOLDER_PATH,
				excludedExtensions: EXCLUDED_EXTENSIONS,
				excludedFiles: EXCLUDED_FILES,
			}),
			cleanPackageJson(path.resolve(RELEASE_FOLDER_PATH, 'package.json')),
		],
	})
	.catch(() => process.exit(1));
