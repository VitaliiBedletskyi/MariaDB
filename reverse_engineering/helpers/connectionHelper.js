const mariadb = require('mariadb');

let connection;

const connect = async (connectionInfo) => {
	if (connection) {
		return connection;
	}

	connection = await mariadb.createConnection({ 
		user: connectionInfo.userName, 
		password: connectionInfo.userPassword, 
		port: connectionInfo.port,
		metaAsArray: false,
		ssl: false,
		dateStrings: true ,
		supportBigInt: true,
	  });

	  return connection;
};

const getDatabases = async (connection, systemDatabases) => {
	const databases = await connection.query('show databases;');

	return databases.map(item => item.Database).filter(dbName => !systemDatabases.includes(dbName));
};

const getTables = async (connection, dbName) => {
	const tables = await connection.query(`show full tables from \`${dbName}\`;`);

	return tables;
};

const createInstance = (connection) => {
	const getCount = async (dbName, tableName) => {
		const count = await connection.query(`SELECT COUNT(*) as count FROM \`${dbName}\`.\`${tableName}\`;`);

		return count[0]?.count || 0;
	};
	
	const getRecords = async (dbName, tableName, limit) => {
		const result = await connection.query(`SELECT * FROM \`${dbName}\`.\`${tableName}\` LIMIT ${limit};`);

		return result;
	};

	const getVersion = async () => {
		const version = await connection.query('select version() as version;');

		return version[0].version;
	};

	const describeDatabase = async (dbName) => {
		const data = await connection.query(`show create database \`${dbName}\`;`);

		return data[0]['Create Database'];
	}; 

	const getFunctions = async (dbName) => {
		const functions = await connection.query(`show function status WHERE Db = '${dbName}'`);

		return Promise.all(
			functions.map(
				f => connection.query(`show create function \`${dbName}\`.\`${f.Name}\`;`).then(functionCode => ({
					meta: f,
					data: functionCode,
				}))
			)
		);
	};

	return {
		getCount,
		getRecords,
		getVersion,
		describeDatabase,
		getFunctions,
	};
};

module.exports = {
	connect,
	getDatabases,
	getTables,
	createInstance,
};
