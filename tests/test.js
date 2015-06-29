/**
* Created by edwarddong on 6/29/15.
*/
var superagent = require('superagent');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

console.log('hello');
describe('Get the foods', function() {
  it('got food data', function(done) {
    superagent.get('http://localhost:8080/foods/irvine')
        .send()
        .end(function(err, res) {
          expect(err).to.eql(null);
          console.log(res);
          done();
        });
  });

});