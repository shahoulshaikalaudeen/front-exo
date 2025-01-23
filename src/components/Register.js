import React, { useState } from 'react';
import axios from '../services/api'; // Service pour effectuer des requêtes HTTP

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "L'email est requis.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "L'email n'est pas valide.";
    if (!formData.password) newErrors.password = 'Le mot de passe est requis.';
    if (formData.password.length < 6) newErrors.password = 'Le mot de passe doit comporter au moins 6 caractères.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await axios.post('/users/register', formData);
      setSuccess(response.data.message);
      setFormData({ email: '', password: '' }); // Réinitialiser le formulaire
    } catch (error) {
      setErrors({ server: error.response?.data?.error || 'Erreur lors de l\'inscription.' });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Inscription</h2>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {errors.server && <p style={{ color: 'red' }}>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
