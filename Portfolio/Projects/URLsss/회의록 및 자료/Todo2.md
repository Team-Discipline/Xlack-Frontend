Web Application Firewall에 대한 조사가 좀 더 필요한 관계로 순서를 변경합니다.

1. XSS - Cross site scipting 공격 해결(종현)
	- 특정 요소들을 회피하는 방향으로 해결(escaping specific characters)
	- django Automatic HTML escaping [Link](https://docs.djangoproject.com/en/4.0/ref/templates/language/#automatic-html-escaping)
2. Clickjacking protection(정한)
	- django는 clickjacking 을 보호하는 기능을 갖고 있음( `X-Frame-Options middleware`)
	- django security middleware [Here](https://docs.djangoproject.com/en/4.0/ref/middleware/#module-django.middleware.security) 
	- [`<frame>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/frame), [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe), [`<embed>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed) or [`<object>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object) 요소를 검사해야함
3. Enforcing SSL/HTTPS(한별)
	1. `SECURE_SSL_REDIRECT`  [Here](https://docs.djangoproject.com/en/4.0/ref/settings/#std:setting-SECURE_SSL_REDIRECT)
	2. `SECURE_PROXY_SSL_HEADER`  [Here](https://docs.djangoproject.com/en/4.0/ref/settings/#std:setting-SECURE_PROXY_SSL_HEADER)
	3. HSTS
4. HSTS
	1. [HTTP Strict Transport Security](https://docs.djangoproject.com/en/4.0/ref/middleware/#http-strict-transport-security)
	2. [`SECURE_HSTS_SECONDS`](https://docs.djangoproject.com/en/4.0/ref/settings/#std:setting-SECURE_HSTS_SECONDS) and [`SECURE_HSTS_INCLUDE_SUBDOMAINS`](https://docs.djangoproject.com/en/4.0/ref/settings/#std:setting-SECURE_HSTS_INCLUDE_SUBDOMAINS)
	3. Secure Cookie [`SESSION_COOKIE_SECURE`](https://docs.djangoproject.com/en/4.0/ref/settings/#std:setting-SESSION_COOKIE_SECURE) and [`CSRF_COOKIE_SECURE`](https://docs.djangoproject.com/en/4.0/ref/settings/#std:setting-CSRF_COOKIE_SECURE)
~~5. 비밀번호 암호화 하여 저장(?)~~
6. WAF
7. scheme 검사하기


참고:
Server side web application security
https://developer.mozilla.org/en-US/docs/Web/Security

Django working with form
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Forms

[[urls3]]