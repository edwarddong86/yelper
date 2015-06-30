/**
 * Created by edwarddong on 6/29/15.
 */
var superagent = require('superagent');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();


describe('Send the search data', function() {
  it('should return 200', function(done) {
    superagent.get('http://localhost:8080')
        .send()
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.status).to.be.eql(200);
          done();
        });
  });
  it('should return foods in irvine', function(done) {
   superagent.get('http://localhost:8080/foods/irvine')
       .send()
       .end(function(err, res) {
         console.log(res.location);
         expect(err).to.eql(null);
         expect(res.text).to.exist;
         done();
       });
  });
});