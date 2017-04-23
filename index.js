var pg = require('../pg')

var getConString = constr => `postgres://${constr.user}:${constr.pw}@${constr.host}:${constr.port}/${constr.dbname}`

exports.get_rows = (constr, sql, callback) => {
	pg.connect(getConString(constr), (err, client, done) => {
		if (err) {
			console.log(`${new Date().toDateString()} — Can not connect Code: ${err.code}, Message: ${err.message}`)
			callback(0)
			return errLog(err, sql, "get_rows")
		}
        client.query(sql, (err, result) => {
            done()
            if (err) {
				console.log(`${new Date().toDateString()} — Can not query Code: ${err.code}, Message: ${err.message}`)
				callback([])
				return errLog(err, sql, "get_rows2")
            }
            else {
                callback(result.rows)
                return
            }
        })
	})
}

exports.excute = (constr, sql, callback) => {
	pgExcute(constr, sql, res => {
		if (res == 'ok') {
            callback('oK')
            return
        } else {
            console.log(`${new Date().toDateString()} — Excute: ${sql} ${res}`)
            callback(0)
            return
        }
	})
}

var pgExcute = (constr, sql, callback) => {
	pg.connect(getConString(constr), (err, client, done) => {
		if (err) {
			console.log(`${new Date().toDateString()} — Can not connect Code: ${err.code}, Message: ${err.message}`)
			callback('error')
			return errLog(err, sql, "excute")
		}
		client.query(sql, (err, result) => {
			done()
			if (err) {
				console.log(`${new Date().toDateString()} — Can not query Code: ${err.code}, Message: ${err.message}`)
				callback(err.code)
				return errLog(err, sql, "excute2")
			} else {
				callback("ok")
				return
			}
		})
	})
}

var errLog = (err, sql, method) => console.error(`${new Date().toDateString()} — Error ${method} running query, ${err}\r\n${sql}`)