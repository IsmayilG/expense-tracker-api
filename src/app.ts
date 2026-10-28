import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import transactionRoutes from './routes/transaction.routes';
import budgetRoutes from './routes/budget.routes';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', message: 'Expense Tracker API is running 🚀', timestamp: new Date().toISOString() });
});

app.get('/', (_req: Request, res: Response) => {
    res.json({ name: 'Expense Tracker API', version: '1.0.0' });
});

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);

app.use((_req: Request, res: Response) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined });
});

export default app;