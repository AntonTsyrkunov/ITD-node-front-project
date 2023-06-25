import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { RegisterForm } from './RegisterForm/RegisterForm';
import { LoginForm } from './LoginForm/LoginForm';
import { CommonWelcomeField } from './CommonWelcomField/CommonWelcomeField';

// import ModalRegister from './ModalRegister/ModalRegister';
// import ModalLogin from './ModalLogin/ModalLogin';

import Loader from './Loader/Loader';
import { PrivateRoute, PublicRoute } from 'services/routes';
import { useDispatch } from 'react-redux';
import { getCurrentUserInfo } from 'redux/auth/authOperations';
import HeaderDashboard from './Bord/HeaderDashboard/HeaderDashboard';
import HomePage from 'pages/HomePage/HomePage';


// eslint-disable-next-line
// const HomePage = lazy(() => import('pages/HomePage/HomePage'));

const App = () => {
  const isLoading = false;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUserInfo());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/welcome"
              element={
                <PublicRoute restricted component={<CommonWelcomeField />} />
              }
            />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/home"
              element={<PrivateRoute component={<HomePage />} />}
            >
              <Route path=":boardName" element={<HeaderDashboard />} />
            </Route>
            <Route path="*" element={<Navigate to="/welcome" />} />
          </Routes>
        </Suspense>
      )}
      {/* <ToastContainer
        position="center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{
          width: '700px',
          height: '200px',
          fontSize: '24px',
          lineHeight: '36px',
        }}
      /> */}
    </>
  );
};

export default App;
