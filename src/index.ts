import { parse } from 'url';
import config from '@mmstudio/config';
import global from '@mmstudio/global';
import anylogger from 'anylogger';
import { createPool, createPoolCluster, Pool as MPool } from 'mariadb';

const logger = anylogger('@mmstudio/an000037');

type Table = Record<string, string | number | boolean>;

const db = config.db as string;

/**
 * sql语句查询
 */
export default function sql_query<T1 = Table, T2 = Table, T3 = Table, T4 = Table, T5 = Table, T6 = Table, T7 = Table, T8 = Table, T9 = Table, T10 = Table, T11 = Table, T12 = Table, T13 = Table, T14 = Table, T15 = Table, T16 = Table, T17 = Table, T18 = Table, T19 = Table, T20 = Table>(...sqls: [string, unknown[]][]) {
	return mariadb_sql(sqls, db) as Promise<[T1[], T2[], T3[], T4[], T5[], T6[], T7[], T8[], T9[], T10[], T11[], T12[], T13[], T14[], T15[], T16[], T17[], T18[], T19[], T20[]]>;
}

async function mariadb_sql(sqls: [string, unknown[]][], source: string | string[]) {
	logger.debug('postgres sql:', sqls);
	const pool = mariadb_get_pool(source);
	const client = await pool.getConnection();
	try {
		const ret = await Promise.all(sqls.map(([sql, values]) => {
			return client.query(sql, values);
		}));
		logger.debug('postgres sqlquery result:', ret);
		return ret as unknown[];
	} finally {
		client.release();
	}
}

const key = 'dbmariadb';

function mariadb_get_pool(source: string | string[]) {
	let db = global(key, null as unknown as MPool);
	if (!db) {
		if (Array.isArray(source)) {
			const cluster = createPoolCluster();
			source.forEach((s, i) => {
				if (i === 0) {
					cluster.add('master', parse_url(s));
				} else {
					cluster.add(`slave${i}`, parse_url(s));
				}
			});
			return cluster;
		}
		db = createPool(parse_url(source));
	}
	return global(key, db);
}

function parse_url(url: string) {
	const params = parse(url, true);
	const auth = params.auth!.split(':');
	return {
		debug: config.debug,
		user: auth[0],
		password: auth[1],
		host: params.hostname!,
		port: parseInt(params.port!, 10),
		database: params.pathname!.split('/')[1],
		...params.query
	};
}
