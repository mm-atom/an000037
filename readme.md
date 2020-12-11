# MariaDB/MySql数据库操作

## 注意

需要在配置文件mm.json中配置

```json
{
	"db": {
		"type": "mariadb",
		"source": "mysql://mmstudio:Mmstudio123@127.0.0.1:3306/mmstudio?connectionLimit=5"
	}
}
```

或

```json
{
	"db": {
		"type": "mysql",
		"source": "mysql://mmstudio:Mmstudio123@127.0.0.1:3306/mmstudio?connectionLimit=5"
	}
}
```
