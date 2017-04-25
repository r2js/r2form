const chai = require('chai');
const request = require('supertest');
const cheerio = require('cheerio');
const r2base = require('r2base');
const r2mongoose = require('r2mongoose');
const form = require('../index');

const expect = chai.expect;
process.chdir(__dirname);

const app = r2base({ baseDir: __dirname });
app.start()
  .serve(r2mongoose, { database: 'r2test' })
  .load('model')
  .serve(form)
  .into(app);

const Form = app.service('Form');

describe('r2form', () => {
  describe('render form', () => {
    it('should render fields, string', () => (
      Form.render('test')
        .then((data) => {
          const $ = cheerio.load(data);
          const slug = $('#f-slug');
          expect(slug.attr('name')).to.equal('slug');
          expect(slug.attr('type')).to.equal('text');
        })
    ));

    it('should render fields, number', () => (
      Form.render('test')
        .then((data) => {
          const $ = cheerio.load(data);
          const workerCount = $('#f-workerCount');
          expect(workerCount.attr('name')).to.equal('workerCount');
          expect(workerCount.attr('type')).to.equal('number');
        })
    ));

    it('should render fields, textarea', () => (
      Form.render('test')
        .then((data) => {
          const $ = cheerio.load(data);
          const description = $('#f-description');
          expect(description.attr('name')).to.equal('description');
          expect(description[0].name).to.equal('textarea');
        })
    ));

    it('should render fields, array', () => (
      Form.render('test')
        .then((data) => {
          const $ = cheerio.load(data);
          const arr1 = $('#f-arr1');
          expect(arr1.attr('name')).to.equal('arr1');
          expect(arr1.attr('type')).to.equal('hidden');
        })
    ));

    it('should render fields, datetime', () => (
      Form.render('test')
        .then((data) => {
          const $ = cheerio.load(data);
          const date1 = $('#f-date1');
          expect(date1.attr('name')).to.equal('date1');
          expect(date1.attr('type')).to.equal('text');
        })
    ));
  });
});
