import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../common/Header/Header';
import Footer from '../common/Footer/Footer';
import styled from 'styled-components';

const MainContent = styled.main`
  min-height: calc(100vh - 160px); // Adjust based on header/footer height
  padding: ${({ theme }) => theme.spacing.medium} 0;
`;

const Layout = () => {
  return (
    <>
      <Header />
      <MainContent>
        <Container fluid>
          <Row>
            <Col>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </MainContent>
      <Footer />
    </>
  );
};

export default Layout; 