# 走出 Vercel：Next.js 在 Ubuntu 部署

## 前置需要

- 带有 UFW 管理防火墙的 Ubuntu（本篇建议版本为 18.04 到 24.04）
- 一个带有`sudo`权限的用户（生产环境不推荐直接用 root）
- 一个域名（可选，没有就用 ip 访问，且跳过 SSH 连接）
- 要部署的 Next.js 代码（若没有可以上网搜一个，本文直接用官方实例）

## 安装软件包

更新软件包列表：

```shell
sudo apt update
```

安装 NGINX、nvm（`node.js`版本管理）、npm以及SSH相关包：

```shell
sudo apt install nginx nvm npm certbot python3-certbot-nginx
```

安装完`npm`后，进一步全局安装`pm2`：

```shell
npm install pm2 -g
```

安装完`nvm`后，进一步安装`node.js`最新`tls`版本：

```shell
nvm install --lts
```

:::details 如果你想指定版本，比方说代码项目需要node.js版本为18
````shell
nvm install 18 --lts
````
:::

## 创建或拉取一个 Next.js 应用

如果你有 Next.js 应用，克隆即可。如果没有，可创建一个示例来完成接下来的教程：

```shell
npx create-next-app@latest demo-next
```

之后构建项目：

```shell
cd demo-next
npm run build
```

用 pm2 运行程序：

```shell
pm2 start npm --name "demo-next" -- start
```

大致会得到：

| id | name      | namespace | version | mode | pid    | uptime | ↺ | status | cpu | mem    | user | watching |
|----|-----------|-----------|---------|------|--------|--------|---|--------|-----|--------|------|----------|
| 0  | demo-next | default   | 0.39.0  | fork | 283274 | 0s     | 1 | online | 0%  | 29.3mb | demo | disabled |

简单验证是否初步跑起来：

```shell
wget -q -O - localhost:3000 | grep -q "next.js" && echo "Found 'next'" || echo "Not found 'next'"
```

:::info
如果你的项目配置了别的端口，请自行切换，本篇默认使用3000端口；
如果你用的是自己的项目，请自行将next.js换成别的词来初步检验
:::

## 配置 Nginx

修改文件`/etc/nginx/sites-available/default`，替换成如下内容：

```shell
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        # server_name gantrol.com; # 改域名，注释掉

    location / {
                proxy_pass http://127.0.0.1:3000; # 注意端口
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```

修改完毕后，语法检查：

```shell
sudo nginx -t
```

若无错，重新加载配置：

```shell
sudo systemctl reload nginx
```

此时，请求本地80端口，应当等到与之前请求3000端口一样的结果：

```shell
wget -q -O - localhost | grep -q "next.js" && echo "Found 'next'" || echo "Not found 'next'"
```

## 通过 UFW 配置防火墙

```shell
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
```

此时，已经可以通过外部浏览器访问`<ip>`，从而访问 Next.js 对应的应用。

## 为域名配置 SSL

> 域名一般需要购买。也有一些云部署的网站会下放子域名给用户。绑定 ip 一般都有方便的界面来配置。

绑定域名后：

```shell
sudo certbot --nginx -d gantrol.com -d www.gantrol.com
```

:::details 一个例子
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Enter email address (used for urgent renewal and security notices)
(Enter 'c' to cancel): xxx@?.com

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.4-April-3-2024.pdf. You must agree in
order to register with the ACME server. Do you agree?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: Y

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Would you be willing, once your first certificate is successfully issued, to
share your email address with the Electronic Frontier Foundation, a founding
partner of the Let's Encrypt project and the non-profit organization that
develops Certbot? We'd like to send you email about our work encrypting the web,
EFF news, campaigns, and ways to support digital freedom.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: N
Account registered.
Requesting a certificate for tombkeeper.com and www.tombkeeper.com

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/tombkeeper.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/tombkeeper.com/privkey.pem
This certificate expires on 2024-08-05.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Deploying certificate
Successfully deployed certificate for tombkeeper.com to /etc/nginx/sites-enabled/default
Successfully deployed certificate for www.tombkeeper.com to /etc/nginx/sites-enabled/default
Congratulations! You have successfully enabled HTTPS on https://xx.xx and https://www.xx.xx

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
* Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
* Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

:::

测试证书自动续期

```shell
certbot renew --dry-run
```

更新 nginx：

```text
sudo nginx -t
sudo systemctl reload nginx
```

SSL应当已经正常工作，更改 nginx 配置文件`/etc/nginx/sites-available/default`：

```text
server {
        listen 80;
        server_name gantrol.com www.gantrol.com;  # 记得换域名
        location / {
                proxy_pass             http://127.0.0.1:3000;  # 与 Next.js 对应
                proxy_read_timeout     60;
                proxy_connect_timeout  60;
                proxy_redirect         off;
                # Allow the use of websockets
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```

如果不是，应当更新后：

```text
sudo nginx -t
sudo systemctl reload nginx
```

## 后续

### 代码更新怎么办？

```shell
git pull
npm run build
pm2 restart <app_name>
```
