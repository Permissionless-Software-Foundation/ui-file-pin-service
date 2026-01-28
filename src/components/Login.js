import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';
import { authUser } from '../services/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp';

function Login({ appData }) {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    // Submit Auth request
    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        const authRes = await authUser({ email, password });
  
        // Update user data state
        appData.setUserData(authRes);
        
        // Navigate to dashboard after successful login
        navigate('/');
      } catch (error) {
        toast.error("Login Error : " + error.message);
      }
    };

  if (isSignup) {
    return <SignUp appData={appData} onSwitchToSignIn={() => setIsSignup(false)} />;
  }

  return (
    <Container fluid style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', padding: '20px' }}>
      <Card style={{ width: '100%', maxWidth: '450px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', border: 'none', borderRadius: '8px', backgroundColor: '#ffffff' }}>
        <Card.Body style={{ padding: '40px' }}>
          <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '30px', fontSize: '24px', color: '#000000' }}>
            Sign in
          </h2>
          
          <Form>
            <>
              <Form.Group className="mb-3" style={{ marginBottom: '20px' }}>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: '#f9fafb',
                    color: '#6b7280',
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" style={{ marginBottom: '20px', position: 'relative' }}>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    padding: '12px 16px',
                    paddingRight: '45px',
                    fontSize: '16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'transparent',
                    padding: '4px',
                    color: '#6b7280',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </Form.Group>

              <Button
                variant="primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  marginTop: '10px',
                  backgroundColor: '#7c3aed',
                  borderColor: '#7c3aed',
                  color: '#ffffff',
                }}
                onClick={handleSubmit}
              >
                Sign in
              </Button>

              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  type="button"
                  style={{
                    color: '#6b7280',
                    textDecoration: 'none',
                    fontSize: '14px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  Forgot your password?
                </button>
              </div>

              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <p style={{ color: '#374151', fontSize: '14px', marginBottom: '15px', margin: '0 0 15px 0' }}>
                  Don't have a file-pin-service account?
                </p>
                <Button
                  variant="outline-secondary"
                  onClick={() => setIsSignup(true)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    fontWeight: '500',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    borderColor: '#e5e7eb',
                    color: '#374151',
                  }}
                >
                  Create new account
                </Button>
              </div>
            </>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
