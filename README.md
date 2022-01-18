# Restaurant_List
![image](./public/image/snapshot_title_page.PNG)
此專案提供餐廳一覽及其相關資訊
## Features
* 使用者可以瀏覽全部所有餐廳
* 使用者可以搜尋全部所有餐廳
* 使用者可以瀏覽一家餐廳的詳細資訊
* 使用者可以新增一家餐廳
* 使用者可以修改一家餐廳的資訊
* 使用者可以刪除一家餐廳

## Getting Started
1. 將專案 clone 到本機
```bash
git clone https://github.com/GallonShih/Restaurant_List.git
```
2. 透過 npm 安裝相關套件
```bash
npm install
```
3. 安裝完畢後，建立初始化Dataset(請確認本機已安裝MongoDB，並已啟動DB及建立Dataset "restaurant-list")
```bash
npm run seed
```
3. 啟動 web server
```bash
npm run dev
```
4. 等待終端機出現
```bash
Express is listening on localhost:3000
mongodb connected!
```
5. 於網址輸入 localhost:3000
6. 若要暫停使用
```bash
ctrl + c
```

## Authors

* **Gallon Shih**

## Development Tools

* Node.js 14.16.0
* Express 4.17.2
* Express-Handlebars 3.0.0
* body-parser: 1.19.1
* mongoose: 6.1.6
