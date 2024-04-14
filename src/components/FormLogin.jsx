import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const initialUserData = {
    username: '',
    password: ''
}

const FormLogin = () => {
    const [userData, setUserData] = useState(initialUserData)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login', userData)
            .then(response => {
                const { token, username } = response.data
                localStorage.setItem('token', token)
                localStorage.setItem('username', username)
                navigate('/reservas')
            })
            .catch(error => {
                setError(error.response.data.message)
            });
    }

    const handleChange = e =>
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })

    return (
        <div className="container__login">
            <h3 className="text-center mb-3">Inicio de Sesión</h3>
            <form className="form text-center" onSubmit={handleLogin}>
                <div className="form__username d-flex justify-space-between">
                    <label className="" htmlFor="username"><i className="bi bi-people-fill"></i> Username</label>
                    <input type="text" name="username" id="username" onChange={handleChange} required placeholder="nicolas" autoFocus />
                </div>
                <div className="form__password d-flex justify-space-between">
                    <label className="" htmlFor="password"><i className="bi bi-shield-lock"></i> Password</label>
                    <input type="password" name="password" id="password" onChange={handleChange} placeholder="nicolas" />
                </div>
                <div className="form__iniciarSesion">
                    <button className="btn btn-outline-primary w-100 text-white" type="submit">Iniciar Sesion</button>
                </div>
             </form>

            <div className="text-center mt-3 form__iniciarConGoogle">
                <p>No tengo cuenta. <Link to="/register"><span className="span links-form">Registrarme</span></Link></p>
            </div>
            {error && <p className="text-center mensajeError">{error}</p>}
        </div>
    );

}

export default FormLogin;