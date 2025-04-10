import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp4');
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    if (!url) return alert('URLを入力してください');
    setIsLoading(true);
    window.open(`/api/download?url=${encodeURIComponent(url)}&format=${format}`);
    setIsLoading(false);
  };

  return (
    <div className="container">
      <Head>
        <title>YouTubeダウンローダー</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>YouTubeダウンローダー</h1>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="YouTubeのURLを貼り付けてください"
        />
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="mp4">MP4 (動画)</option>
          <option value="mp3">MP3 (音声のみ)</option>
        </select>
        <button onClick={handleDownload} disabled={isLoading}>
          {isLoading ? '処理中...' : 'ダウンロード'}
        </button>
      </main>

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        input, select, button {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          font-size: 16px;
        }
        button {
          background: #ff0000;
          color: white;
          border: none;
          cursor: pointer;
        }
        button:hover {
          background: #cc0000;
        }
      `}</style>
    </div>
  );
}
