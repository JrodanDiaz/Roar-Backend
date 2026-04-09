## Video Routes

Get "For you page" feed of videos using a simple recommendation algorithm
GET /api/videos/
{
    "videos": [
        {
            "id": 2,
            "user_id": 2,
            "key": "videos/1774159425783-basketball_dunk.mp4",
            "title": "Dunked on",
            "description": "W camera woman",
            "duration_seconds": null,
            "width": null,
            "height": null,
            "created_at": "2026-03-22T07:12:10.597Z",
            "username": "jordan",
            "like_count": "1",
            "comment_count": "8",
            "is_liked": false,
            "score": 163.94789275644524,
            "url": "https://s3-roar-165777654255-us-east-1-an.s3.us-east-1.amazonaws.com/videos/1774159425783-basketball_dunk.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIASNGI6IHXT4LJU5EG%2F20260409%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260409T222446Z&X-Amz-Expires=60&X-Amz-Signature=b1382f24fe0faa11a6caed50bee8e07adf892e9628aae43d0d282219545c6913&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
        }
            ]
}

Get the presigned upload URL from AWS S3 to upload video directly
GET /api/videos/presigned-url

Save video data to local database (NOT actual video file)
POST /api/videos/

Get specific video
GET /api/videos/:videoId
