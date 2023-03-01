const path = require('path');

const BUILD_FOLDER_PATH = path.resolve(__dirname, 'build');
const ROOT_PACKAGE_JSON_PATH = path.resolve(BUILD_FOLDER_PATH, 'package.json');

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
	ROOT_PACKAGE_JSON_PATH,
	EXCLUDED_EXTENSIONS,
	EXCLUDED_FILES,
};
