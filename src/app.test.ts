// Imports
import { expect } from 'chai';
import 'mocha';
import * as request from 'supertest';
import express = require("express");

// Imports app
import { WebApi } from './app';

let api;

describe('POST /api/htmlconverter/convertpdf', function() {
  this.timeout(20000);

  beforeEach(() => {
     api = new WebApi(express(), 8000);
  });

  it('should respond with status code 200 given html', (done: () => void) => {
    request(api.getApp())
      .post('/api/htmlconverter/convertpdf')
      .send({
        html: '<p>Hello World</p>',
      })
      .expect(200, done);
  });
});

describe('POST /api/htmlconverter/convertpng', function() {
  this.timeout(20000);

  beforeEach(() => {
     api = new WebApi(express(), 8000);
  });

  it('should respond with status code 200 given html', (done: () => void) => {
    request(api.getApp())
      .post('/api/htmlconverter/convertpng')
      .send({
        html: '<p>Hello World</p>',
      })
      .expect(200, done);
  });
});
