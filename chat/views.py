from rest_framework import generics, status
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.request import Request
from rest_framework.response import Response

from chat.models import Chat, ChatBookmark
from chat.serializers import ChatSerializer, ChatBookmarkSerializer


class ChatView(generics.ListAPIView):
    """
    count는 전체 레코드의 수
    next, previous는 이전, 이후의 url
    """
    serializer_class = ChatSerializer
    pagination_class = LimitOffsetPagination
    queryset = Chat.objects.all()

    def get_queryset(self):
        chv = self.kwargs.get('channel__hashed_value', None)
        return self.queryset.filter(channel__hashed_value__exact=chv).order_by('-id')

    def get(self, request: Request, *args, **kwargs):
        """
        url query에 `limit`, `offset`을 넣지 않으면 전체 값으로 일반 배열 형태로 결과가 나오고,
        넣었다면 아래 문서와 같이 results에 배열로 값이 들어갑니다.
        `has_bookmarked` field는 오직 "내가 북마크 했는지"만 표시됨으로, true 혹은 false값이 나옵니다.
        """
        q = self.get_queryset()
        page = self.paginate_queryset(q)
        if page is not None:
            s = self.get_serializer(page, many=True)
            return self.get_paginated_response(s.data)
        else:
            s = self.get_serializer(q, many=True)
            for data in s.data[:]:
                try:
                    b = ChatBookmark.objects.get(issuer=self.request.user, chat_id=data['id'])
                except ChatBookmark.DoesNotExist:
                    b = None
                data['has_bookmarked'] = True if b is not None else False
            return Response(s.data)


class ChatBookmarkCreateView(generics.CreateAPIView):
    queryset = ChatBookmark.objects.all()
    serializer_class = ChatBookmarkSerializer

    def post(self, request: Request, *args, **kwargs):
        s = self.get_serializer(data=request.data)
        if s.is_valid():
            chat_id = s.data.get('chat_id')
            chat_bookmark, is_created = ChatBookmark.objects.get_or_create(issuer=request.user, chat_id=chat_id)
            s = self.get_serializer(chat_bookmark)
            return Response(s.data)
        else:
            return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)


class ChatBookmarkDeleteView(generics.DestroyAPIView):
    queryset = ChatBookmark.objects.all()
    serializer_class = ChatBookmarkSerializer

    def delete(self, request: Request, *args, **kwargs):
        chat_id = kwargs.get('chat_id', None)
        chat_bookmark = get_object_or_404(ChatBookmark, issuer=request.user, chat_id=chat_id)
        chat_bookmark.delete()
        return Response(status=status.HTTP_302_FOUND)
