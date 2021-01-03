# MariaDB/MySql数据库操作

## 注意

需要在配置文件mm.json中配置

```json
{
	"db":  "mysql://mmstudio:Mmstudio123@127.0.0.1:3306/mmstudio?connectionLimit=5"
}
```

或

```json
{
	"db":  [
		"mysql://mmstudio:Mmstudio123@master.mydb.com:3306/mmstudio?connectionLimit=5",
		"mysql://mmstudio:Mmstudio123@slave1.mydb.com:3306/mmstudio?connectionLimit=5",
		"mysql://mmstudio:Mmstudio123@slave2.mydb.com:3306/mmstudio?connectionLimit=5",
		"mysql://mmstudio:Mmstudio123@slave3.mydb.com:3306/mmstudio?connectionLimit=5",
		"mysql://mmstudio:Mmstudio123@slave4.mydb.com:3306/mmstudio?connectionLimit=5",
		"mysql://mmstudio:Mmstudio123@slave5.mydb.com:3306/mmstudio?connectionLimit=5"
	]
}
```
