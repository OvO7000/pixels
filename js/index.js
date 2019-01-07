/**
 * Created by OvO7 on 2019/1/6.
 */
var pixels = {
    option: {
        H: 400,
        W: 800,
        pixels: $("#pixels"),
        ctx: null,
        colors: ['rgb(0, 0, 0)', 'rgb(255, 255, 255)', 'rgb(170, 170, 170)', 'rgb(85, 85, 85)', 'rgb(254, 211, 199)', 'rgb(255, 196, 206)', 'rgb(250, 172, 142)', 'rgb(255, 139, 131)', 'rgb(244, 67, 54)', 'rgb(233, 30, 99)', 'rgb(226, 102, 158)', 'rgb(156, 39, 176)', 'rgb(103, 58, 183)', 'rgb(63, 81, 181)', 'rgb(0, 70, 112)', 'rgb(5, 113, 151)', 'rgb(33, 150, 243)', 'rgb(0, 188, 212)', 'rgb(59, 229, 219)', 'rgb(151, 253, 220)', 'rgb(22, 115, 0)', 'rgb(55, 169, 60)', 'rgb(137, 230, 66)', 'rgb(215, 255, 7)', 'rgb(255, 246, 209)', 'rgb(248, 203, 140)', 'rgb(255, 235, 59)', 'rgb(255, 193, 7)', 'rgb(255, 152, 0)', 'rgb(255, 87, 34)', 'rgb(184, 63, 39)', 'rgb(121, 85, 72)'],
        selectedColor: 'rgb(0, 0, 0)',
        panel: [],
        scale: 1
    },
    init: function () {
        this.option.pixels.draggable({
            cursor: "move",
            stop: function () {
            }
        });

        this.renderColors();
        this.option.ctx = this.option.pixels[0].getContext("2d");
        this.render();
        // this.test();
        this.bindEvent();
    },
    renderColors: function () {
        // 初始化选色面板
        var colors = this.option.colors;
        for (var i = 0; i < colors.length; i++) {
            var $li = $('<li style="background-color:' + colors[i] + '"></li>');
            $('.colors ul').append($li[0]);
        }
        $($('.colors li')[0]).addClass('selected');

        // 初始化画板颜色
        for (var i = 0; i < this.option.H; i++) {
            this.option.panel[i] = [];
            for (var j = 0; j < this.option.W; j++) {
                this.option.panel[i][j] = '#dddddd';
            }
        }
    },
    render: function () {
        for (var i = 0; i < this.option.H; i++) {
            for (var j = 0; j < this.option.W; j++) {
                this.option.ctx.fillStyle = this.option.panel[i][j];
                this.option.ctx.fillRect(j * this.option.scale, i * this.option.scale, this.option.scale, this.option.scale);
            }
        }
    },
    test: function () {
        this.option.ctx.fillStyle = '#111';
        this.option.ctx.fillRect(0, 0, 100, 100);
    },
    bindEvent: function () {
        var _this = this,
            pixels = this.option.pixels;
        $('.colors').on('click', 'li', function () {
            _this.option.selectedColor = _this.option.colors[$(this).index()];
            $(this).addClass('selected').siblings().removeClass('selected');
        });

        pixels.on('click', function (e) {
            var x = Math.round(e.offsetX / _this.option.scale),
                y = Math.round(e.offsetY / _this.option.scale);
            _this.option.panel[y][x] = _this.option.selectedColor;
            _this.option.ctx.fillStyle = _this.option.selectedColor;
            _this.option.ctx.fillRect(x * _this.option.scale, y * _this.option.scale, _this.option.scale, _this.option.scale);

        });
        pixels.on('mousewheel', function (e) {

                if (e.originalEvent.wheelDelta > 0) {
                    _this.option.scale++;
                    _this.scale(_this.option.scale);
                }
                else if (_this.option.scale > 1) {
                    _this.option.scale--;
                    _this.scale(_this.option.scale);
                }
            }
        );

        $('.btn-all').on('click', function () {
            _this.scale(1);
        });
        $('.btn-5x').on('click', function () {
            _this.scale(5);
        });
        $('.btn-10x').on('click', function () {
            _this.scale(10);
        });

    },
    scale: function (times) {
        var width = 800,
            height = 400;
        this.option.scale = times;
        this.option.pixels.attr('width', times * width);
        this.option.pixels.attr('height', times * height);
        this.render();
    }

};

pixels.init();