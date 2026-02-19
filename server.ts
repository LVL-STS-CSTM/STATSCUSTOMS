
import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;
const DATA_FILE = path.resolve(process.cwd(), 'data.json');

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

// --- Data Persistence (Mocking Cloudflare KV) ---
class DataStore {
    private data: Record<string, any> = {};

    constructor() {
        this.load();
        // Initialize default credentials if not present
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

// --- API Routes ---

// Data Get
app.get('/api/data/:key', (req: Request, res: Response) => {
    const key = req.params.key;
    const data = db.get(key);
    if (data === null) {
        return res.status(404).json({ message: 'Empty Segment' });
    }
    res.json(data);
});

// Data Post
app.post('/api/data/:key', (req: Request, res: Response) => {
    const key = req.params.key;
    const body = req.body;
    // In a real app, verify token here. For dev, we skip strict auth checks or assume admin.
    db.put(key, body);
    res.json({ success: true });
});

// Gemini API
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
                model: 'gemini-2.5-flash-latest', // Updated model name
                contents: `Write a 2-line technical marketing spec for ${productName} (${category}). No markdown. Focus on high-performance apparel.`,
            });
            return res.json({ text: response.text || "Quality technical apparel." });

        } else if (type === 'advisor') {
            const { messages, allProducts } = payload;
            const productContext = (allProducts || []).map((p: any) => 
                `ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Price: ${p.price ? `$${p.price}` : 'N/A'}`
            ).join('\n');

            const systemInstruction = `You are a technical product advisor for STATS CUSTOMS. 
            Catalogue Data:
            ${productContext}
            
            Identify the best match for the user. Be concise. One sentence max.`;

            const contents = (messages || []).slice(1).map((m: any) => ({
                role: m.sender === 'user' ? 'user' : 'model',
                parts: [{ text: m.text }]
            }));

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-latest', // Updated model name
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

// Quotes API (Mock)
app.post('/api/quotes', (req: Request, res: Response) => {
    console.log("Quote Received:", JSON.stringify(req.body, null, 2));
    // Mock success response
    res.json({ success: true, id: `MOCK-QT-${Date.now()}` });
});

// Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    const storedCreds = db.get('credential');
    
    if (storedCreds && username === storedCreds.username && password === storedCreds.password) {
        // Mock token
        res.json({ success: true, token: 'mock_admin_token_12345' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});


// --- Vite Middleware (Must be last) ---
async function startServer() {
    if (process.env.NODE_ENV !== 'production') {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'spa',
        });
        app.use(vite.middlewares);
    } else {
        // Production static serving (if needed)
        app.use(express.static('dist'));
    }

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
