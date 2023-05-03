import { runIngestData } from '@/utils/ingest-data';

(async () => {
  await runIngestData();
  console.log('ingestion complete');
})();
