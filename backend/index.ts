import app from "./app";
// import conn from './db/conn';

const init = async () => {
  try {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (ex) {
    console.error(ex);
  }
};

init();
