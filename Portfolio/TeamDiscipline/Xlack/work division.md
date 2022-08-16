# FastAPI 에서 Django 로 넘어가기
[[Directory Tree]]
내가 맡은 부분:

-   `User custom - Django` 의 기본 `user setting`은 `user_name`, `user_email` 등 기본적인 방법 밖에 없음 그렇기에 우리 Xlack에 맞는 다양한 부분을 가진 `User` 을 커스텀 해주기
    
-   Github 로그인 Authentication- 이건 진짜 어렵다..`Github`에서 `Oauth2` 의 `application`을 작성해주는 기능이 있는데, 여기 있는 `client id` 랑 `client secret` 을 이용해서 `auth`를 해주는 것이다. 이때 `Django` 의 `Rest Framwork` 의 `Simple JWT`를 이용하기로 하였다(같이 하는 팀원이 `channel,` `chat` 기능을 `jwt` 로 작성하였기 때문에 따라가기로 하였다.)
    

