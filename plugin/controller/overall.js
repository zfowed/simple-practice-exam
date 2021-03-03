/* 
* @Author: sublime text
* @Date:   2015-11-13 23:27:51
* @Last Modified by:   sublime text
* @Last Modified time: 2016-01-17 13:38:22
*/

// 判断是否IE7以下浏览器，提示用户更换浏览器预览
if((!+[1,])){
	window.location.href="plugin/error";
};

$(document).ready(function(){

	
	// 定义临时存放题库的数组
	var tmpdata = [];
	//初始化背景
	bg(6, 60*1000);
	

	//获取题库列表
	library_load();

	// 功能菜单栏开关
	$('.set-btn').click(function(event) {
		$('.set-nav').css('background-image', 'url("plugin/images/bg/bg_'+$('.bg>img:visible').attr('i')+'.jpg")');
		$('.set-nav').animate({
			'left': '0'
		}, 200);
		$('.shelter').fadeIn(200);
		$('.shelter').click(function(event) {
			$('.set-nav').animate({
				'left': '-255'
			}, 200);
			$('.shelter').fadeOut(200);
			$('.shelter').off('click');
		});
	});

	// 启动功能菜单栏下拉框
	$('.set-nav>.btn-group>.dropdown-menu>li').click(function(event) {
		$(this).parent().prevAll('button').find('.text').text($(this).text());
	});


	// 启动功能菜单栏下拉框
	$('.dl li').click(function(event) {
		$(this).parent().prevAll('button').find('.text').text($(this).text());
		$('.dl .xx').attr('xh', $(this).parent().prevAll('button').find('.text').text().replace('号',''));
	});


	$('.dl .xx').click(function(event) {
		var ip = $('body').attr('ip');
		var xh = $(this).attr('xh');
		var name = $('.dl input').val();
		if(!xh) {
			return alert('选择学号!');
		}
		if(name=='') {
			return alert('输入姓名!');
		}
		if(xh && name!='') {
			name = name.replace(/\</g,'&lt;');
			name = name.replace(/\>/g,'&gt;');
		}
	});


	// 背景
	function bg(sum, time) {
		if($('.bg>img:first').attr('src')) {
			setInterval(function() {
				for (var a = Math.ceil((Math.random()*sum)); a==($('.bg>img:visible').attr('i')-0); a = Math.ceil((Math.random()*sum))) {}
				$('.bg>img:hidden').attr({
					'src': 'plugin/images/bg/bg_'+a+'.jpg',
					'i': a
				});
				$('.bg>img').fadeToggle(1000);
			}, time);
		}else{
			for (var a = Math.ceil((Math.random()*sum)); a==($('.bg>img:visible').attr('i')-0); a = Math.ceil((Math.random()*sum))) {}
			$('.bg>img:first').fadeIn(200);
			$('.bg>img:first').attr({
				'src': 'plugin/images/bg/bg_'+a+'.jpg',
				'i': a
			});
			bg(sum, time);
		}
	}
	// 启动滚动条
	jQuery('.scrollbar-macosx').scrollbar();
	// 禁用鼠标选中文本
	// $(document).bind('selectstart', function() {
	// 	return false;
	// });
	$('button').focus(function(event) {
		$(this).blur();
	});
	// 开始答题
	$('#begin').click(function(event) {
		$('.set-nav').animate({
			'left': '-255'
		}, 200);
		$('.shelter').fadeIn(200);
		$('.shelter').off('click');
		if($('.set-nav>.btn-group:eq(0)>button>.text').text()=='选择类目') {
			$('.shelter').html('<span><span class="glyphicon glyphicon-info-sign" style="color: #f55;"></span>请选择类目</span>');
			$('.shelter').click(function(event) {
				$('.shelter').html('');
				$('.shelter').off('click');
				$('.set-btn').click();
			});
			return;
		}
		if($('.set-nav>.btn-group:eq(1)>button>.text').text()=='选择题量') {
			$('.shelter').html('<span><span class="glyphicon glyphicon-info-sign" style="color: #f55;"></span>请选择题量</span>');
			$('.shelter').click(function(event) {
				$('.shelter').html('');
				$('.shelter').off('click');
				$('.set-btn').click();
			});
			return;
		}
		$('.shelter').html('<span>加载题库中……</span>');
		setTimeout(function(){
			tmpdata = [];
			if($('.set-nav>.btn-group:eq(0)>button>.text').text()=='所有类目') {
				for (var i in library) {
					for (var j = 0; j < library[i].length; j++) {
						tmpdata.push(library[i][j]);
					}
				}
			}else{
				for (var j = 0; j < library[$('.set-nav>.btn-group:eq(0)>button>.text').text()].length; j++) {
					tmpdata.push(library[$('.set-nav>.btn-group:eq(0)>button>.text').text()][j]);
				}
			}
			if($('.set-nav>.btn-group:eq(3)>button>.text').text()=='随机题目' || $('.set-nav>.btn-group:eq(3)>button>.text').text()=='全部随机') {
				tmpdata.sort(function(a, b) {
					return Math.random() > .5 ? -1 : 1;
				});
			}
			if($('.set-nav>.btn-group:eq(3)>button>.text').text()=='随机选项' || $('.set-nav>.btn-group:eq(3)>button>.text').text()=='全部随机') {
				for (var i = 0; i < tmpdata.length; i++) {
					if(tmpdata[i][1]!='正确') {
						var tmp = [];
						if(tmpdata[i][tmpdata[i].length-2]=='以上都是' || tmpdata[i][tmpdata[i].length-2]=='都不是') {
							for (var j = 1; j < tmpdata[i].length-2; j++) {
								tmp.push(tmpdata[i][j]);
							}
						}else{
							for (var j = 1; j < tmpdata[i].length-1; j++) {
								tmp.push(tmpdata[i][j]);
							}
						}
						tmp.sort(function(a, b) {
							return Math.random() > .5 ? -1 : 1;
						});
						if(tmpdata[i][tmpdata[i].length-2]=='以上都是' || tmpdata[i][tmpdata[i].length-2]=='都不是') {
							tmp.push(tmpdata[i][tmpdata[i].length-2]);
						}
						var dda;
						switch(tmpdata[i][tmpdata[i].length-1]) {
							case 'A':
								dda = 1;
								break;
							case 'B':
								dda = 2;
								break;
							case 'C':
								dda = 3;
								break;
							case 'D':
								dda = 4;
								break;
						}
						for (var j = 0; j < tmp.length; j++) {
							if(tmp[j]==tmpdata[i][dda]) {
								switch(j) {
									case 0:
										tmpdata[i][tmpdata[i].length-1] = 'A';
										break;
									case 1:
										tmpdata[i][tmpdata[i].length-1] = 'B';
										break;
									case 2:
										tmpdata[i][tmpdata[i].length-1] = 'C';
										break;
									case 3:
										tmpdata[i][tmpdata[i].length-1] = 'D';
										break;
								}
							}
						}
						for (var j = 0; j < tmp.length; j++) {
							tmpdata[i][j+1] = tmp[j];
						}
					}
				}
			}
			var topic_data = "";
			var topic_index = "";
			for (var i = 0; i < ($('.set-nav>.btn-group:eq(1)>button>.text').attr('len')-0); i++) {
				topic_data = topic_data + '<li><h3>' + tmpdata[i][0] + '</h3><ul>';
				for (var j = 1; j < tmpdata[i].length-1; j++) {
					topic_data = topic_data + '<li>' + tmpdata[i][j] + '</li>';
				}
				topic_index = topic_index + '<li>' + (i+1) + '</li>';
				topic_data = topic_data + '</ul>';
				if($('.set-nav>.btn-group:eq(2)>button>.text').text()=='提示答案') {
					topic_data = topic_data + '<div class="solution"><b>查看答案：</b><span>' + tmpdata[i][tmpdata[i].length-1] + '</span></div>';
				}
				topic_data = topic_data + '</li>';
			}
			$('.topic-list').html(topic_data);
			$('.topic-index>div>ul').html(topic_index);
			$('.topic-list>li>h3>img').bind('dragstart', function() {
				return false;
			});
			$('.topic-list>li>h3>img').click(function(event) {
				btimg($(this).attr('src'));
				return false;
			});
			$('.header>span').text('已答0题/共' + $('.topic-list>li').length + '题');
			$('.topic-index>div>ul>li').click(function(event) {
				var st;
				if($('.container').width()>768) {
					st = ($('.topic-list>li:eq(' + ($(this).text() - 1) + ')').position().top);
				}else{
					st = ($('.topic-list>li:eq(' + ($(this).text() - 1) + ')').position().top + 15);
				}
				$('.topic-list>li').removeClass('i');
				$('.topic-list>li').eq($(this).text() - 1).addClass('i');
				$('.main>div>.scrollbar-macosx').stop();
				$('.main>div>.scrollbar-macosx').animate({
					scrollTop: st
				}, 200);
				$('.shelter').click();
			});
			$('.topic-list>li').click(function(event) {
				$('.topic-index>div>ul>li').eq($(this).index()).click();
			});
			$('.topic-list>li>ul>li').click(function(event) {
				$(this).siblings().removeClass('i');
				$(this).addClass('i');
				$('.topic-index>div>ul>li').eq($(this).parents('li').index()).addClass('i');
				if(($(this).parents('li').index()+2) <= $('.topic-index>div>ul>li').length) {
					$('.topic-index>div>ul>li').eq($(this).parents('li').index()+1).click();
				}
				var ddi;
				switch($(this).index()) {
					case 0:
						ddi = 'A';
						break;
					case 1:
						ddi = 'B';
						break;
					case 2:
						ddi = 'C';
						break;
					case 3:
						ddi = 'D';
						break;
						
				}
				$('.topic-index>div>ul>li').eq($(this).parents('li').index()).attr('ddi', ddi);
				$('.header>span').text('已答' + $('.topic-index>div>ul>li.i').length + '题/共' + $('.topic-list>li').length + '题');

				return false;
			});
			$('.topic-index>div>ul>li').eq(0).click();
			$('.shelter').fadeOut(200, function() {
				$('#submit').fadeIn(200);
			});
			$('.shelter').html('');
			$('#again').css('display', 'none');

		},500); 

		
	var a1 = $('.set-nav>.btn-group>button:eq(0)>span').text();
	var a2 = $('.set-nav>.btn-group>button:eq(1)>span').attr('len');
	var a3 = $('.set-nav>.btn-group>button:eq(2)>span').text();
	var a4 = $('.set-nav>.btn-group>button:eq(3)>span').text();
	var data = [a1,a2,a3,a4];

	});
	// 提交
	$('#submit').click(function(event) {
		$('.shelter').fadeIn(200);
		$('.shelter').html('<span>系统正在改卷中……</span>');
		setTimeout(function(){
			var d = 0;
			for (var i = 0; i < $('.topic-list>li').length; i++) {
				if($('.topic-index>div>ul>li').eq(i).attr('ddi')==tmpdata[i][tmpdata[i].length-1]) {
					d++;
					$('.topic-index>div>ul>li').eq(i).css('background-color', '#5f5');
					$('.topic-list>li').eq(i).append('<span style="color: #5f5;">✔</span>');
				}else{
					if($('.topic-index>div>ul>li').eq(i).attr('ddi')) {
						$('.topic-index>div>ul>li').eq(i).css('background-color', '#f55');
						$('.topic-list>li').eq(i).append('<span style="color: #f55;">✘</span>');
					}else{
						$('.topic-list>li').eq(i).append('<span style="color: #55f;">…</span>');
					}
				}
				var ddii;
				switch(tmpdata[i][tmpdata[i].length-1]) {
					case 'A':
						ddii = 0;
						break;
					case 'B':
						ddii = 1;
						break;
					case 'C':
						ddii = 2;
						break;
					case 'D':
						ddii = 3;
						break;
				}
				$('.topic-list>li:eq('+i+')>ul>li').eq(ddii).addClass('ddi');
			}
			$('.header>span').text('共' + $('.topic-list>li').length + '题，完成' + $('.topic-index>div>ul>li.i').length + '题，答对' + d + '题');
			$('.shelter').html('<span>' + '共' + $('.topic-list>li').length + '题，完成' + $('.topic-index>div>ul>li.i').length + '题，答对' + d + '题' + '</span>');

			$('.shelter').click(function(event) {
				$('.shelter').fadeOut(200);
				$('.shelter').html('');
				$('.shelter').off('click');
				$('.topic-list>li>ul>li').off('click');
				$('#submit').fadeOut(200, function() {
					$('#again').fadeIn(200, function () {
						$('.topic-index>div>ul>li').eq(0).click();



            // $('#again').off('click');

					});
				});
			});
					cok=true;

		},500); 
	});
	// 重新做一遍
	$('#again').click(function(event) {
		$('#begin').click();
	});



	// 按键事件
	$(document).keypress(function(event) {
		if($('#submit').css('display') == 'block' || $('#again').css('display') == 'block') {
			switch(event.keyCode) {
				case 13:
					if($('.shelter').css('display') == 'block') {
						$('.shelter').click();
					}else if($('#again').css('display') == 'block') {
						$('#again').click();
					}else{
						$('#submit').click();
					}
					break;
				case 32:
					if($('.shelter').css('display') != 'block') {
						$('.set-btn').click();
					}
					break;
				//-----------------------------------------
				case 61:
					if($('.topic-list>.i').index()+1 < $('.topic-list>li').length) {
						$('.topic-list>li').eq($('.topic-list>.i').index()+1).click();
					}else{
						$('.topic-list>li').eq(0).click();
					}
					break;
				case 43:
					if($('.topic-list>.i').index()+1 < $('.topic-list>li').length) {
						$('.topic-list>li').eq($('.topic-list>.i').index()+1).click();
					}else{
						$('.topic-list>li').eq(0).click();
					}
					break;
				case 45:
					$('.topic-list>li').eq($('.topic-list>.i').index()-1).click();
					break;
				//------------------------------------------
				case 49:
					$('.topic-list>.i>ul>li').eq(0).click();
					break;
				case 50:
					$('.topic-list>.i>ul>li').eq(1).click();
					break;
				case 51:
					$('.topic-list>.i>ul>li').eq(2).click();
					break;
				case 52:
					$('.topic-list>.i>ul>li').eq(3).click();
					break;
				//------------------------------------------
				case 65:
					$('.topic-list>.i>ul>li').eq(0).click();
					break;
				case 66:
					$('.topic-list>.i>ul>li').eq(1).click();
					break;
				case 67:
					$('.topic-list>.i>ul>li').eq(2).click();
					break;
				case 68:
					$('.topic-list>.i>ul>li').eq(3).click();
					break;
				//------------------------------------------
				case 97:
					$('.topic-list>.i>ul>li').eq(0).click();
					break;
				case 98:
					$('.topic-list>.i>ul>li').eq(1).click();
					break;
				case 99:
					$('.topic-list>.i>ul>li').eq(2).click();
					break;
				case 100:
					$('.topic-list>.i>ul>li').eq(3).click();
					break;
				default:
					
			}
		}
	});
	// 图片查看器
	function btimg (uri) {
		$('.btimg').fadeIn(200);
		$('.btimg>img').attr('src', uri);
		$('.btimg>img').css({
			'top': '50%',
			'left': '50%',
			'margin-top': 0 - $('.btimg>img').height()/2,
			'margin-left': 0 - $('.btimg>img').width()/2
		});
		// 图片拖地
		$('.btimg>img').mousedown(function(event) {
			var mousedownX = event.pageX;
			var mousedownY = event.pageY;
			var imgLeft = $('.btimg>img').css('left').replace('px','') - 0 ;
			var imgTop = $('.btimg>img').css('top').replace('px','') - 0 ;
			$('.btimg>img').css({
				opacity: '.75',
				cursor: 'move'
			});
			$('body').mousemove(function(event) {
				var mousemoveX = event.pageX - mousedownX;
				var mousemoveY = event.pageY - mousedownY;

				$('.btimg>img').css({
					left: imgLeft + mousemoveX + 'px',
					top: imgTop + mousemoveY + 'px'
				});
			})
			$(document).mouseup(function(event) {
				$('.btimg>img').css({
					opacity: '1',
					cursor: 'pointer'
				});
				$('body').off( "mousemove");
				$('body').off( "mouseup");
			});
		});
		// 图片功能
		$('.btimg>.btnimg>.glyphicon.glyphicon-remove').click(function(event) {
			$('.btimg').fadeOut(200);
		});
	}
});


// 选择题库
function library_load() {
	$('.topic-list').html('<div class="jumbotron"><h1>'+library_name+'</h1><p>单击左上角"<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-menu-hamburger"></span></button>"开始进行答题</p></div>');
	$('.header>span').text(library_name);
	$('.topic-list button').click(function(event) {
		$('.set-btn').click();
	});

	$('.set-btn').fadeIn(200);
	$('.topic-list').fadeIn(200);
	$('.library-list').css('display', 'none');
	$('.set-nav>.btn-group:eq(0)>.dropdown-menu').html('');
	for (var i in library) {
		$('.set-nav>.btn-group:eq(0)>.dropdown-menu').append('<li><a>' + i + '</a></li>');
	}
	$('.set-nav>.btn-group:eq(0)>.dropdown-menu').append('<li class="divider"></li><li><a>所有类目</a></li>');
	$('.set-nav>.btn-group:eq(0)>.dropdown-menu>li').not('.divider').click(function(event) {
		$('.set-nav>.btn-group:eq(1)>button>.text').text('选择题量');
		$(this).parent().prevAll('button').find('.text').text($(this).text());
		var library_len = [10,25,50,100,150,200,250,350,500];
		var len;
		if($(this).text()=='所有类目') {
			len = 0;
			for (var i in library) {
				len += library[i].length;
			}
		}else{
			len = library[$('.set-nav>.btn-group:eq(0)>button>.text').text()].length;
		}
		$('.set-nav>.btn-group:eq(1)>.dropdown-menu').html('');
		for (var i = 0; i < library_len.length; i++) {
			if(library_len[i]<len) {
				$('.set-nav>.btn-group:eq(1)>.dropdown-menu').append('<li len=' + library_len[i] + '><a>挑战' + library_len[i] + '题</a></li>');
			}
		}
		$('.set-nav>.btn-group:eq(1)>.dropdown-menu').append('<li class="divider"></li><li len=' + len + '><a>挑战所有题目（' + len + '题）</a></li>');
		if(len>(library[library.length-1]+1)) {
			$('.set-nav>.btn-group:eq(1)>.dropdown-menu>li:last').addClass('disabled')
		}
		$('.set-nav>.btn-group:eq(1)>.dropdown-menu>li').not('.divider,.disabled').click(function(event) {
			$(this).parent().prevAll('button').find('.text').text($(this).text());
			$(this).parent().prevAll('button').find('.text').attr('len', $(this).attr('len'));
		});
	});
}