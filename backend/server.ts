import router from "./routes/routes";
import express from "express";
const app = express();
import cors from "cors";
import { databaseService } from './config/database';
import { Request, Response, NextFunction } from 'express';
import cron from 'node-cron';
import { mpesaReconciliationService } from './services/mpesareconciliationservice';

// // Run reconciliation every hour
// cron.schedule('*/3 * * * *', async () => {
//   console.log('[Cron] Starting scheduled M-Pesa reconciliation...');
//   try {
//     await mpesaReconciliationService.runReconciliation();
//     console.log('[Cron] Scheduled reconciliation completed successfully');
//   } catch (error) {
//     console.error('[Cron] Error during scheduled reconciliation:', error);
//   }
// });

// Schedule a cron job to keep the server alive
cron.schedule('*/59 * * * * *', () => {
  console.log('Cron job running every 1 minutes to keep the server alive');
});

const corsOptions = {
  origin: "*"
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/', router);

//middlewares
app.use((err: any, req: any, res: any, next: any) => {
    if (err.status === 401) {
      res.status(401).json({
        statusCode: 401,
        message: 'Unauthorized',
      });
    }
    next(err);
  });

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
    });

async function startServer() {
  try {
    // Check db connection
    const connectionStatus = await databaseService.testConnection();
    console.log("here is the connectionstatus message", connectionStatus.message);

    if (!connectionStatus.success) {
      console.log("Waiting for database connection...");
      // Wait for a bit and try again or proceed with caution
    } else {
      try {
        const stats = await databaseService.getDatabaseStats();
        console.log('Database Stats:', stats);
      } catch (error) {
        console.error("Failed to get database stats:", error);
        // Continue anyway as this isn't critical
      }
    }

    const PORT = parseInt(process.env.PORT || "7000", 10);
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    })
    .on('error', (error) => {
      console.log(`Error is : ${error}`);
    });


  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
