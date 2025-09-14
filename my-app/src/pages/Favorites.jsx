import React, { useMemo, useState } from 'react';
import { novels } from '../services/novels';
import { getFavorites, toggleFavorite } from '../services/favoriteService';
import FavoriteItem from '../components/FavoriteItem';

export default function Favorites() {
  const [fav, setFav] = useState(getFavorites());
  const items = useMemo(()=>fav.map(id => novels.find(n=>n.id===id)).filter(Boolean), [fav]);
  const remove = (id) => setFav(toggleFavorite(id));
  return (
    <div className="favorites-content">
      <h2>Truyện yêu thích</h2>
      <div id="favorites-list">
        {items.length === 0 ? <p>Chưa có truyện yêu thích.</p> : items.map(n=>(
          <FavoriteItem key={n.id} novel={n} onRemove={remove} />
        ))}
      </div>
    </div>
  );
}
