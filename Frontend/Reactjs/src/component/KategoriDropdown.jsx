import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';

function CategoryDropdown({ onKategoriChange }) {
  const [username, setUsername] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedUsername = Cookies.get('username')
        if (storedUsername) {
            setUsername(storedUsername)
        }

    axios.get(`http://localhost:5000/kategori/${storedUsername}`) // Adjust the URL to match your API endpoint
      .then((response) => {
        console.log(storedUsername)
        console.log(response.data.data)
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleKategoriChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    // Call the callback function to send the selected value to the parent
    onKategoriChange(selectedValue);
  };

  return (
    <div>
      <select
        id="categoryDropdown"
        className="form-control"
        value={selectedCategory}
        onChange={handleKategoriChange}
      >
        <option value="">Select...</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id_kategori}>
            {category.nama_kategori}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryDropdown;
