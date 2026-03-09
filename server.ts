import express from 'express';
import { createServer as createViteServer } from 'vite';
import db from './server/db.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes

  // 1. System State
  app.get('/api/state', (req, res) => {
    const row = db.prepare('SELECT state FROM system_state WHERE id = 1').get() as { state: string };
    res.json({ state: row.state });
  });

  app.post('/api/state', (req, res) => {
    const { state } = req.body;
    db.prepare('UPDATE system_state SET state = ? WHERE id = 1').run(state);
    res.json({ success: true, state });
  });

  // 2. Target Info
  app.get('/api/target', (req, res) => {
    const row = db.prepare('SELECT * FROM target_info WHERE id = 1').get();
    res.json(row);
  });

  app.post('/api/target', (req, res) => {
    const { domain, ip, location, status, isp, latency, ssl, securityScore } = req.body;
    db.prepare('UPDATE target_info SET domain = ?, ip = ?, location = ?, status = ?, isp = ?, latency = ?, ssl = ?, securityScore = ? WHERE id = 1')
      .run(domain, ip, location, status, isp, latency, ssl, securityScore);
    res.json({ success: true });
  });

  // 3. Notifications
  app.get('/api/notifications', (req, res) => {
    const rows = db.prepare('SELECT * FROM notifications ORDER BY timestamp DESC LIMIT 5').all();
    res.json(rows);
  });

  app.post('/api/notifications', (req, res) => {
    const { id, type, message, timestamp } = req.body;
    db.prepare('INSERT INTO notifications (id, type, message, timestamp) VALUES (?, ?, ?, ?)')
      .run(id, type, message, timestamp);
    res.json({ success: true });
  });

  app.delete('/api/notifications/:id', (req, res) => {
    db.prepare('DELETE FROM notifications WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  // 4. Blocked IPs
  app.get('/api/blocked-ips', (req, res) => {
    const rows = db.prepare('SELECT * FROM blocked_ips ORDER BY timestamp DESC LIMIT 10').all();
    res.json(rows);
  });

  app.post('/api/blocked-ips', (req, res) => {
    const { ip, reason, timestamp, duration } = req.body;
    db.prepare('INSERT OR REPLACE INTO blocked_ips (ip, reason, timestamp, duration) VALUES (?, ?, ?, ?)')
      .run(ip, reason, timestamp, duration);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    // SPA fallback
    app.get('*', (req, res) => {
      res.sendFile('index.html', { root: 'dist' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
