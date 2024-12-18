import { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { UserContext } from './UserProvider';
import { getUser, adminVerify } from './utilities/user-service';

import HomePage from './HomePage/HomePage';
import AuthPage from './AuthPage/AuthPage';
import LandingPage from './LandingPage/LandingPage';
import AdminHomePage from './AdminHome/AdminHome';
import AddAnimePage from './AddAnimePage/AddAnimePage';
import AnimeUpdatePage from './AnimeUpdatePage/AnimeUpdatePage';
import AddGenrePage from './AddGenrePage/AddGenrePage';
import AddStudioPage from './AddStudioPage/AddStudioPage';
import ProfilePage from './ProfilePage/ProfilePage';
import AnimeItemDetailPage from './AnimeItemDetailPage/AnimeItemDetailPage';
import UserAnimePage from './UserAnimePage/UserAnimePage';
import UserMangaPage from './UserMangaPage/UserMangaPage';
import TrendingPage from './TrendingPage/TrendingPage';
import NoUserAnimePage from './NoUserAnimePage/NoUserAnimePage';
import NoUserMangaPage from './NoUserMangaPage/NoUserMangaPage';
import TopAnimePage from './TopAnimePage/TopAnimePage';

function App() {
  const { user, admin, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      {user ? (
        <>
          {/* User routes */}
          <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/profile' element={<ProfilePage />}></Route>
            <Route path='animeList/:username' element={<UserAnimePage/>} />
            <Route path='mangaList/:username' element={<UserMangaPage/>} />
            <Route path='/trending' element={<TrendingPage />}></Route>
            <Route path="/top/anime" element={<TopAnimePage />}></Route>
            {admin ? (
              <>
                {/* Admin Routes */}
                <Route path='/admin/home' element={<AdminHomePage />} />
                <Route path='/admin/anime/add' element={<AddAnimePage />} />
                <Route path='/anime/:animeId' element={<AnimeUpdatePage />} />
                <Route path='/anime/:animeId/base' element={<AnimeItemDetailPage />} />
                <Route path='/admin/genre/add' element={<AddGenrePage />} />
                <Route path='/admin/studio/add' element={<AddStudioPage />} />
                <Route path='/null/user/admin' element={<LandingPage />} />
              </>
            ) : (
              <>
                {/* Non-Admin User Routes */}
                <Route path='/anime/:animeId' element={<AnimeItemDetailPage />} />
              </>
            )}
          </Routes>
        </>
      ) : (
        <>
          {/* Null routes */}
          <Routes>
            <Route path='/auth' element={<AuthPage />}></Route>
            <Route path='/' element={<LandingPage />}></Route>
            <Route path='/anime/:animeId' element={<AnimeItemDetailPage />}></Route>
            <Route path='/trending' element={<TrendingPage />}></Route>
            <Route path='/animeList' element={<NoUserAnimePage />}></Route>
            <Route path='/mangaList' element={<NoUserMangaPage />}></Route>
            <Route path="/top/anime" element={<TopAnimePage />}></Route>
          </Routes>
        </>
      )}
    </main>
  );
}

export default App;