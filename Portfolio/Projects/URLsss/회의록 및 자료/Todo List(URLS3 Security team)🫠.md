# **Todo List(URLS3 Security team)🫠
- [ ] **XSS(Cross-Site Scripting)**
	- [ ] setting up a web application firewall(WAP)
	- [ ] Using http header
	- [ ] https://blog.techguard.com/how-to-prevent-xss-in-python-based-web-applications
	- [ ] https://www.stackhawk.com/blog/django-xss-examples-prevention/
- [ ] **Malware**
	- [ ] virus
	- [ ] ransomware
	      https://cheapsslsecurity.com/blog/how-to-prevent-malware-attacks/
- [ ] **Session Hijacking and Man-in-the-Middle Attacks**
	- [ ] **HSTS**
		- [ ] Using Django Security middleware
		- [ ] Using http header 
- [ ] **Phishing**(no plans yet)
- [ ] **Path traversal**(no plans yet)
- [ ] **Local file inclusion**(no plans yet)
- [ ] **XML external entity (XXE)**(no plans yet)
- [ ] **SSL /TLS**
	- [ ] Cryptography
	- [ ] https://kaizen8501.tistory.com/147
	- [ ] setting django ssl server https://intrepidgeeks.com/tutorial/apply-django-ssl
	- [ ] CA(인증기관) 인증서 발급 받아서 사용(도메인 필요함)
- [ ] **https**
- [ ] 상대방의 js파일 포함 http 통신 자체를 검사해야함(찾아보기)
	- [ ] http://www.ktword.co.kr/test/view/view.php?m_temp1=3132
	- [ ] SSL 유효성 검사 https://stackoverflow.com/questions/1087227/validate-ssl-certificates-with-python
	- [ ] 추가 자료 검색은 키워드 : validate ssl certificate django 로 하면 됨
	- [ ] django http response https://docs.djangoproject.com/en/4.1/ref/request-response/


## **Tech Stack**💻
- **These tools are what we can use to prepare for unexpected attacks.**
	With python hidden Libs
	->Link: https://towardsdatascience.com/5-hidden-python-libraries-for-cyber-security-e83928777a95
	Nmap(To check network status)
	->Link: https://pypi.org/project/python-nmap/
	Scapy(to get additional list of mismatched (unanswered) packets)
	->Link: https://scapy.readthedocs.io/en/latest/introduction.html
	Cryptography (for encryption)
	->Link: https://www.rapid7.com/fundamentals/types-of-attacks/

Django Security middleware 
https://docs.djangoproject.com/en/4.1/ref/middleware/#module-django.middleware.security

Using http header
https://blog.heroku.com/using-http-headers-to-secure-your-site

## **FireWall** 👨‍💻
I think building firewall our own in seriously difficult, so we need to use library someone made.
If we user fire wall, we can prevent ***malware** attacks at start
https://github.com/0xInfection/Awesome-WAF#operation-modes
This library got 4600 Stars✨

Or use this library https://github.com/EnableSecurity/wafw00f#how-do-i-install-it . This library got 3600 stars✨ and it has simple discriptions

## **Schedules** 👨‍💻
- [ ] Build WAF with library we choosed
- [ ] Start with setting http headers
- [ ] getting TLS(SSL) key
- [ ] Making policy for our website
- [ ] Find out how to check the http communication itself, including the user's js file.
- [ ] and so on...

https://5xjin.github.io/blog/react_jwt_router/