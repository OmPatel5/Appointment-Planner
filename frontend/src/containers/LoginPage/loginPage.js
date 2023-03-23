import React, { useState, useRef, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

export const LoginPage = (props) => {

	const email = useRef()
	const password = useRef()
	const [error, setError] = useState('')
	const [loading, setLoading]  = useState(false); 
	const history = useHistory()
	const { login, signInWithGoogle } = useAuth()

	async function handleSubmit(e) {
		e.preventDefault();

    	try {
			setError('')
			setLoading(true)
			await login(email.current.value, password.current.value)
			history.push('/contacts')
		} catch(error) {
			console.log(error.message)
			setError(error.message)
		}
		setLoading(false)
		

	}

	async function handleSignInWithGoogle(e) {
		e.preventDefault();
		try {
			setError('');
			setLoading(true);
			await signInWithGoogle();
			history.push('/contacts')
		}

		catch(error) {
			console.log(error.message)
			setError(error.message)
		}
		setLoading(false)
		
	}

	useEffect(() => {
		return () => {
			setError({}); 
		};
	}, []);

	return (
		<>
			<nav className="navbar fixed-top navbar-dark bg-dark justify-content-center">
				<h1 className="navbar-brand" href="#">Appointment Planner</h1>
			</nav>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Log In</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' ref={email} required></Form.Control>
						</Form.Group>

						<Form.Group id="password">
							<Form.Label style={{marginTop:"20px"}}>Password</Form.Label>
							<Form.Control type='password' ref={password} required></Form.Control>
						</Form.Group>

						<Button disabled={loading} className="w-100" style={{marginTop:"20px"}} type="submit">Log In</Button>
					</Form>
					<div className="gogl-btn-container">
						<button disabled={loading} className="google-sign-in" onClick={handleSignInWithGoogle}><img width="20px" style={{marginRight:"8px"}} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />Sign in with Google</button>
					</div>

				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Don't have an account? Get started by <Link to="/register">Signing Up</Link>
			</div>
		</>
	);
};