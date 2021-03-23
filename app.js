const path = require('path');
const chalk = require('chalk');
const express = require('express');
const graphqlHttp = require("express-graphql");
const validator = require('validator');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const multer = require('multer');
const dotenv = require('dotenv');

const app = express();
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers')
const auth = require('./middleware/auth');
const { clearImage } = require('./util/file');

const routers = require('./routes');
dotenv.config({path: '.env'});

/**
 * Connect to MongoDB.
 */

mongoose.Promise = global.Promise;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, options);
mongoose.connection.on('connected', () => {
  console.log('==> %s MongoDB connection established!', chalk.green('✓'));
});
mongoose.connection.on('error', () => {
  console.log('==> %s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

// ================================================================
//  static file storage
// ================================================================

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

// ================================================================
//   Middlewares
// ================================================================

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(express.json()); // application/json
app.use(expressValidator({
  customValidators: {
    isMongoId(value) {
      if (typeof value !== 'undefined' && value) {
        return validator.isMongoId(value.toString()); // Validate string only!
      }
      return false;
    },
  }
}));

app.use( multer({ storage: fileStorage, fileFilter: fileFilter }).single('image') );
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// app.use(auth);

app.put('/post-image', (req, res, next) => {
  if (!req.isAuth) {
    throw new Error('Not authenticated!');
  }
  if (!req.file) {
    return res.status(200).json({ message: 'No file provided!' });
  }
  if (req.body.oldPath) {
    clearImage(req.body.oldPath);
  }
  return res
    .status(201)
    .json({ message: 'File stored.', filePath: req.file.path });
});

// ================================================================
//   GRAPHQL API
// ================================================================

app.use(
    '/graphql',
    graphqlHttp({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
        formatError(err) {
            if (!err.originalError) {
                return err;
            }
            const data = err.originalError.data;
            const message = err.message || 'An error occurred.';
            const code = err.originalError.code || 500;
            return { message: message, status: code, data: data };
        }
    })
);

// ================================================================
//   REST API
// ================================================================

app.use('/api/v1', routers);

//catch-all debugging response (no error sent back)
app.use((req,res,next) => {
    console.log('in the general middleware');
    res.send('<h1>Hello from Express!!!</h1>')
})

//catch-all error response
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });


app.listen(process.env.PORT ||3000, () => {
  console.info('==> 🌎  API is running on port %s %s', process.env.PORT, app.get('env'));
});