import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { addProduct, fetchProducts, updateProducts } from '../../features/slices/productsSlice'; // Adjust the import path as needed

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  image: Yup.string().required('Image URL is required').url('Must be a valid URL'),
});

const categories = [
  "Men's Clothing",
  "Women's Clothing",
  "Electronics",
  "Jewelry"
];

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { allProducts, filteredProducts, error } = useSelector(state => state.products);

  const [form, setForm] = useState({
    id: null,
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = async () => {
    try {
      await schema.validate(form, { abortEarly: false });
      return {};
    } catch (validationErrors) {
      let newErrors = {};
      validationErrors.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      return newErrors;
    }
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    const validationErrors = await validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isEditing) {
      // Update product
      const updatedProducts = allProducts.map(product =>
        product.id === form.id ? { ...product, ...form, price: parseFloat(form.price) } : product
      );
      dispatch(updateProducts(updatedProducts));
      setIsEditing(false);
      alert('Product updated successfully');
    } else {
      const nextId = allProducts.length > 0 ? Math.max(...allProducts.map(p => p.id)) + 1 : 1;
      
      const newProduct = {
        id: nextId,
        title: form.title,
        price: parseFloat(form.price),
        description: form.description,
        category: form.category,
        image: form.image
      };
      
      dispatch(addProduct(newProduct));
      alert('Product added successfully');
    }

    setForm({
      id: null,
      title: '',
      price: '',
      description: '',
      category: '',
      image: ''
    });
    setErrors({});
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
  };

  const handleDelete = (productId) => {
    const updatedProducts = allProducts.filter(product => product.id !== productId);
    dispatch(updateProducts(updatedProducts));
    alert('Product deleted successfully');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{isEditing ? 'Edit Product' : 'Add New Product'}</h1>
      <form onSubmit={handleAddOrUpdateProduct} style={styles.form}>
        {Object.keys(schema.fields).map(field => (
          <div key={field} style={styles.formGroup}>
            <label style={styles.label}>{capitalizeFirstLetter(field)}:</label>
            {field === 'category' ? (
              <select
                name={field}
                value={form[field]}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            ) : (
              <input
                type={field === 'price' ? 'number' : 'text'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                style={styles.input}
              />
            )}
            {errors[field] && <span style={styles.error}>{errors[field]}</span>}
          </div>
        ))}
        <button type="submit" style={styles.button}>
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </form>
      {error ? (
        <p style={styles.error}>Error loading products...</p>
      ) : (
        <div style={styles.cardsContainer}>
          {filteredProducts.map(product => (
            <div key={product.id} style={styles.card}>
              <img src={product.image} alt={product.title} style={styles.cardImage} />
              <h2 style={styles.cardTitle}>{product.title}</h2>
              <p style={styles.cardPrice}>${product.price.toFixed(2)}</p>
              <p style={styles.cardDescription}>{product.description}</p>
              <button onClick={() => handleEdit(product)} style={styles.editButton}>Edit</button>
              <button onClick={() => handleDelete(product.id)} style={styles.deleteButton}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  form: {
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    textAlign: 'center',
    flex: '1 1 calc(33.333% - 20px)',
    backgroundColor: '#fff',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
  },
  cardImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '4px'
  },
  cardTitle: {
    fontSize: '1.2em',
    margin: '10px 0',
    color: '#333'
  },
  cardPrice: {
    fontSize: '1em',
    margin: '10px 0',
    color: '#007bff'
  },
  cardDescription: {
    fontSize: '0.9em',
    margin: '10px 0',
    color: '#666'
  },
  editButton: {
    padding: '8px 12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginRight: '10px'
  },
  deleteButton: {
    padding: '8px 12px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  error: {
    color: '#f44336',
    fontSize: '14px',
    marginTop: '5px',
    display: 'block'
  }
};

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default AdminProducts;
