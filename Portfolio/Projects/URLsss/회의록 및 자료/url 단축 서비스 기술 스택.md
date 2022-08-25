### 단축 URL 서비스
단축 url 서비스는 URL Direction 기법을 통해 서비스 하는데, 이때 URL Direction 이란 특정 URL 을 요청하면, 다른 URL로 응답하는 기법이다.

우리 사이트의 이름이 URLS 라면, 프로토콜은 https 일 것이고, 이떄 링크는 https://URLS.com/어쩌구 가 될 것이다. 
이때 원본 url이 https://www.youtube.com/watch?v=8spMf4IX7t8&ab_channel=%EC%8A%A4%EB%B8%8C%EC%8A%A4%EB%89%B4%EC%8A%A4SUBUSUNEWS 라면, 우리가 단축한 url은 https://URLS.com/sdkjf 이런 형식이 될 것이다. 
변환을 위해서는 필수적으로 DB서버, AP 서버가 필요한데, AP 서버는 변환을 진행하는 서버이다. 


이때, 우리는 사용자로부터 원본 url을 받고, url을 DB에 삽입하고 해당 Index를 인코딩한다.

**로직 예:**

##### short url 의 생성 원리(인코딩)
```python

# DB에서 반환한 index를 Base62로 인코딩 하는 함수
def base62(index):
	result = ""
	# Base62 인코딩의 기본이 되는 문자들(배열은 상관없이 중복이 없으면 됩니다.)
	words = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

	while index % 62 > 0 or result == "": # index가 62인 경우에도 적용되기 위해 do-while 형식이 되도록 구현했다.
		result = result + words[index % 62]
		index = int(index / 62)

	return result

# URL을 단축 URL로 만드는 함수
def Generate(URL):
	# DB에 URL Insert
	index = DB.insert(URL)
	# URL이 등록 된 Index를 Base62로 인코딩
	shortURL = base62(index)
	# 인코딩 된 정보 DB에 갱신
	DB.update(index, shortURL)

	return shortURL
```
[https://blog.siyeol.com/26]()

##### db에서 처리하는 방식 예
```python
# 서버에 요청을 받았을 때 실행되는 함수
def getRequest(res):
	# DB에서 URL 조회, res.data는 Base62로 인코딩 된 값
	data = DB.select('encoded', res.data) # 테이블의 encoded 컬럼의 res.data인 행을 찾는다.

	if data.error:
		# 해당 결과가 없으면 오류 페이지 리다이렉트
		return response('404')
	else:
		# 결과가 있으면 해당 페이지로 리다이렉트
		return response('302', data.url)
```

이제 우리가 생각해 봐야 할 방식은
크게 두가지로 나뉘는데, 
만약 url이 들어온다면 우리가 랜덤한 문자와 숫자들을 매치해서 고유 index를 만들어 내는 것, 그리고 그 index가 인터넷 창에 입력이 되면 우리 서버가 response로 원본 url을 보내주는것

또 하나는 그 url을 토대로 encoding을 하는것, 62bin 등등..
그리고 response는 똑같이


이때 위의 방법이 가지는 장점은 처음 단축 url을 제작할때 만드는 시간이 아주아주 짧다는 것, 하지만 단점은 db 서버가 방대해지고, 그것은 곧 그 index를 찾는데 시간이 걸릴 수도 있다는 것

두번쨰 방법의 장점은 처음에 제작할때는 오래 걸리지만, 우리 서버가 response를 보낼때는 그저 그 링크를 decoding만 하면 된다는것


[[urls3]]