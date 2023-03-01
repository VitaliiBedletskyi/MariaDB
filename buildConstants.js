const path = require('path');

const BUILD_FOLDER_PATH = path.resolve(__dirname, 'build');
const RELEASE_FOLDER_PATH = path.resolve(__dirname, 'release');

const EXCLUDED_EXTENSIONS = ['.js', '.g4', '.interp', '.tokens'];
const EXCLUDED_FILES = [
	'.github',
	'.DS_Store',
	'.editorconfig',
	'.eslintignore',
	'.eslintrc',
	'.git',
	'.gitignore',
	'.vscode',
	'.idea',
	'.prettierignore',
	'.prettierrc',
	'build',
	'node_modules',
	'package-lock.json',
];

module.exports = {
	BUILD_FOLDER_PATH,
	RELEASE_FOLDER_PATH,
	EXCLUDED_EXTENSIONS,
	EXCLUDED_FILES,
};
