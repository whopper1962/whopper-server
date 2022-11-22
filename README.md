## whopper-server
___

#### 環境構築/パッケージインストール
```bash
npm install
```
___
#### サーバー起動
~~~bash
npm run serve
~~~
___
#### リクエストを追加

1. `response`ディレクトリ配下にURLパスと同様のディレクトリを作成（例:  `/users`:GET）
~~~
response
  |
  |-users
~~~

2. `{HTTPメソッド}.json`を作成
~~~
response
  |
  |-users
      |
      |-GET.json
~~~

`GET.json`
~~~json:GET.json
[
  {
    "id": 1,
    "name": "Brendan Eich"
  },
  {
    "id": 2,
    "name": "Ryan Dahl"
  }
]
~~~

3. リクエストを送信
~~~
curl localhost:3000/users
~~~
作成したJSONファイルがレスポンスとして返される
~~~
[{"id":1,"name":"Brendan Eich"},{"id":2,"name":"Ryan Dahl"}]
~~~
___
#### ヘッダー

`config/response-headers.js`でレスポンスヘッダーを定義することができます。

___
#### デフォルトレスポンス

リクエストに対するJSONファイルがない場合、HTTPメソッド毎にデフォルトのレスポンスを指定することができます。

`config/default-response.js`で定義することができます。

___
#### レスポンス一覧を出力

以下コマンドで、定義されているレスポンス一覧を`response.txt`に出力します
~~~
npm run list
~~~

~~~
users/1/GET.json
users/2/GET.json
users/3/GET.json
users/GET.json
users/POST.json
~~~