import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// 1. Define your secrets/URIs directly in the file
const URI_CONFERENCE = "mongodb+srv://barryjacob08:HrpYPLgajMiRJBgN@cluster0.ssafp.mongodb.net/conference?retryWrites=true&w=majority";
const URI_SALTANDLIGHT = "mongodb+srv://barryjacob08:HrpYPLgajMiRJBgN@cluster0.ssafp.mongodb.net/saltandlight?retryWrites=true&w=majority";

export async function GET() {
  let clientConference: MongoClient | null = null;
  let clientSaltAndLight: MongoClient | null = null;

  try {
    // 2. Connect to both MongoDB clusters simultaneously to save time
    clientConference = new MongoClient(URI_CONFERENCE);
    clientSaltAndLight = new MongoClient(URI_SALTANDLIGHT);

    await Promise.all([
      clientConference.connect(),
      clientSaltAndLight.connect()
    ]);

    // 3. Setup database and collection instances
    // (Note: Database names are extracted from your connection string paths)
    const dbConference = clientConference.db("conference");
    const dbSaltAndLight = clientSaltAndLight.db("saltandlight");

    // 4. Fetch only the email field from both collections using projection { email: 1, _id: 0 }
    const [conferenceDocs, saltDocs] = await Promise.all([
      dbConference.collection("registrations").find({}, { projection: { phone: 1, _id: 0 } }).toArray(),
      dbSaltAndLight.collection("users").find({}, { projection: { whatsapp: 1, _id: 0 } }).toArray()
    ]);

    // 5. Extract emails into a single array, filtering out any missing/empty emails
    const conferenceEmails = conferenceDocs.map(doc => doc.phone).filter(Boolean);
    const saltEmails = saltDocs.map(doc => doc.whatsapp).filter(Boolean);
    
    const allEmails = [...conferenceEmails, ...saltEmails];

    // 6. Join them into a single string separated by commas
    const commaSeparatedEmails = allEmails.join('/n');

    // 7. Return the plain text output
    return new NextResponse(commaSeparatedEmails, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });

  } catch (error: any) {
    console.error("Database fetching error:", error);
    return NextResponse.json({ error: "Failed to fetch emails", details: error.message }, { status: 500 });
  } finally {
    // 8. Always close your connections to prevent leaking pool sockets
    if (clientConference) await clientConference.close();
    if (clientSaltAndLight) await clientSaltAndLight.close();
  }
}
