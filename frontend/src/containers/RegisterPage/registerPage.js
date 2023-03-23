import React, { useState, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

export const RegisterPage = (props) => {


	const firstname = useRef()
	const lastname = useRef()

	const email = useRef()
	const password = useRef()
	const confirmPassword = useRef()
	const [error, setError] = useState('')
	const [loading, setLoading]  = useState(false); 

	const history = useHistory();

	const { register, currentUser } = useAuth()

	async function handleSubmit(e) {
		e.preventDefault();

		if (password.current.value !== confirmPassword.current.value) {
			return setError('Passwords do not match');
		}

		try {
			setError('')
			setLoading(true)
			await register(email.current.value, password.current.value, firstname.current.value, lastname.current.value)
			history.push('/contacts')
		} catch(error) {
			console.log(error.message)
			setError(error.message)
		}
		setLoading(false)
		

	}

	return (
		<>
			<nav className="navbar fixed-top navbar-dark bg-dark justify-content-center">
				<h1 className="navbar-brand" href="#">Appointment Planner</h1>
			</nav>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Sign Up</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="first-name">
							<Form.Label>First Name</Form.Label>
							<Form.Control type='text' ref={firstname} required></Form.Control>
						</Form.Group>

						<Form.Group id="last-name">
							<Form.Label>Last Name</Form.Label>
							<Form.Control type='text' ref={lastname} required></Form.Control>
						</Form.Group>

						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' ref={email} required></Form.Control>
						</Form.Group>

						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' ref={password} required></Form.Control>
						</Form.Group>

						<Form.Group id="password-confirm">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type='password' ref={confirmPassword} required></Form.Control>
						</Form.Group>

						<Button disabled={loading} style={{marginTop: '20px'}} className="w-100" type="submit">Sign Up</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Already have an account? <Link to="/login">Log In</Link>
			</div>
		</>
	);
};