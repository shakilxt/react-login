import "./LoginPage.module.css";

export default function LoginPage() {
    return (    
        <div className="login-page">
            
            <div className="login-container">

                <h2>Login</h2>
                <form>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <button type="submit">Login</button>
                </form>

            </div>

        </div>
    )
}


// // src/App.jsx
// import HomePage from './pages/HomePage'; // Import the new page
// // ... other imports

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} /> {/* Add this line */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         {/* ... other routes */}
//       </Routes>
//     </Router>
//   );
// }