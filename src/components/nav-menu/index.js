/*
  This component controlls the navigation menu.

  Inspired from this example:
  https://codesandbox.io/s/react-bootstrap-hamburger-menu-example-rnud4?from-embed
*/

// Global npm libraries
import React, { useState } from 'react'
import { Nav, Navbar, Image } from 'react-bootstrap' // Used for Navbar Style and Layouts .
import { NavLink } from 'react-router-dom' // Used to navigate between routes

// Assets
import Logo from './psf-logo.png'

function NavMenu (props) {
  const { logout, currentPath } = props.appData

  // Navbar state
  const [expanded, setExpanded] = useState(false)

  // Handle click event
  const handleClickEvent = () => {
    // Collapse the navbar
    setExpanded(false)
  }

  return (
    <>
      <Navbar 
        expanded={expanded} 
        onToggle={setExpanded} 
        expand='xxxl' 
        style={{ 
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          padding: '0.75rem 0',
          minHeight: '70px',
          marginBottom: '40px',
        }}
      >
        <Navbar.Brand 
          href='#home' 
          style={{ 
            paddingLeft: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontWeight: '600',
            fontSize: '1.25rem',
            color: '#1f2937',
            textDecoration: 'none',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#7c3aed'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#1f2937'}
        >
          <Image 
            src={Logo} 
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '8px',
              objectFit: 'contain',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          />
          <span style={{ letterSpacing: '-0.02em' }}>UI-File-Pin-Service</span>
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls='responsive-navbar-nav'
          style={{
            border: 'none',
            padding: '0.5rem',
            marginRight: '2rem'
          }}
        />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav 
            className='mr-auto'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%',
              paddingRight: '2rem',
              gap: '1rem'
            }}
          >
            <NavLink
              to='/'
              onClick={handleClickEvent}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '8px',
                color: currentPath === '/' ? '#7c3aed' : '#6b7280',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease-in-out',
                backgroundColor: currentPath === '/' ? '#f3f4f6' : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (currentPath !== '/') {
                  e.currentTarget.style.color = '#7c3aed'
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                }
              }}
              onMouseLeave={(e) => {
                if (currentPath !== '/') {
                  e.currentTarget.style.color = '#6b7280'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              Explorer
            </NavLink>
            <NavLink
              to='/ipfs'
              onClick={handleClickEvent}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '8px',
                color: currentPath === '/ipfs' ? '#7c3aed' : '#6b7280',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.875rem',
                transition: 'all 0.2s ease-in-out',
                backgroundColor: currentPath === '/ipfs' ? '#f3f4f6' : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (currentPath !== '/ipfs') {
                  e.currentTarget.style.color = '#7c3aed'
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                }
              }}
              onMouseLeave={(e) => {
                if (currentPath !== '/ipfs') {
                  e.currentTarget.style.color = '#6b7280'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              IPFS Status
            </NavLink>
            <NavLink
              onClick={logout}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '8px',
                backgroundColor: '#7c3aed',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6d28d9'
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#7c3aed'
                e.currentTarget.style.transform = 'translateY(0px)'
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)'
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'
              }}
            >
              Logout
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavMenu