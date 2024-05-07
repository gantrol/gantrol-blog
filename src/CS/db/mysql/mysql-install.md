# 在 Ubuntu 上安装 Mysql 8，并配置远程连接

> 尽量按生产环境标准操作，半角尖括号`<>`意味着是需要你改动的内容

## 准备

假设已有 Ubuntu 22.04 服务器，带有 UFW，另有一个非 root 带 sudo 的用户。前两者一般云服务商在界面安装好后就完成了。

### 非 root 带 sudo 的用户

```shell
sudo adduser <username>
```

需要使用密码，建议直接用密码生成器，比如：https://1password.com/password-generator/

[//]: # (TODO：自己写一个)

```shell
sudo adduser <username> sudo
```

```shell
su <username>
```

## 安装

```shell
sudo apt install mysql-server
```

完事后确认状态

```shell
sudo systemctl status mysql
```

检查版本：

```shell
mysql --version
```

## 初步配置

```shell
sudo mysql_secure_installation
```

密码等级，看需求填0、1、2

```text
There are three levels of password validation policy:

LOW    Length >= 8
MEDIUM Length >= 8, numeric, mixed case, and special characters
STRONG Length >= 8, numeric, mixed case, special characters and dictionary                  file

Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 0
```

root 用户密码跳过，安全起见，也不要用这个用户来登录 MySQL。

```text
Skipping password set for root as authentication with auth_socket is used by default.
If you would like to use password authentication instead, this can be done with the "ALTER_USER" command.
See https://dev.mysql.com/doc/refman/8.0/en/alter-user.html#alter-user-password-management for more information.
```

以下四项全选 y

```text
By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them. This is intended only for
testing, and to make the installation go a bit smoother.
You should remove them before moving into a production
environment.

Remove anonymous users? (Press y|Y for Yes, any other key for No) : y
Success.


Normally, root should only be allowed to connect from
'localhost'. This ensures that someone cannot guess at
the root password from the network.

Disallow root login remotely? (Press y|Y for Yes, any other key for No) : y
Success.

By default, MySQL comes with a database named 'test' that
anyone can access. This is also intended only for testing,
and should be removed before moving into a production
environment.


Remove test database and access to it? (Press y|Y for Yes, any other key for No) : y
 - Dropping test database...
Success.

 - Removing privileges on test database...
Success.

Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.

Reload privilege tables now? (Press y|Y for Yes, any other key for No) : y
Success.

All done!

```

## 本地登录 MySQL，新建远程登录用户

```shell
sudo mysql
```

创建用户：

```shell
CREATE USER '<username>'@'<ip_or_domain>' IDENTIFIED WITH caching_sha2_password BY '<password>';
```

> 全部 ip 用`@'%'`

赋予权限：

```shell
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD ON <db.table> TO '<username>'@'<ip_or_domain>' WITH GRANT OPTION;
```

检查创建结果：

```shell
SELECT user, host FROM mysql.user;
```

> 全部数据用` RELOAD ON *.*`

方便填写的空模版：

```shell
CREATE USER ''@'' IDENTIFIED WITH caching_sha2_password BY '';
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD ON *.* TO ''@'' WITH GRANT OPTION;
```

## 为了远程登录的配置

### 修改绑定地址 bind_address

要改`bind_address`，如果你还在MySQL命令行，可以先查看：

```shell
SHOW VARIABLES LIKE 'bind_address';
```

默认是：

```text
+---------------+-----------+[weibo.sql](..%2F..%2F..%2F..%2F..%2F..%2F..%2FDownloads%2Fweibo.sql)
| Variable_name | Value     |
+---------------+-----------+
| bind_address  | 127.0.0.1 |
+---------------+-----------+
```

退出 MySQL 命令行：

```shell
exit
```

绑定地址需要改成远程主机的ip，用 ipconfig 查看

编辑`/etc/mysql/mysql.conf.d/mysqld.cnf`，如果你不会用`vim`，也可以用其他编辑器，比如`nano` 

```shell
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
```

查找`bind-address`（vim是输入`/bind-address`，然后enter），改为本地公网ip，如果不想指定，可以改为`bind-address       = 0.0.0.0`

重启 MySQL

```shell
sudo systemctl restart mysql
```

检查启动是否成功：

```shell
sudo systemctl status mysql
```

检查端口：

```shell
sudo lsof -i -P -n | grep LISTEN | grep 3306
```

### 开放端口

```shell
ufw allow mysql
```

## 用 MySQL 客户端连接

不赘述。Navicat、IDE自带的都十分方便。

## 其他教程

推荐 https://www.linode.com/docs/guides/installing-and-configuring-mysql-on-ubuntu-2004/

其他：

- https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04
- https://ubuntu.com/server/docs/install-and-configure-a-mysql-server
- https://stackoverflow.com/questions/15663001/remote-connections-mysql-ubuntu
