import ytdl from 'ytdl-core';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const format = searchParams.get('format') || 'mp4';

    // URLの検証
    if (!ytdl.validateURL(url)) {
      return NextResponse.json(
        { error: '無効なYouTube URLです' },
        { status: 400 }
      );
    }

    // 動画情報を取得
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');

    // ダウンロード処理
    if (format === 'mp3') {
      const audioStream = ytdl(url, { quality: 'highestaudio' });
      return new NextResponse(audioStream, {
        headers: {
          'Content-Disposition': `attachment; filename="${title}.mp3"`,
          'Content-Type': 'audio/mpeg',
        },
      });
    } else {
      const videoStream = ytdl(url, { quality: 'highest' });
      return new NextResponse(videoStream, {
        headers: {
          'Content-Disposition': `attachment; filename="${title}.mp4"`,
          'Content-Type': 'video/mp4',
        },
      });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'ダウンロードに失敗しました' },
      { status: 500 }
    );
  }
}
