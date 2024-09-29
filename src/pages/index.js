// pages/index.js
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUserProfiles = async (e) => {
    e.preventDefault();
    setError(null);
    setUsers([]);

    try {
      const response = await fetch(`https://api.github.com/search/users?q=${username}`);
      if (!response.ok) {
        throw new Error('Kullanıcılar bulunamadı');
      }
      const data = await response.json();
      setUsers(data.items);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Project 5: GitHub User Search</h1>
      <div className={styles.search}>
        <form onSubmit={fetchUserProfiles}>
          <input
            type="text"
            placeholder="GitHub Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Search</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      {users.length > 0 && (
        <div className={styles.results}>
          <h2>Results</h2>
          {users.map((user) => (
            <div key={user.id} className={styles.profile}>
              <img src={user.avatar_url} alt={user.login} width={100} />
              <p>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                  {user.login}
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
