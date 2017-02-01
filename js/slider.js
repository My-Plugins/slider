/**
 * Created by zpp on 2016/10/3.
 */
/**
 * 利用jQuery插件和原型的原理编写的轮播图插件
 */
(function ($) {
    //创建轮播图的构造函数
    function Slider(options) {
        this.init(options);
    }

    //构造函数的原型，存放一些公用的属性或者方法（目的是实现数据共享）
    Slider.prototype = {
        constructor: Slider,
        init: function (options) {
            //初始化公用的属性
            this.data = options.data;
            this.showTime = options.showTime;
            this.step = options.step;
            this.container = options.id;
            this.$container = $("#" + this.container);
            this.isAuto = options.isAuto;
            //初始化页面
            this.$container.html(this.parse2Html());
            this.$slider = this.$container.find(".slider");
            this.index = this.$slider.data("index");//获得初始化的索引
            this.timer = null;
            this.length = this.data.length;//获得图片的个数
            this.$slidePanel = this.$container.find(".slider-panel");//图片
            this.$sliderItem = this.$container.find(".slider-item");//导航按钮
            this.$prev = this.$container.find(".slider-prev");//左按钮
            this.$next = this.$container.find(".slider-next");//右按钮
            this.$page = this.$container.find(".slider-page");//左右按钮的父元素

            //初始化公用的方法
            //初始化索引
            this.setIndex(0, this.length);
            //初始化当前显示的图片
            this.$slidePanel.fadeTo(0, 0).eq(0).fadeTo(0, 1);
            //初始化绑定的事件
            this.bindEvent();
            //刚开始左右箭头是隐藏的
            this.$page.hide();


        },
        //初始化页面的函数
        parse2Html: function () {
            var sliderList = [],
                sliderMain = [],
                sliderItem = [];
            sliderList.push('<div class="slider" data-index="0">');
            sliderMain.push('<ul class="slider-main">');
            this.data.forEach(function (value) {
                sliderMain.push('<li class="slider-panel">');
                sliderMain.push('<a href="javascript:;"><img src="' + value.src + '"/></a>');
                sliderMain.push('</li>');
            })
            sliderMain.push('</ul>');
            sliderList.push(sliderMain.join(""));
            sliderItem.push('<div class="slider-extra">');
            sliderItem.push('<ul class="slider-nav">');
            this.data.forEach(function (value, index) {
                if (index === 0) {
                    sliderItem.push('<li class="slider-item slider-selected">' + (index + 1) + '</li>');
                } else {
                    sliderItem.push('<li class="slider-item">' + (index + 1) + '</li>')
                }
            });
            sliderItem.push('</ul>');
            sliderItem.push('<div class="slider-page">');
            sliderItem.push('<a href="javascript:void(0)" class="slider-prev">&lt;</a>');
            sliderItem.push('<a href="javascript:void(0)" class="slider-next">&gt;</a>');
            sliderItem.push('</div>');
            sliderItem.push('</div>');
            sliderList.push(sliderItem.join(""));
            sliderList.push('</div>');
            return sliderList.join("");
        },
        //设置索引号函数
        setIndex: function (index, length) {
            if (index > length - 1) {
                this.index = 0;
            } else if (index < 0) {
                this.index = length - 1;
            } else {
                this.index = index;
            }
        },
        //实现轮播的效果
        slide: function (index) {
            this.$slidePanel.eq(index).fadeTo(this.showTime, 1).css("z-index", 1)
                .siblings().fadeTo(this.showTime, 0).css("z-index", 0);
            this.setIndex(index, this.length);
            this.$sliderItem.eq(index).addClass("slider-selected")
                .siblings().removeClass("slider-selected");
        },
        //绑定事件
        bindEvent: function () {
            //保存this
            var self = this;
            self.$prev.on("click", function () {
                self.index -= 1;
                self.setIndex(self.index, self.length);
                self.slide(self.index);
            });
            self.$next.on("click", function () {
                self.index += 1;
                self.setIndex(self.index, self.length);
                self.slide(self.index);
            });
            self.$slider.on("mouseenter", function () {
                self.$page.show();
                clearInterval(self.timer);
            });
            self.$slider.on("mouseleave", function () {
                self.$page.hide();
                self.isAuto && self.autoplay();
            });
            self.$sliderItem.on("click", function () {
                var index = $(this).html() - 1;
                self.setIndex(self.index, self.length);
                self.slide(index);
            });

           this.isAuto && this.autoplay();

        },
        //自动播放
        autoplay: function () {
            var self = this;
            var autoplay = function () {
                self.index += 1;
                self.setIndex(self.index, self.length);
                self.slide(self.index);
            };
            self.timer = setInterval(autoplay, self.step);
        }
    };

    //使用jQuery插件
    $.fn.Slider = function (options) {
        //初始化默认参数
        var defaults = {
            showTime: 1000,
            step: 2000,
            id: this[0].id,
            isAuto: false
        };
        //设置参数
        var settings = $.extend({}, defaults, options);
        //调用构造函数
        new Slider(settings);
        //实现链式编程
        return this;
    }

})(jQuery)

