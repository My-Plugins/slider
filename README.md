## 轮播图插件的使用说明
1.首先引入css文件
```js
<link rel="stylesheet" href="css/index.css">
```
2.引入jquery包、slider包
```js
<script src="js/jquery.min.js"></script>
<script src="js/slider.js"></script>
```
3.html页面中有一个容器
```js
 <div id="focus">
 </div>
```
4.js使用
```js
<script>
    $(function () {

        var data = [
            {title: "Galaxy On7", src: "images/57e379eaNd0019450.jpg", href: "#Galaxy On7"},
            {title: "Air Touch-X2", src: "images/57e3a213Na5664990.jpg", href: "#Air Touch-X2"},
            {title: "满199减100", src: "images/57d8fbe7N805ce5a7.jpg", href: "#满199减100"},
            {title: "奇趣", src: "images/57e8ce7dNb5318721.jpg", href: "#奇趣"},
            {title: "国庆", src: "images/57e4df77Nc1ee769d.jpg", href: "#国庆"},
            {title: "360奇酷", src: "images/57e8e57cNe0aabea6.jpg", href: "#360奇酷"}
        ];
        //调用
        $("#focus").Slider({
            data:data,  //传入json数据
            showTime:1000,//两张图片的间隔时间
            step:2000,//定时器延时的时间
            isAuto:true//是否自动的播放轮播图
        })
    })
</script>
```
5.效果图展示：![](https://raw.githubusercontent.com/Believel/MarkdownPhotos/master/imgs/slider.png)
