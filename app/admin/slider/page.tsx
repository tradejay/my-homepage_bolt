'use client';

import { useState } from 'react';

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

export default function SliderManagement() {
  const [slides, setSlides] = useState<Slide[]>([
    { id: 1, image: '/images/slide1.jpg', title: '슬라이드 1', description: '설명 1' },
    { id: 2, image: '/images/slide2.jpg', title: '슬라이드 2', description: '설명 2' }
  ]);

  const [newSlide, setNewSlide] = useState<Slide>({ id: 0, image: '', title: '', description: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setNewSlide({ ...newSlide, image: imageUrl });
    }
  };

  const addSlide = () => {
    if (!newSlide.image || !newSlide.title || !newSlide.description) return;
    setSlides([...slides, { ...newSlide, id: Date.now() }]);
    setNewSlide({ id: 0, image: '', title: '', description: '' });
    setImageFile(null);
  };

  const deleteSlide = (id: number) => {
    setSlides(slides.filter(slide => slide.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">슬라이드 컨텐츠 관리</h2>
      
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 rounded w-full mb-2"
        />
        {newSlide.image && <img src={newSlide.image} alt="Preview" className="w-20 h-20 object-cover mb-2" />}
        <input
          type="text"
          placeholder="제목"
          value={newSlide.title}
          onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="설명"
          value={newSlide.description}
          onChange={(e) => setNewSlide({ ...newSlide, description: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <button onClick={addSlide} className="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
      </div>

      <div>
        {slides.map(slide => (
          <div key={slide.id} className="border p-4 rounded mb-2 flex justify-between items-center">
            <div>
              <img src={slide.image} alt={slide.title} className="w-20 h-20 object-cover" />
              <h3 className="font-bold">{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
            <button onClick={() => deleteSlide(slide.id)} className="bg-red-500 text-white px-4 py-2 rounded">삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
}