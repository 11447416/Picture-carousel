var delay = 2000; //延迟时间
	var imgList = $("#imgHold").children("li"); //获取所有图片列表
	var imgNum = imgList.length; //获取图片数量
	var nowShow = 0; //当前显示图片的序号，注意，是0序
	var preShow;
	var title = $(".title"); //显示title的div
	addIndex(imgNum); //添加右下角那种小点
	myInterval('-1'); //调用图片切换函数，初始化
	var timer1 = setInterval("myInterval('-1')", delay); //每隔1秒，调用一次
	//切换图片的方法
	function myInterval(index) {
		if (index != "-1") nowShow = index; //判断是初始化，还是用户手动切换
		title.html(imgList.eq(nowShow).children().attr("title")); //获取要显示的那个图片的title，显示出来
		imgList.eq(preShow).css("display", "block"); //显示先前那张图片
		imgList.eq(preShow).css("right", "0"); //直接放在舞台中央
		imgList.eq(preShow).animate({//显示移动出去的效果
			right: '500px'
		});
		imgList.eq(nowShow).css("display", "block"); //显示将要显示的图片
		imgList.eq(nowShow).css("right", "-500px"); //放在舞台右边
		imgList.eq(nowShow).animate({ //移动到舞台中央
			right: '0'
		});
		addIndex(imgNum); //重新添加右下角的小
		preShow = nowShow;
		nowShow++; //下次显示的图片
		if (nowShow >= imgNum) nowShow = 0; //如果图片已经到了最后，回到开始第一张
	}
	//添加右下角的点,先删除全部再添加，是他跟随图片，切换
	function addIndex(index) {
		var indexHold = $("#indexHold"); //获取装小点的容器
		indexHold.empty(); //清空容器，避免还有上一次的小点
		for (var i = index - 1; i >= 0; i--) { //这里反着，中后面想前面添加
			if (nowShow == i) {
				indexHold.append("<li style='background-color:#ff2222' value='" + i + "'></li>"); //当前一张的图片，用红点
			} else {
				indexHold.append("<li value='" + i + "'></li>");
			}
		}
		//绑定小点的点击事件
		indexHold.children("li").click(function() {
			myInterval($(this).attr("value")); //切换到指定那张
			clearInterval(timer1); //取消定时器，避免定时器时间到了，马上切换走。
			timer1 = setInterval("myInterval('-1')", delay); //重启开启定时器
		});
	}