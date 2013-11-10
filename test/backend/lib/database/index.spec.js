var db = source('lib/database');

describe('database tests', function () {
  describe('naps', function() {
    xit('should get data', function(done) {
      expect(db).to.have.property('getNaps');
      db.getNaps.should.be.a('function');

      db.getNaps(function(err, naps) {
        if (err) {
          return done(err);
        }

        expect(naps).to.be.an('array');
        done();
      });
    });
  });

  describe('spots', function() {
    xit('should get data', function(done) {
      expect(db).to.have.property('getSpots');
      db.getSpots.should.be.a('function');

      db.getSpots(function(err, spots) {
        if (err) {
          return done(err);
        }

        expect(spots).to.be.an('array');
        done();
      });
    });

    xit('should check the internal addSpot function', function () {
      var data = [];

      expect(db).to.have.property('addSpot');
      db.addSpot.should.be.a('function');

      db.addSpot(data);

      expect(data).to.have.length(1);
      expect(data).to.deep.equal([{ 'name': 'RCH 301' }]);
    });
  });

  // an example of a pending test, kind of like a reminder that it should be filled in later
  it('should test the database error function');

  // skip also makes it a pending test case, and the test doesn't execute.
  // from the Mocha documentation:
  //   '[skip] is favoured over commenting out tests which you may forget to uncomment'
  it.skip('should test the error function', function (done) {
    expect(db).to.have.property('getError');
    db.getError.should.be.a('function');

    db.getError(function (err) {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('database error');

      // getting an error in this case means the test passed, lol
      done();
    });
  });
});
