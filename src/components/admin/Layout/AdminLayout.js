import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useAuth } from '../../../contexts/AuthContext';

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  width: 250px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.large};
`;

const MainContent = styled.main`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray};
  padding: ${({ theme }) => theme.spacing.large};
`;

function AdminLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <LayoutWrapper>
      <Sidebar>
        <AdminSidebar />
      </Sidebar>
      <div style={{ flex: 1 }}>
        <AdminHeader />
        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </LayoutWrapper>
  );
}

export default AdminLayout; 