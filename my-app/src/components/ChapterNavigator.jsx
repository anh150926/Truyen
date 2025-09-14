import React from 'react';
import { Link } from 'react-router-dom';

export default function ChapterNavigator({ novelId, current, total }) {
  const prevIndex = current > 0 ? current - 1 : null;
  const nextIndex = current < total - 1 ? current + 1 : null;
  return (
    <div className="chapter-nav">
      <Link to={prevIndex !== null ? `/read/${novelId}/${prevIndex}` : '#'}>
        <button disabled={prevIndex === null}>Chương trước</button>
      </Link>
      <Link to={`/novel/${novelId}`}><button>Danh sách chương</button></Link>
      <Link to={nextIndex !== null ? `/read/${novelId}/${nextIndex}` : '#'}>
        <button disabled={nextIndex === null}>Chương tiếp</button>
      </Link>
    </div>
  );
}
