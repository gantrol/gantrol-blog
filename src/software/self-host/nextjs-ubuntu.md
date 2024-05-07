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

修改文件`/etc/nginx/sites-available/example.com`，替换成如下内容：

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

## 施工中🚧

剩下SSH配置的部分。域名配置估计会省略
