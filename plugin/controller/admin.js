/* 
* @Author: sublime text
* @Date:   2015-11-08 11:34:01
* @Last Modified by:   sublime text
* @Last Modified time: 2016-01-17 13:30:56
*/

$(document).ready(function(){

	var socket=io();
	socket.on('admin', function (data) {
		if($('tbody tr[ioid=' + data.id + ']').length == 0) {
			$('tbody').append('<tr ioid=' + data.id + '></tr>')
			$('tbody tr:last').append('<td>' + data.iodata.ip + '</td>');
			$('tbody tr:last').append('<td>' + data.iodata.xh + '</td>');
			$('tbody tr:last').append('<td>' + data.iodata.name + '</td>');
			$('tbody tr:last').append('<td>' + data.iodata.kz[0] + '</td>');
			$('tbody tr:last').append('<td>' + data.iodata.kz[1] + '</td>');
			$('tbody tr:last').append('<td>' + data.iodata.kz[2] + ' ' + data.iodata.kz[3] + '</td>');


			$('tbody tr:last').append('<td><div class="progress"><div style="width: ' + 0 + '%" class="progress-bar progress-bar-info aa"><span class="ss">' + 0 + '题</span></div></div></td>');


			$('tbody tr:last').append('<td>' + '' + '</td>');

			$('tbody tr:last').append('<td>' + '<button type="button" class="btn-xs btn btn-primary xxax">释放</button>' + '</td>');


			$(".xxax:last").click(function(event) {
				var id = $(this).parents('tr').attr('ioid');

				socket.emit("sff",id );
				$(this).parents('tr').remove();
			});


		}else{
			$('tbody tr[ioid=' + data.id + '] td:eq(1)').text(data.iodata.xh);
			$('tbody tr[ioid=' + data.id + '] td:eq(2)').text(data.iodata.name);
			$('tbody tr[ioid=' + data.id + '] td:eq(3)').text(data.iodata.kz[0]);
			$('tbody tr[ioid=' + data.id + '] td:eq(4)').text(data.iodata.kz[1]);
			$('tbody tr[ioid=' + data.id + '] td:eq(5)').text(data.iodata.kz[2] + ' ' + data.iodata.kz[3]);
			if(data.iodata.jj==null) {
				$('tbody tr[ioid=' + data.id + '] td:eq(6) .aa').css('width', ((data.iodata.ts/(data.iodata.kz[1]-0))*100) + "%");
				$('tbody tr[ioid=' + data.id + '] td:eq(6) .ss').text(data.iodata.ts + '');
			}else{
				$('tbody tr[ioid=' + data.id + '] td:eq(6)').html('')
				$('tbody tr[ioid=' + data.id + '] td:eq(6)').html('<div class="progress"><div style="width: ' + ((data.iodata.jj/(data.iodata.kz[1]-0))*100) + '%" class="progress-bar progress-bar-success"><span>' + data.iodata.jj + '</span></div><div style="width: ' + (((data.iodata.kz[1]-data.iodata.jj)/(data.iodata.kz[1]-0))*100) + '%" class="progress-bar progress-bar-danger"><span class="ss">' + (data.iodata.kz[1]-data.iodata.jj) + '</span></div></div>');
				$('tbody tr[ioid=' + data.id + '] td:eq(7)').text(((data.iodata.jj/(data.iodata.kz[1]-0))*100).toFixed(2));
			}
		}
		$('h3').text('考试情况 （人数：' + $('tbody tr').length + '人）')
		if(data.iodata.dxx == 1) {
			$('tbody tr[ioid=' + data.id + ']').addClass('danger');
		}
	});


	socket.on('dxx', function (data) {
		$('tbody tr[ioid=' + data.id + ']').addClass('danger');
	});

$('#logo').click(function(event) {
	var data = "mm=" + $('#mm').val();
	$.ajax({
		url: '/admin',
		type: 'POST',
		dataType: 'html',
		data: data
	})
	.done(function(data) {
		if(data=="pass"){
			window.location.href="/admin";
		}else{
			alert('密码错误!');
		}
	})
	.fail(function() {
		console.log("error");
	});
});

$('#begin').click(function(event) {
	var a1 = $('.ks>.btn-group>button:eq(0)>span').text();
	var a2 = $('.ks>.btn-group>button:eq(1)>span').attr('len');
	var a3 = $('.ks>.btn-group>button:eq(2)>span').text();
	var a4 = $('.ks>.btn-group>button:eq(3)>span').text();
	if(a1=='选择类目') {
		return alert('选择类目');
	}
	if($('.ks>.btn-group>button:eq(1)>span').text()=='选择题量') {
		return alert('选择题量');
	}
	var data = [a1,a2,a3,a4];
	socket.emit("kk",data);
});

$(".xxax").click(function(event) {
	var id = $(this).parents('tr').attr('ioid');

	socket.emit("sff",id );
	$(this).parents('tr').remove();
});

$("#shouj").click(function(event) {
	socket.emit("shouj");
});





	library_load();





// 选择题库
function library_load() {

	$('.ks>.btn-group>.dropdown-menu>li').click(function(event) {
		$(this).parent().prevAll('button').find('.text').text($(this).text());
	});
	for (var i in library) {
		$('.ks>.btn-group:eq(0)>.dropdown-menu').append('<li><a>' + i + '</a></li>');
	}
	$('.ks>.btn-group:eq(0)>.dropdown-menu').append('<li class="divider"></li><li><a>所有类目</a></li>');
	$('.ks>.btn-group:eq(0)>.dropdown-menu>li').not('.divider').click(function(event) {
		$('.ks>.btn-group:eq(1)>button>.text').text('选择题量');
		$(this).parent().prevAll('button').find('.text').text($(this).text());
		var library_len = [10,25,50,100,150,200,250,350,500];
		var len;
		if($(this).text()=='所有类目') {
			len = 0;
			for (var i in library) {
				len += library[i].length;
			}
		}else{
			len = library[$('.ks>.btn-group:eq(0)>button>.text').text()].length;
		}
		$('.ks>.btn-group:eq(1)>.dropdown-menu').html('');
		for (var i = 0; i < library_len.length; i++) {
			if(library_len[i]<len) {
				$('.ks>.btn-group:eq(1)>.dropdown-menu').append('<li len=' + library_len[i] + '><a>挑战' + library_len[i] + '题</a></li>');
			}
		}
		$('.ks>.btn-group:eq(1)>.dropdown-menu').append('<li class="divider"></li><li len=' + len + '><a>挑战所有题目（' + len + '题）</a></li>');
		if(len>(library[library.length-1]+1)) {
			$('.ks>.btn-group:eq(1)>.dropdown-menu>li:last').addClass('disabled')
		}
		$('.ks>.btn-group:eq(1)>.dropdown-menu>li').not('.divider,.disabled').click(function(event) {
			$(this).parent().prevAll('button').find('.text').text($(this).text());
			$(this).parent().prevAll('button').find('.text').attr('len', $(this).attr('len'));
		});
	});
}
});


