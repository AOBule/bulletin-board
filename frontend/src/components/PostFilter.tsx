import React from 'react';
import '../styles/PostFilter.scss';

interface PostFilterProps {
  filters: { category: string; startDate: string; endDate: string };
  setFilters: (filters: { category: string; startDate: string; endDate: string }) => void;
}

const PostFilter: React.FC<PostFilterProps> = ({ filters, setFilters }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="post-filter">
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={filters.category}
        onChange={handleChange}
      />
      <input
        type="date"
        name="startDate"
        value={filters.startDate}
        onChange={handleChange}
      />
      <input
        type="date"
        name="endDate"
        value={filters.endDate}
        onChange={handleChange}
      />
    </div>
  );
};

export default PostFilter;
