/**
 * Q.iframe_uploader Library
 * отправка формы по средставм iframe (как бэ AJAX 90х)
 *
 * @author Sokolov Innokenty, <i.sokolov@temamedia.ru>
 */

if (!Q) var Q = {};

Q.iframe_uploader = {

	/**
	 * создаём frame с уникальным id
	 * @public
	 * @param {obj} callback функция
	 * @return {str}
	 */
	create_iframe: function(callback) {
		var uid = this.get_uid();

		var div = document.createElement('div');
		div.innerHTML = '<iframe style="display:none" src="about:blank" id="' + uid + '" name="' + uid + '" onload="Q.iframe_uploader.loaded(\'' + uid + '\')"></iframe>';
		document.body.appendChild(div);

		document.getElementById(uid).callback = callback;

		return uid;
	},

	/**
	 * отправляем запрос
	 * @public
	 * @param {obj} self this
	 * @param {obj} callback функция
	 */
	submit: function(self, callback) {
		self.setAttribute('target', Q.iframe_uploader.create_iframe(callback));

		return true;
	},

	/**
	 * ответ сервера
	 * @public
	 * @param {str} uid идентификатор iframe
	 * @return {void}
	 */
	loaded: function(uid) {
		var iframe = document.getElementById(uid);

		var data = iframe.contentDocument ? iframe.contentDocument
			: iframe.contentWindow ? iframe.contentWindow.document
			: window.frames[uid].document;

		if (data.location.href != 'about:blank' && typeof iframe.callback == 'function') {
			iframe.callback(data.body.innerHTML);

			(function (iframe) {
				setTimeout(function() {
					iframe.parentNode.parentNode.removeChild(iframe.parentNode);
				}, 50);
			})(iframe);
		}
	},

	/**
	 * генерим случайный id
	 * @public
	 * @return {str}
	 */
	get_uid: function () {
		var id = 0;

		return function() {
			return 'iframe_uploader_' + id++;
		}
	}()

};