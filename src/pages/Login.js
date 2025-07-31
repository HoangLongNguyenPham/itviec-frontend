import { useState } from 'react';
import api from '../api';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/accounts/candidate/login', form)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        alert('Đăng nhập thành công!');
      })
      .catch(err => alert(err.response.data.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Đăng nhập Ứng viên</h2>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required />
      <button type="submit">Đăng nhập</button>
    </form>
  );
}
export default Login;
