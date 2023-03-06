const path = require('path');
const fsExtra = require('fs-extra');
const fs = require('fs/promises');

const copyPluginFiles = (filePaths, { targetFolderPath, excludedExtensions = [], excludedFiles = [] }) => {
	return filePaths.reduce(async (nextFile, file) => {
		await nextFile;

		const ignoredFile = excludedExtensions.some(ext => file.endsWith(ext)) || excludedFiles.includes(file);
		if (ignoredFile) {
			return Promise.resolve();
		}

		const fileStats = await fs.lstat(file);
		if (fileStats.isDirectory()) {
			const nestedFiles = await fs.readdir(file);
			return copyPluginFiles(
				nestedFiles.map(nestedFile => path.join(file, nestedFile)),
				{
					targetFolderPath,
					excludedExtensions,
					excludedFiles,
				},
			);
		}

		return fsExtra.copy(file, path.resolve(targetFolderPath, file));
	}, Promise.resolve());
};

const copyFiles = options => ({
	name: 'copyFiles',
	setup(build) {
		build.onEnd(async () => {
			const files = await fs.readdir(__dirname);
			await copyPluginFiles(files, options);
		});
	},
});

const cleanPackageJson = packageJsonPath => ({
	name: 'cleanPackageJson',
	setup(build) {
		build.onEnd(async () => {
			const fileContent = await fs.readFile(packageJsonPath);
			const data = JSON.parse(fileContent.toString());

			data.release = true;
			delete data.scripts;
			delete data.devDependencies;
			delete data.dependencies;
			delete data['lint-staged'];
			delete data['simple-git-hooks'];

			await fs.writeFile(packageJsonPath, JSON.stringify(data, null, 4));
		});
	},
});

module.exports = {
	copyFiles,
	cleanPackageJson,
};
