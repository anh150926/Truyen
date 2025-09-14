import React from 'react';
import { Link } from 'react-router-dom';

export default function NovelCard({ novel }) {
  return (
    <div className="novel-card">
      <Link to={`/novel/${novel.id}`}>
        <img src={novel.image} alt={novel.title} />
        <h3>{novel.title}</h3>
        <span className="status">{novel.status}</span>
        <p>Chương {novel.chapters}</p>
      </Link>
    </div>
  );
}
