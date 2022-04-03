import mongoose from 'mongoose';
import moment from 'moment';

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  //doc.birthDate = moment(doc.birthDate).format('DD-MMM-YYYY');
  //console.log(moment(doc.birthDate).format('YYYY-MM-DD'));
  return doc;
}
function convertDocToObjJSON(doc){
  //doc._id = doc._id.toString();
  doc.age = moment().diff(doc.birthDate, 'years'); // Output: 20
  console.log("DB Age: " + doc.age);

  doc.birthDate = moment(doc.birthDate).format('DD-MMM-YYYY');

  //doc.birthDate = moment(doc.birthDate).format('YYYY-MM-DD');
  //console.log(moment(doc.birthDate).format('YYYY-MM-DD'));
  //doc = JSON.parse(JSON.stringify(doc));
  return doc;

}
const db = { connect, disconnect, convertDocToObj, convertDocToObjJSON };
export default db;
