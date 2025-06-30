import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { HomePage } from '@/pages/HomePage'
import { WritePage } from '@/pages/WritePage'
import { ProfilePage } from '@/pages/ProfilePage'
import { SettingsPage } from '@/pages/SettingsPage'
import { PostDetailPage } from '@/pages/PostDetailPage'
import { useAppStore } from '@/stores/useWeb3Store'
import { useEffect } from 'react'
import './App.css'

function App() {
  const { theme } = useAppStore()

  // 应用主题
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/write" element={<WritePage />} />
            <Route path="/profile/:address?" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

