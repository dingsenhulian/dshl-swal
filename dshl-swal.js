const swal = require('sweetalert2');
(function (factory) {
	// UMD start
	// https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		module.exports = function( root, jQuery ) {
			if ( jQuery === undefined ) {
				// require('jQuery') returns a factory that requires window to
				// build a jQuery instance, we normalize how we use modules
				// that require this pattern but the window provided is a noop
				// if it's defined (how jquery works)
				if ( typeof window !== 'undefined' ) {
					jQuery = require('jquery');
				}
				else {
					jQuery = require('jquery')(root);
				}
			}
			factory(jQuery);
			return jQuery;
		};
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	var pluginName = 'swalextend';

	function confirm(question,options){
		question = question || '确定要删除该条数据吗?';
		var QA = {
			level: 1,
			question: question,
			danger: function(){
				this.level = 3;
				return this;
			},
			confirm: function(){
				var self = this;
				return new Promise(function(resolve, reject){
					var success = function(){
						swal(
							options.FinishTitle,
							options.FinishInfo,
							'success'
						);
					};
					swal({
						title: question,
						text: options.WarningInfo,
						type: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#22D69D',
						cancelButtonColor: '#FB8678',
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						confirmButtonClass: 'btn',
						cancelButtonClass: 'btn'
					}).then(function () {
						resolve(success);
						// swal(
						// 	'已删除!',
						// 	'您选择的数据已成功删除.',
						// 	'success'
						// );
					}, function (dismiss) {
						// dismiss can be 'cancel', 'overlay',
						// 'close', and 'timer'
						if (dismiss === 'cancel') {
							swal(
								'退出',
								'您的数据是安全的.',
								'error'
							).then(function(){
							});
						}
					});
				});
			}
		};
		return QA;
	};

	$[pluginName] = confirm;

	$.fn[pluginName] = confirm;

	$.extend($[pluginName], {
	});


}));
