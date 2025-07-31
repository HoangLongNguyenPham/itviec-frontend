import { useState } from 'react';
import api from '../api';

function Register() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/accounts/candidate/register', form)
      .then(() => alert('Đăng ký thành công!'))
      .catch(err => alert(err.response.data.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Đăng ký Ứng viên</h2>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required />
      <button type="submit">Đăng ký</button>
    </form>
  );
}
export default Register;
