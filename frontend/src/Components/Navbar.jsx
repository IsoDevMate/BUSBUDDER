import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: white;
  padding: 1rem 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 50;
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.div`
  background-color: #4c51bf;
  border-radius: 50%;
  padding: 0.5rem;
  margin-right: 0.5rem;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4c51bf;
`;

const NavLinks = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    gap: 1.5rem;
  }
`;

const NavLink = styled(Link)`
  color: #4c51bf;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    color: #718096;
  }
`;

const MobileMenuIcon = styled.div`
  display: block;
  color: #4c51bf;
  font-weight: bold;
  font-size: 50px;
  cursor: pointer;
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenuContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 0;
  top: 100%;
`;

const MobileMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 768px) {
    display: none;
  }
`;

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Nav>
      <Container>
        <LogoContainer>
          <LogoIcon>
            <span style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}>AT</span>
          </LogoIcon>
          <LogoText>AMAAM TRAVELS</LogoText>
        </LogoContainer>
        {/* <NavLinks>
          <NavLink to="/home" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About Us</NavLink>
          <NavLink to="/fleet" onClick={closeMenu}>Our Fleet</NavLink>
          <NavLink to="/testimonials" onClick={closeMenu}>Testimonials</NavLink>
        </NavLinks> */}
        <MobileMenuIcon onClick={toggleMenu}>
          ☰
        </MobileMenuIcon>
      </Container>

      {isMenuOpen && (
        <MobileMenuContainer>
          <MobileMenu isOpen={isMenuOpen}>
            {/* <NavLink to="/home" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About Us</NavLink>
            <NavLink to="/fleet" onClick={closeMenu}>Our Fleet</NavLink>
            <NavLink to="/testimonials" onClick={closeMenu}>Testimonials</NavLink> */}
          </MobileMenu>
        </MobileMenuContainer>
      )}
    </Nav>
  );
};

export default Navbar;
