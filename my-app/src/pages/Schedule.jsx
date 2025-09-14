import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mockReleaseSchedule = {
  '2025-07-09': [
    { id: 2, title: 'Vũ Động Càn Khôn: Chương 11', image: 'https://th.bing.com/th/id/OIP.xaKahdQoO5m48Qd27pIp3wAAAA?r=0&rs=1&pid=ImgDetMain', status: 'sắp ra mắt' },
    { id: 6, title: 'Quỷ Bí chi Chủ: chương 11', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2BVvY6URt_WQV5FQugrSh0J_EMbe2O7q6KZH6oI_alUNE5YeHZrorGVY0Y6RzzIcsIuM&usqp=CAU', status: 'sắp ra mắt' },
    { id: 8, title: 'Già Thiên: Chương 11', image: 'https://i.pinimg.com/736x/34/3b/7a/343b7acd7ca7fd4b5be5a8985a7baf77.jpg', status: 'Sắp ra mắt' }
  ]
};

function todayISO() {
  const t = new Date();
  const y = t.getFullYear();
  const m = String(t.getMonth()+1).padStart(2,'0');
  const d = String(t.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}

export default function Schedule() {
  const [date, setDate] = useState(todayISO());
  const stories = mockReleaseSchedule[date] || [];
  return (
    <div className="schedule-content">
      <div className="schedule-header">
        <h2>Lịch ra mắt</h2>
      </div>
      <div className="schedule-filter">
        <label>Chọn ngày:</label>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <button onClick={()=>setDate(date)}>Xem</button>
      </div>
      <div className="schedule-list">
        {stories.length === 0 ? <p>Không có truyện nào ra mắt vào ngày {date}.</p> : stories.map((s,i)=>(
          <Link className="novel-item" key={i} to={`/novel/${s.id}`}>
            <img src={s.image} alt={s.title} />
            <h3>{s.title}</h3>
            <p>{s.status}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
