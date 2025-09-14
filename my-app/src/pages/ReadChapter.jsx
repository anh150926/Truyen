import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { novels } from '../services/novels';
import ChapterNavigator from '../components/ChapterNavigator';

export default function ReadChapter() {
  const { novelId, chapterIndex } = useParams();
  const id = Number(novelId);
  const idx = Number(chapterIndex);
  const novel = useMemo(()=>novels.find(n => n.id === id), [id]);
  const chapter = novel?.chapterList?.[idx];

  React.useEffect(()=>{
    if (!novel || !chapter) return;
    const raw = localStorage.getItem('readingHistory') || '{}';
    let hist = {};
    try { hist = JSON.parse(raw) } catch {}
    hist[novel.id] = { chapterIndex: idx, chapter: chapter.chapter };
    localStorage.setItem('readingHistory', JSON.stringify(hist));
  }, [novel, chapter, idx]);

  if (!novel || !chapter) return <div className="chapter-content"><p>Chương không có nội dung!</p></div>;

  return (
    <div className="chapter-content">
      <h2 id="chapter-title">{novel.title} - {chapter.chapter}</h2>
      <p id="chapter-text">{chapter.content}</p>
      <ChapterNavigator novelId={novel.id} current={idx} total={novel.chapterList.length} />
    </div>
  );
}
