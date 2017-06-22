// Imports
import { expect } from 'chai';
import 'mocha';
import * as request from 'supertest';
import express = require("express");

// Imports app
import { WebApi } from './app';

let api;

describe('POST /api/convert/topdf', function() {
  this.timeout(20000);

  beforeEach(() => {
     api = new WebApi(express(), 8000);
  });

  it('should respond with status code 200 given html', (done: () => void) => {
    request(api.getApp())
      .post('/api/convert/topdf')
      .send({
        html: '<p>Hello World</p>',
      })
      .expect(200, done);
  });
});

describe('POST /api/convert/topng', function() {
  this.timeout(20000);

  beforeEach(() => {
     api = new WebApi(express(), 8000);
  });

  it('should respond with status code 200 given html', (done: () => void) => {
    request(api.getApp())
      .post('/api/convert/topng')
      .send({
        html: '<p>Hello World</p>',
      })
      .expect(200, done);
  });
});
