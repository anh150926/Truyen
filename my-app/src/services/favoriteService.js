import { getJSON, setJSON } from './storage';

export const getFavorites = () => getJSON('favorites', []);

export const toggleFavorite = (novelId) => {
  const f = getFavorites();
  const i = f.indexOf(novelId);
  if (i >= 0) {
    f.splice(i, 1);
  } else {
    f.push(novelId);
  }
  setJSON('favorites', f);
  return f;
};
