const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); 
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User'); 
let mongod;
let server;

beforeAll(async () => {
    // Start an in-memory MongoDB instance
    await mongoose.disconnect();
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
  
    // Connect to the in-memory database
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  
  afterAll(async () => {
    // Close the database connection and stop the in-memory MongoDB instance
    await mongoose.disconnect();
    await mongod.stop();

  });


describe('Register Controller', () => {
    
test('should register a user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('name', 'John Doe');
    expect(response.body).toHaveProperty('email', 'john@example.com');
    expect(response.body).toHaveProperty('token');
  });

  test('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'John Doe',
        // Missing email and password
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'please enter all fields');
  });

  // ... other tests ...
});
