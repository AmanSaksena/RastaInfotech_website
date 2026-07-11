import { connectDB } from '../backend/lib/mongodb'
import KnowledgeChunk from '../backend/models/KnowledgeChunk'
import { embedTexts } from '../backend/lib/embeddings'
import { knowledgeBase } from '../backend/data/knowledgeBase'

async function run() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected successfully!');

    console.log('Deleting existing knowledge chunks from the database...');
    await KnowledgeChunk.deleteMany({});
    console.log('Existing knowledge chunks cleared.');

    console.log(`Generating embeddings for ${knowledgeBase.length} knowledge chunks via Cohere API...`);
    const texts = knowledgeBase.map((c) => c.text);
    const embeddings = await embedTexts(texts);
    console.log('Embeddings generated successfully!');

    const docs = knowledgeBase.map((chunk, i) => ({
      title: chunk.title,
      category: chunk.category,
      text: chunk.text,
      embedding: embeddings[i],
    }));

    console.log('Inserting new knowledge chunks into the database...');
    await KnowledgeChunk.insertMany(docs);
    console.log(`✅ Ingestion complete! Successfully seeded ${docs.length} knowledge chunks.`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Ingestion failed:', error);
    process.exit(1);
  }
}

run();
