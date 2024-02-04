let URL = process.env.REACT_APP_localHostURL;
if (process.env.NODE_ENV === "production") {
  URL = process.env.REACT_APP_serverURL;
}

export {URL};