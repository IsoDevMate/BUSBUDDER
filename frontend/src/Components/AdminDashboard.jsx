// DashboardLayout.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.nav`
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
`;

const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SidebarListItem = styled.li`
  margin: 15px 0;
`;

const SidebarLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const Header = styled.header`
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const MainContent = styled.main`
  margin-top: 20px;
`;

const DashboardLayout = () => {
  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarList>
          <SidebarListItem><SidebarLink to="/buses">Bus Management</SidebarLink></SidebarListItem>
          <SidebarListItem><SidebarLink to="/routes">Route Management</SidebarLink></SidebarListItem>
          <SidebarListItem><SidebarLink to="/schedules">Schedule Management</SidebarLink></SidebarListItem>
          <SidebarListItem><SidebarLink to="/pays">Payment Management</SidebarLink></SidebarListItem>
        </SidebarList>
      </Sidebar>
      <Content>
        <Header>
          <h1>Admin Dashboard</h1>
        </Header>
        <MainContent>
          <Outlet />
        </MainContent>
      </Content>
    </DashboardContainer>
  );
};

export default DashboardLayout;
