var prescision = 6;

var VectorPrototype = {
  toString: function () {
    return "<Vector x: " + this.x + ", y: " + this.y + ", z: " + this.z + ">";
  }
};

function Vector(raw) {
  var x, y, z;
  raw = raw || {};
  x = raw.x || 0;
  y = raw.y || 0;
  z = raw.z || 0;

  return Object.create(VectorPrototype, {
    x: {
      get: function () { return x; },
      set: function () { /* DEBT should return new vector or throw error */ }
    },
    y: {
      get: function () { return y; },
      set: function () { /* DEBT should return new vector or throw error */ }
    },
    z: {
      get: function () { return z; },
      set: function () { /* DEBT should return new vector or throw error */ }
    }
  });
}

Vector.magnitude = function (v) {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
};

Vector.scale = function (a, v) {
    var x = parseFloat((a * v.x).toPrecision(prescision));
    var y = parseFloat((a * v.y).toPrecision(prescision));
    var z = parseFloat((a * v.z).toPrecision(prescision));

    return Vector({x: x, y: y, z: z});
};

Vector.normalize = function (v) {
  var magnitude = Vector.magnitude(v);
  return Vector.scale(1/magnitude, v);
};

Vector.dotProduct = function (v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
};

describe("3D vector", function() {

  it("it should have a x value", function() {
    var vector = Vector({x: 5});
    expect(vector.x).toEqual(5);
  });

  it("it should have a y value", function() {
    var vector = Vector({y: 5});
    expect(vector.y).toEqual(5);
  });

  it("it should have a z value", function() {
    var vector = Vector({z: 5});
    expect(vector.z).toEqual(5);
  });

  it("it should have an immutable x value", function() {
    var vector = Vector({x: 5});
    vector.x = 3;
    expect(vector.x).toEqual(5);
  });

  it("it should have an immutable y value", function() {
    var vector = Vector({y: 5});
    vector.y = 3;
    expect(vector.y).toEqual(5);
  });

    it("it should have an immutable z value", function() {
    var vector = Vector({z: 5});
    vector.z = 3;
    expect(vector.z).toEqual(5);
  });

  it("should should have 0 as a default x value", function() {
    var vector = Vector();
    expect(vector.x).toEqual(0);
  });

  it("should should have 0 as a default y value", function() {
    var vector = Vector();
    expect(vector.y).toEqual(0);
  });

  it("should should have 0 as a default z value", function() {
    var vector = Vector();
    expect(vector.z).toEqual(0);
  });

  it("should print an inspectable string version", function () {
    var vector = Vector({x: 3, y: 4, z: 5});
    expect(vector.toString()).toEqual("<Vector x: 3, y: 4, z: 5>");
  });

  it("should be able to calculate the magnitude of a vector", function () {
    var vector = Vector({x: 3, y: 4, z: 0});
    expect(Vector.magnitude(vector)).toBe(5);
  });

  it("should be able to scale a vector", function () {
    var vector = Vector({x: 1, y: 2, z: 0});
    var new_vector = Vector.scale(2, vector);
    expect(new_vector.x).toEqual(2);
    expect(new_vector.y).toEqual(4);
    expect(new_vector.z).toEqual(0);
  });

  it("should be equal to same vector", function () {
    var vector1 = Vector({x: 1, y: 2, z: 0});
    var vector2 = Vector({x: 1, y: 2, z: 0});
    expect(vector1).toEqual(vector2);
  });

  it("should be able to normalize a vector", function () {
    var vector = Vector({x: 0, y: 3, z: 4});
    var normalizedVector = Vector({x: 0, y: 3/5, z: 4/5});
    expect(Vector.normalize(vector)).toEqual(normalizedVector);
  });

  it("can calculate the dot product of two vectors", function () {
    var vector1 = Vector({x: 1, y: 2, z: 0});
    var vector2 = Vector({x: 0, y: 3, z: 4});
    expect(Vector.dotProduct(vector1, vector2)).toEqual(6);

  });

});

/*jshint esnext: true */

var ACCELEROMETER_READING = "ACCELEROMETER_READING";

function OrientationStore(argument) {
  var accelerometerReading = Vector({x: 0, y: 0, z: 1});
  var neutralAcceleration = Vector({x: 0, y: 0, z: 1});

  function angleFromNeutral() {
    return parseFloat((Math.acos(Vector.dotProduct(Vector.normalize(accelerometerReading), neutralAcceleration)) * 180/ Math.PI).toPrecision(6));
  }

  return Object.create({
    accelerometerReading: function (reading) {
      accelerometerReading = reading;
    },
    // DEBT dispatch method here is untested. It should move up to a store prototype
    dispatch: function dispatch(action) {
      switch (action.type) {
        case ACCELEROMETER_READING:
          this.accelerometerReading(action.vector);

          break;
        default:

      }
    }
  }, {
    angleX: {
      get: function () {
        return angleFromNeutral();
      }
    },
    angleY: {
      get: function () {
        return angleFromNeutral();
      }
    }
  });
}

describe("Orientation Store", function() {

  it("it should start off with angleX = 0", function() {
    // Probably going to view model this to be "0.00"
    var store = OrientationStore();
    expect(store.angleX).toEqual(0);
  });

  it("it should start off with angleY = 0", function() {
    // Probably going to view model this to be "0.00"
    var store = OrientationStore();
    expect(store.angleY).toEqual(0);
  });

  it("it should calculate angleX for shift", function () {
    var store = OrientationStore();
    var vector = {x: 1, y: 0, z: 1};
    store.accelerometerReading(vector);
    expect(store.angleX).toEqual(45);
  });

  it("it should calculate angleY for shift", function () {
    var store = OrientationStore();
    var vector = {x: 0, y: 1, z: 1};
    store.accelerometerReading(vector);
    expect(store.angleY).toEqual(45);
  });

});

describe("Level Application; ", function() {

  it("it should have a working test", function() {
    expect(true).toEqual(true);
  });

  it("hash an experiment test", function () {
    var testObject = Object.create({}, {
      start: {
        get: function () {
          return function (arg) {
            window.console.log(arg);
          };
        }
      }
    });
    testObject.start(4);
  });

});