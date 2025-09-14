import React from 'react';
import NovelCard from './NovelCard';

export default function NovelList({ novels }) {
  return (
    <div className="novel-list">
      {novels.map(n => <NovelCard key={n.id} novel={n} />)}
    </div>
  );
}
