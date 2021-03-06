import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./components/pages/Home/Home";
import LoginPage from "./components/pages/LoginPage";
import GenderChartPage from "./components/pages/Dashboard/GenderChartPage";
import ReligionChartPage from "./components/pages/Dashboard/ReligionChartPage";
import EducAttChartPage from "./components/pages/Dashboard/EducAttChartPage";
import { CookiesProvider } from "react-cookie";
import { AuthenticationProvider } from "./components/Authentication";
import PrivateRoute from "./components/PrivateRoute";
import NotFoundPage from "./components/pages/NotFoundPage";
import ImportRecordPage from "./components/pages/RecordsPage/ImportRecordPage";
import Printable from "./components/Printable";
import Records from "./components/pages/RecordsPage/Records";
import RecordDetail from "./components/pages/RecordsPage/RecordDetail";
import UsersHistoryPage from "./components/pages/Users/UsersHistoryPage";
import EditRecordPage from "./components/pages/RecordsPage/EditRecordPage";
import DefaultPage from "./components/pages/DefaultPage";


function App() {
  return (
    <CookiesProvider>
      <AuthenticationProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route 
              path="init"
              element={
                <PrivateRoute>
                  <DefaultPage />
                </PrivateRoute>
              }
            />
            <Route path="chart">
              <Route path="" element={
                <Printable>
                  <GenderChartPage />
                </Printable>
              } />
              <Route path="gender" element={
                <Printable>
                  <GenderChartPage />
                </Printable>
              } />
              <Route path="religion" element={
                <Printable>
                  <ReligionChartPage />
                </Printable>
              } />
              <Route path="educatt" element={
                <Printable>
                  <EducAttChartPage />
                </Printable>
              } />
            </Route>

            <Route path="users/history" element={<UsersHistoryPage />} />
            <Route path="records">
              <Route path="" element={<Records />} />
              <Route path=":recordID">
                <Route path="" element={<RecordDetail />} />
                <Route path="edit/:index" element={<EditRecordPage />} />
                <Route path="add" element={<EditRecordPage />} />
              </Route>
              {/* <Route path=":recordID" element={<RecordDetail />} />
              <Route path=":recordID/:index" element={<EditRecordPage />} /> */}
              <Route path="import" element={<ImportRecordPage />} />
            </Route>
          </Route>
          <Route path="admin/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthenticationProvider>
    </CookiesProvider>
  );
}

export default App;
