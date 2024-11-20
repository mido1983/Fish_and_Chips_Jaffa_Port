import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UnauthorizedAccess from '../common/UnauthorizedAccess';

function RoleGuard({ children, allowedRoles = [] }) {
  const { user } = useAuth();

  if (!allowedRoles.includes(user?.role)) {
    return <UnauthorizedAccess />;
  }

  return children;
}

export default RoleGuard; 