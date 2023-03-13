const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');
const { nativeNodeModulesPlugin } = require('esbuild-native-node-modules-plugin');
const { copyFiles, cleanPackageJson, cleanPackageFolder } = require('./esbuildPlugins');
const { EXCLUDED_EXTENSIONS, EXCLUDED_FILES, DEFAULT_RELEASE_FOLDER_PATH } = require('./buildConstants');

const packageData = JSON.parse(fs.readFileSync('./package.json').toString());
const RELEASE_FOLDER_PATH = path.join(DEFAULT_RELEASE_FOLDER_PATH, `${packageData.name}-${packageData.version}`);

esbuild
	.build({
		entryPoints: [
			path.resolve(__dirname, 'forward_engineering', 'api.js'),
			path.resolve(__dirname, 'forward_engineering', 'ddlProvider.js'),
			path.resolve(__dirname, 'reverse_engineering', 'api.js'),
		],
		bundle: true,
		keepNames: true,
		platform: 'node',
		target: 'node16',
		outdir: RELEASE_FOLDER_PATH,
		minify: true,
		logLevel: 'info',
		plugins: [
			cleanPackageFolder(RELEASE_FOLDER_PATH),
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
