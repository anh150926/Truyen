import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { novels } from '../services/novels';
import { useCart } from '../context/CartContext';
import { toggleFavorite, getFavorites } from '../services/favoriteService';

export default function NovelDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const novelId = Number(id);
  const novel = useMemo(()=>novels.find(n => n.id === novelId), [novelId]);
  const { add } = useCart();
  const [ratings, setRatings] = useState(()=>JSON.parse(localStorage.getItem(`ratings_${novelId}`) || '[]'));
  const [comments, setComments] = useState(()=>JSON.parse(localStorage.getItem(`comments_${novelId}`) || '[]'));
  const [favList, setFavList] = useState(getFavorites());

  if (!novel) return <p>Không tìm thấy truyện.</p>;

  const avgRating = ratings.length ? (ratings.reduce((s,r)=>s+r,0)/ratings.length).toFixed(1) : '0.0';

  const handleRate = (r) => {
    const updated = [...ratings, r];
    setRatings(updated);
    localStorage.setItem(`ratings_${novelId}`, JSON.stringify(updated));
  };

  const handleComment = (txt) => {
    if (!txt.trim()) return;
    const updated = [...comments, { text: txt.trim(), time: new Date().toLocaleString('vi-VN') }];
    setComments(updated);
    localStorage.setItem(`comments_${novelId}`, JSON.stringify(updated));
  };

  const onToggleFavorite = () => {
    const f = toggleFavorite(novelId);
    setFavList(f);
  };

  return (
    <div className="novel-detail">
      <img src={novel.image} alt={novel.title} />
      <div className="novel-info">
        <h1 id="novel-title">{novel.title}</h1>
        <p><strong>Trạng Thái:</strong> {novel.status}</p>
        <p><strong>Tác Giả:</strong> {novel.author}</p>
        <p><strong>Lượt Xem:</strong> {novel.views}</p>
        <p><strong>Thể Loại:</strong> {(novel.genres||[]).join(', ')}</p>
        <p><strong>Đánh Giá:</strong> {avgRating} / 5</p>
        <button className="read-btn" onClick={()=>nav(`/read/${novel.id}/0`)}>Đọc Từ Đầu</button>
        <button className="favorite-btn" onClick={onToggleFavorite}>{favList.includes(novelId) ? 'Bỏ yêu thích' : 'Yêu thích'}</button>
        <button className="cart-btn" onClick={()=>add(novel.id)}>Thêm vào giỏ hàng</button>
      </div>

      <div className="description">
        <h2>Mô Tả</h2>
        <p>{novel.description}</p>
      </div>

      <div className="rating-summary">
        <h2>Đánh giá truyện</h2>
        <div className="rating-number">{avgRating}</div>
        <div className="stars">★★★★★</div>
        <div className="total-ratings">{ratings.length} đánh giá</div>
      </div>

      <div className="user-rating">
        <h2>Đánh giá của bạn</h2>
        <div className="stars-input">
          {[1,2,3,4,5].map(s => (
            <span key={s} className="star" onClick={()=>handleRate(s)}>★</span>
          ))}
        </div>
        <button className="submit-btn" onClick={()=>handleRate(5)}>Gửi đánh giá 5★</button>
      </div>

      <div className="comment-section">
        <h2>Bình luận</h2>
        <CommentBox onSubmit={handleComment} />
        <div className="comment-list">
          {comments.length === 0 ? <p className="no-comments">Chưa có bình luận nào</p> :
            comments.map((c,i)=>(
              <div key={i} className="comment-item">
                <div className="comment-avatar">U</div>
                <div>
                  <div>{c.text}</div>
                  <small>{c.time}</small>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className="chapter-list">
        <h2>Danh Sách Chương</h2>
        <ul id="chapter-list">
          {(novel.chapterList||[]).map((ch, idx)=>(
            <li key={idx}>
              <Link to={`/read/${novel.id}/${idx}`}>{ch.chapter}</Link>
              <span>{ch.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CommentBox({ onSubmit }) {
  const [val, setVal] = useState('');
  return (
    <div className="comment-form">
      <textarea value={val} onChange={e=>setVal(e.target.value)} placeholder="Viết bình luận..."></textarea>
      <button className="submit-btn" onClick={()=>{onSubmit(val); setVal('');}}>Gửi bình luận</button>
    </div>
  );
}
