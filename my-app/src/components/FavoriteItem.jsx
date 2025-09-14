import React from 'react';
import { Link } from 'react-router-dom';

export default function FavoriteItem({ novel, onRemove }) {
  return (
    <div className="favorite-item">
      <img src={novel.image} alt={novel.title} />
      <div>
        <h3><Link to={`/novel/${novel.id}`}>{novel.title}</Link></h3>
        <p>Chương {novel.chapters} | {novel.status}</p>
      </div>
      <button className="remove-favorite-btn" onClick={() => onRemove(novel.id)}>Xóa</button>
    </div>
  );
}
