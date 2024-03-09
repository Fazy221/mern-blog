import mongoose from 'mongoose';

const dbToConnect = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log('DB Connected');
  } catch (err) {
    console.log("Error when connecting DB " + err);
  }
};

export default dbToConnect;