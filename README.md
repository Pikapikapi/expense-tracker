# expense-tracker
## Expense Tracker
![111擷取](https://github.com/Pikapikapi/expense-tracker/assets/12609595/4c98327a-84b9-4b86-9252-23f50f5136d5)


## 簡介
記帳用專案，使用者登入後可以在頁面中針對不同的品項，進行帳目的過濾、新增、修改、刪除。

## 功能
* 註冊/登入
* 查看所有帳目
* 新增帳目
* 篩選特定類別帳目
* 編輯帳目
* 刪除帳目

## 開發環境與套件
VS Code - 編程環境
MongoDB
Handleabrs
Express
Passport.js
bcryptjs
mongoose ...
其餘請看package.json設定

## 安裝與執行
1.需安裝 node.js、npm
node.js 可透過nvm進行安裝,而 npm 會在安裝 node.js 自動下載。
nvm [安裝方式](https://www.casper.tw/development/2022/01/10/install-nvm/)
node.js 安裝方式:
$ nvm install 14.16.0

2.開啟Terminal, 將此專案 Clone 到本地
$ git clone [https://github.com/Pikapikapi/expense-tracker]

3.進入此專案資料夾
$ cd /{your project path}/expense-tracker

4.安裝 npm 套件，會依照依賴把相關 npm 套件加入專案
$ npm install

5.參考 .env.example檔案，重構 .env 環境

6.安裝種子資料(第一次使用時，可以先建立測試資料，若已經建立可以跳過)
$ npm run seed

7.安裝完畢接續輸入
$ npm run start

8.當Terminal顯示以下訊息，代表伺服器已成功運行
App is running on http://localhost:3000

9.使用種子資料裡的測試帳號進行測試，或是自己建立帳號進行測試

10.打開瀏覽器至以下[網址]操作看看吧(http://localhost:3000)
