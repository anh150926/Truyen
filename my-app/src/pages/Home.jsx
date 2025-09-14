import React, { useMemo, useState } from 'react';
import { novels as NOVELS } from '../services/novels';
import NovelList from '../components/NovelList';

const PER_PAGE = 10;

export default function Home() {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('');
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);

  const genres = useMemo(() => {
    const set = new Set();
    NOVELS.forEach(n => (n.genres || []).forEach(g => set.add(g)));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    let arr = NOVELS.filter(n =>
      (n.title.toLowerCase().includes(q.toLowerCase()) ||
       n.description.toLowerCase().includes(q.toLowerCase())) &&
      (genre === '' || (n.genres || []).includes(genre))
    );
    if (sort === 'newest') {
      arr.sort((a,b) => new Date(b.chapterList?.[0]?.date) - new Date(a.chapterList?.[0]?.date));
    } else if (sort === 'oldest') {
      arr.sort((a,b) => new Date(a.chapterList?.[0]?.date) - new Date(b.chapterList?.[0]?.date));
    } else if (sort === 'views') {
      const v = s => parseInt(String(s).replace(/[^0-9]/g,'')) || 0;
      arr.sort((a,b) => v(b.views) - v(a.views));
    } else if (sort === 'rating') {
      const r = s => parseFloat(String(s).split('/')[0]) || 0;
      arr.sort((a,b) => r(b.rating) - r(a.rating));
    }
    return arr;
  }, [q, sort, genre]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1;
  const toShow = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  return (
    <div>
      <div className="search">
        <input placeholder="Tìm truyện..." value={q} onChange={e=>{setQ(e.target.value); setPage(1);}} />
        <button onClick={()=>setPage(1)}>Tìm</button>
      </div>
      <div className="filter">
        <select value={sort} onChange={e=>{setSort(e.target.value); setPage(1);}}>
          <option value="">Sắp xếp</option>
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
          <option value="views">Lượt xem</option>
          <option value="rating">Đánh giá</option>
        </select>
        <select value={genre} onChange={e=>{setGenre(e.target.value); setPage(1);}}>
          <option value="">Thể loại</option>
          {genres.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>
      <NovelList novels={toShow} />
      <div className="pagination" style={{textAlign:'center', margin:'1rem 0'}}>
        <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Trang Trước</button>
        {Array.from({length: Math.min(5,totalPages)}, (_,i)=>{
          let start = Math.max(1, page - 2);
          let idx = start + i;
          if (idx>totalPages) return null;
          return <button key={i} disabled={idx===page} onClick={()=>setPage(idx)}>{idx}</button>;
        })}
        <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>Trang Sau</button>
      </div>
    </div>
  );
}
