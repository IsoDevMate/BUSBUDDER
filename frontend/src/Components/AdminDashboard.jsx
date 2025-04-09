// // // import React from 'react';
// // // import { Outlet, Link } from 'react-router-dom';
// // // import styled from 'styled-components';

// // // const DashboardContainer = styled.div`
// // //   display: flex;
// // //   height: 100vh;
// // // `;

// // // const Sidebar = styled.nav`
// // //   width: 250px;
// // //   background-color: #f4f4f4;
// // //   padding: 20px;
// // // `;

// // // const SidebarList = styled.ul`
// // //   list-style-type: none;
// // //   padding: 0;
// // // `;

// // // const SidebarListItem = styled.li`
// // //   margin: 15px 0;
// // // `;

// // // const SidebarLink = styled(Link)`
// // //   text-decoration: none;
// // //   color: #333;
// // //   font-weight: bold;
// // // `;

// // // const Content = styled.div`
// // //   flex-grow: 1;
// // //   padding: 20px;
// // // `;

// // // const Header = styled.header`
// // //   border-bottom: 1px solid #ddd;
// // //   padding-bottom: 10px;
// // // `;

// // // const MainContent = styled.main`
// // //   margin-top: 20px;
// // // `;

// // // const DashboardLayout = () => {
// // //   return (
// // //     <DashboardContainer>
// // //       <Sidebar>
// // //         <SidebarList>
// // //           <SidebarListItem><SidebarLink to="/admin/buses">Bus Management</SidebarLink></SidebarListItem>
// // //           <SidebarListItem><SidebarLink to="/admin/routes">Route Management</SidebarLink></SidebarListItem>
// // //           <SidebarListItem><SidebarLink to="/admin/schedules">Schedule Management</SidebarLink></SidebarListItem>
// // //           <SidebarListItem><SidebarLink to="/admin/pays">Payment Management</SidebarLink></SidebarListItem>
// // //         </SidebarList>
// // //       </Sidebar>
// // //       <Content>
// // //         <Header>
// // //           <h1>Admin Dashboard</h1>
// // //         </Header>
// // //         <MainContent>
// // //           <Outlet />
// // //         </MainContent>
// // //       </Content>
// // //     </DashboardContainer>
// // //   );
// // // };

// // // export default DashboardLayout;
// // import React from 'react';
// // import { Outlet, Link } from 'react-router-dom';
// // import styled from 'styled-components';
// // import { FaBus, FaRoute, FaCalendarAlt, FaMoneyBill } from 'react-icons/fa';

// // const DashboardContainer = styled.div`
// //   display: flex;
// //   height: 100vh;
// // `;

// // const Sidebar = styled.nav`
// //   width: 250px;
// //   background-color: #f4f4f4;
// //   padding: 20px;
// //   position: fixed; /* Fix the sidebar position */
// //   height: 100%; /* Make the sidebar full height */
// //   overflow-y: auto; /* Enable vertical scrolling if content overflows */
// // `;

// // const SidebarHeader = styled.div`
// //   font-size: 1.5em;
// //   margin-bottom: 20px;
// //   color: #333;
// // `;

// // const SidebarList = styled.ul`
// //   list-style-type: none;
// //   padding: 0;
// // `;

// // const SidebarListItem = styled.li`
// //   margin: 15px 0;
// //   display: flex;
// //   align-items: center;
// // `;

// // const SidebarIcon = styled.span`
// //   margin-right: 10px;
// // `;

// // const SidebarLink = styled(Link)`
// //   text-decoration: none;
// //   color: #333;
// //   font-weight: bold;
// //   display: flex;
// //   align-items: center;
// // `;

// // const Content = styled.div`
// //   margin-left: 250px; /* Offset content to account for the fixed sidebar */
// //   flex-grow: 1;
// //   padding: 20px;
// // `;

// // // const Header = styled.header`
// // //   border-bottom: 1px solid #ddd;
// // //   padding-bottom: 10px;
// // // `;

// // const MainContent = styled.main`
// //   margin-top: 20px;
// // `;

// // const DashboardLayout = () => {
// //   return (
// //     <DashboardContainer>
// //       <Sidebar>
// //         <SidebarHeader>Admin Dashboard</SidebarHeader>
// //         <SidebarList>
// //           <SidebarListItem>
// //             <SidebarLink to="/admin/buses">
// //               <SidebarIcon><FaBus /></SidebarIcon>
// //               Bus Management
// //             </SidebarLink>
// //           </SidebarListItem>
// //           <SidebarListItem>
// //             <SidebarLink to="/admin/routes">
// //               <SidebarIcon><FaRoute /></SidebarIcon>
// //               Route Management
// //             </SidebarLink>
// //           </SidebarListItem>
// //           <SidebarListItem>
// //             <SidebarLink to="/admin/schedules">
// //               <SidebarIcon><FaCalendarAlt /></SidebarIcon>
// //               Schedule Management
// //             </SidebarLink>
// //           </SidebarListItem>
// //           <SidebarListItem>
// //             <SidebarLink to="/admin/pays">
// //               <SidebarIcon><FaMoneyBill /></SidebarIcon>
// //               Payment Management
// //             </SidebarLink>
// //           </SidebarListItem>
// //         </SidebarList>
// //       </Sidebar>
// //       <Content>
// //         {/* <Header>
// //           <h1>Admin Dashboard</h1>
// //         </Header> */}
// //         <MainContent>
// //           <Outlet />
// //         </MainContent>
// //       </Content>
// //     </DashboardContainer>
// //   );
// // };

// // export default DashboardLayout;
// import React from 'react';
// import { Outlet, Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { FaBus, FaRoute, FaCalendarAlt, FaMoneyBill, FaUsers, FaChartLine, FaCog } from 'react-icons/fa';

// const DashboardContainer = styled.div`
//   display: flex;
//   height: 100vh;
// `;

// const Sidebar = styled.nav`
//   width: 250px;
//   background-color: #f4f4f4;
//   padding: 20px;
//   position: fixed;
//   height: 100%;
//   overflow-y: auto;
// `;

// const SidebarHeader = styled.div`
//   font-size: 1.5em;
//   margin-bottom: 20px;
//   color: #333;
// `;

// const SidebarList = styled.ul`
//   list-style-type: none;
//   padding: 0;
// `;

// const SidebarListItem = styled.li`
//   margin: 15px 0;
//   display: flex;
//   align-items: center;
// `;

// const SidebarIcon = styled.span`
//   margin-right: 10px;
// `;

// const SidebarLink = styled(Link)`
//   text-decoration: none;
//   color: #333;
//   font-weight: bold;
//   display: flex;
//   align-items: center;
// `;

// const Content = styled.div`
//   margin-left: 250px;
//   flex-grow: 1;
//   padding: 20px;
// `;

// const Header = styled.header`
//   border-bottom: 1px solid #ddd;
//   padding-bottom: 10px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const UserProfile = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const UserAvatar = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   margin-right: 10px;
// `;

// const MainContent = styled.main`
//   margin-top: 20px;
// `;

// const DashboardLayout = () => {
//   return (
//     <DashboardContainer>
//       <Sidebar>
//         <SidebarHeader>Admin Dashboard</SidebarHeader>
//         <SidebarList>
//           <SidebarListItem>
//             <SidebarLink to="/admin/buses">
//               <SidebarIcon><FaBus /></SidebarIcon>
//               Bus Management
//             </SidebarLink>
//           </SidebarListItem>
//           <SidebarListItem>
//             <SidebarLink to="/admin/routes">
//               <SidebarIcon><FaRoute /></SidebarIcon>
//               Route Management
//             </SidebarLink>
//           </SidebarListItem>
//           <SidebarListItem>
//             <SidebarLink to="/admin/schedules">
//               <SidebarIcon><FaCalendarAlt /></SidebarIcon>
//               Schedule Management
//             </SidebarLink>
//           </SidebarListItem>
//           <SidebarListItem>
//             <SidebarLink to="/admin/pays">
//               <SidebarIcon><FaMoneyBill /></SidebarIcon>
//               Payment Management
//             </SidebarLink>
//           </SidebarListItem>
//           <SidebarListItem>
//             <SidebarLink to="/admin/users">
//               <SidebarIcon><FaUsers /></SidebarIcon>
//               User Management
//             </SidebarLink>
//           </SidebarListItem>
//           <SidebarListItem>
//             <SidebarLink to="/admin/analytics">
//               <SidebarIcon><FaChartLine /></SidebarIcon>
//               Analytics
//             </SidebarLink>
//           </SidebarListItem>
//           <SidebarListItem>
//             <SidebarLink to="/admin/settings">
//               <SidebarIcon><FaCog /></SidebarIcon>
//               Settings
//             </SidebarLink>
//           </SidebarListItem>
//         </SidebarList>
//       </Sidebar>
//       <Content>
//         {/* <Header>
//           <h1>Admin Dashboard</h1>
//           <UserProfile>
//             <UserAvatar src="https://via.placeholder.com/40" alt="User Avatar" />
//             <span>Admin User</span>
//           </UserProfile>
//         </Header> */}
//         <MainContent>
//           <Outlet />
//         </MainContent>
//       </Content>
//     </DashboardContainer>
//   );
// };

// export default DashboardLayout;
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBus, FaRoute, FaCalendarAlt, FaMoneyBill, FaUsers, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.nav`
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
  position: fixed;
  height: 100%;
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #333;
`;

const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SidebarListItem = styled.li`
  margin: 15px 0;
  display: flex;
  align-items: center;
`;

const SidebarIcon = styled.span`
  margin-right: 10px;
`;

const SidebarLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  margin-left: 250px;
  flex-grow: 1;
  padding: 20px;
`;

const Header = styled.header`
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const MainContent = styled.main`
  margin-top: 20px;
`;

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication tokens or perform any other logout actions
    // For example, you might use localStorage.removeItem('authToken');

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarHeader>Admin Dashboard</SidebarHeader>
        <SidebarList>
          <SidebarListItem>
            <SidebarLink to="/admin/buses">
              <SidebarIcon><FaBus /></SidebarIcon>
              Bus Management
            </SidebarLink>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarLink to="/admin/routes">
              <SidebarIcon><FaRoute /></SidebarIcon>
              Route Management
            </SidebarLink>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarLink to="/admin/schedules">
              <SidebarIcon><FaCalendarAlt /></SidebarIcon>
              Schedule Management
            </SidebarLink>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarLink to="/admin/pays">
              <SidebarIcon><FaMoneyBill /></SidebarIcon>
              Payment Management
            </SidebarLink>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarLink to="/admin/users">
              <SidebarIcon><FaUsers /></SidebarIcon>
              User Management
            </SidebarLink>
          </SidebarListItem>
          <SidebarListItem>
            <SidebarLink to="/admin/analytics">
              <SidebarIcon><FaChartLine /></SidebarIcon>
              Analytics
            </SidebarLink>
          </SidebarListItem>
          {/* <SidebarListItem>
            <SidebarLink to="/admin/settings">
              <SidebarIcon><FaCog /></SidebarIcon>
              Settings
            </SidebarLink>
          </SidebarListItem> */}
          <SidebarListItem>
            <LogoutButton onClick={handleLogout}>
              <SidebarIcon><FaSignOutAlt /></SidebarIcon>
              Logout
            </LogoutButton>
          </SidebarListItem>
        </SidebarList>
      </Sidebar>
      <Content>
        {/* <Header>
          <h1>Admin Dashboard</h1>
          <UserProfile>
            <UserAvatar src="https://via.placeholder.com/40" alt="User Avatar" />
            <span>Admin User</span>
          </UserProfile>
        </Header> */}
        <MainContent>
          <Outlet />
        </MainContent>
      </Content>
    </DashboardContainer>
  );
};

export default DashboardLayout;
