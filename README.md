# aobpg
Easy and simple postgresql connecter and helper

# Installation
```
npm install --save aobpg
```

# Usage
Config
```
const db = require('aobpg')
const config_db = {
	host:   'database.server.com',
	user:   'dbuser',
	pw:     'password',
	dbname: 'mydb',
	port:   5432
}
```

Get rows
```
let query = `SELECT * FROM dbname`
db.get_rows(config_db, query, res => {
  if (res.length) {
    console.log(res)
  }
})
```

Excute
```
let query = `INSERT INTO dbname (foo, bar) VALUES ('foo', 'bar')`
db.excute(config_db, query, res => {
  if (res === 'oK') {
    console.log('Insert successfully')
  }
})
```
