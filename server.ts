
import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import bodyParser from 'body-parser';
import cors from 'cors';

async function startServer() {
    const app = express();
    const PORT = 3000;
    const DATA_FILE = path.resolve(process.cwd(), 'data.json');

    app.use(cors());
    app.use(bodyParser.json({ limit: '50mb' }));

    class DataStore {
        private data: Record<string, any> = {};

        constructor() {
            this.load();
            if (!this.data['credential']) {
                this.data['credential'] = { username: 'admin', password: 'password123' };
                this.save();
            }
        }

        private load() {
            if (fs.existsSync(DATA_FILE)) {
                try {
                    this.data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
                } catch (e) {
                    console.error("Failed to load data.json", e);
                    this.data = {};
                }
            }
        }

        private save() {
            fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2));
        }

        get(key: string) {
            return this.data[key] || null;
        }

        put(key: string, value: any) {
            this.data[key] = value;
            this.save();
        }
    }

    const db = new DataStore();

    app.get('/api/data/:key', (req: Request, res: Response) => {
        const key = req.params.key;
        const data = db.get(key);
        if (data === null) {
            return res.status(404).json({ message: 'Empty Segment' });
        }
        res.json(data);
    });

    app.post('/api/data/:key', (req: Request, res: Response) => {
        const key = req.params.key;
        const body = req.body;
        db.put(key, body);
        res.json({ success: true });
    });

    app.post('/api/gemini', async (req: Request, res: Response) => {
        try {
            const { type, payload } = req.body;
            const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

            if (!apiKey) {
                return res.status(500).json({ message: 'GEMINI_API_KEY not configured' });
            }

            const ai = new GoogleGenAI({ apiKey });

            if (type === 'description') {
                const { productName, category } = payload;
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-latest', 
                    contents: `Write a 2-line technical marketing spec for ${productName} (${category}). No markdown. Focus on high-performance apparel.`,
                });
                return res.json({ text: response.text || "Quality technical apparel." });

            } else if (type === 'advisor') {
                const { messages, allProducts } = payload;
                const productContext = (allProducts || []).map((p: any) => 
                    `ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Price: ${p.price ? `$${p.price}` : 'N/A'}`
                ).join('\n');

                const systemInstruction = `You are a technical product advisor for STATS CUSTOM. 
                Catalogue Data:
                ${productContext}
                
                Identify the best match for the user. Be concise. One sentence max.`;

                const contents = (messages || []).slice(1).map((m: any) => ({
                    role: m.sender === 'user' ? 'user' : 'model',
                    parts: [{ text: m.text }]
                }));

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-latest', 
                    contents: contents,
                    config: { systemInstruction }
                });

                return res.json({ text: response.text || "Scanning catalogue..." });
            } else if (type === 'review') {
                 const { keywords } = payload;
                 const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-latest',
                    contents: `Write a short, realistic 1-sentence review for a custom apparel brand based on these keywords: ${keywords}. Return JSON: { "author": "Name", "quote": "Review text" }`,
                    config: { responseMimeType: 'application/json' }
                 });
                 return res.json(JSON.parse(response.text || '{}'));
            }

            res.status(400).send('Unknown type');
        } catch (error: any) {
            console.error("Gemini Error:", error);
            res.status(500).json({ message: 'Service Unavailable', details: error.message });
        }
    });

    app.post('/api/quotes', (req: Request, res: Response) => {
        console.log("Quote Received:", JSON.stringify(req.body, null, 2));
        res.json({ success: true, id: `MOCK-QT-${Date.now()}` });
    });

    app.post('/api/admin/login', (req: Request, res: Response) => {
        const { username, password } = req.body;
        const storedCreds = db.get('credential');
        
        if (storedCreds && username === storedCreds.username && password === storedCreds.password) {
            res.json({ success: true, token: 'mock_admin_token_12345' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });

    if (process.env.NODE_ENV !== "production") {
        const { createServer: createViteServer } = await import('vite');
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: "spa",
        });
        app.use(vite.middlewares);
    } else {
        app.use(express.static(path.resolve(process.cwd(), 'dist')));
        app.get('*all', (req, res) => {
            res.sendFile(path.resolve(process.cwd(), 'dist/index.html'));
        });
    }

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();

