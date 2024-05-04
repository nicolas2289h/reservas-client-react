import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";

const initialUserData = {
    username: '',
    password: ''
}

const URL_BASE = 'https://cosmic-denim-farm.glitch.me'

const FormLogin = () => {
    const [userData, setUserData] = useState(initialUserData)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(userData)
        setLoading(true)
        axios.post(`${URL_BASE}/login`, userData)
            .then(response => {
                const { token, username } = response.data
                localStorage.setItem('token', token)
                localStorage.setItem('username', username)
                navigate('/reservas')
            })
            .catch(() => {
                setError("Error en las credenciales")
            })
            .finally(() => setLoading(false))
    }

    const handleChange = e =>
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12 mx-auto">
                    <h3 className="text-center mt-4">Inicio de Sesión</h3>
                    <form className="mx-auto mt-4 border p-4 rounded white-shadow" onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="" htmlFor="username"><i className="bi bi-people-fill"></i> Username</label>
                            <input className="form-control" type="text" name="username" id="username" onChange={handleChange} required placeholder="nico2024" autoFocus />
                        </div>
                        <div className="mb-3">
                            <label className="" htmlFor="password"><i className="bi bi-shield-lock"></i> Password</label>
                            <input className="form-control" type="password" name="password" id="password" onChange={handleChange} placeholder="nico2024" />
                        </div>
                        <div className="">
                            <button disabled={loading} className="btn btn-outline-primary w-100 text-white" type="submit">
                                {loading ? <BeatLoader className='mx-auto' size={10} color="#fff" /> : 'Iniciar Sesión'}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-3">
                        <p>No tengo cuenta. <Link className="text-decoration-none" to="/register"><span className="span links-form text-white text-shadow">Registrarme</span></Link></p>
                    </div>
                    {error && <p className="text-center mensajeError">{error}</p>}
                </div>
            </div>
        </div>
    )
}

export default FormLogin;