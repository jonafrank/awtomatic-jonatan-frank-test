import { inRadius } from "./location";

describe('Location Calculation Module.', () => {
  it('inRadius should return false default 10km radius', () => {
    const center = {
      lat: -34.607948537960624,
      lng: -58.421914203915975,
    };
    const point = {
      lat: -27.599216083076016,
      lng: -55.32793537353386,
    };

    const result = inRadius(point, center);
    expect(result).toBe(false);
  });
  it('inRadius should return true with default 10km radius', () => {
    const center = {
      lat: -34.607948537960624,
      lng: -58.421914203915975,
    };
    const point = {
      lat: -34.601903046668326,
      lng: -58.41065321703475,
    };
    const result = inRadius(point, center);
    expect(result).toBe(true);
  });
  it('inRadius should return false with 100km radius', () => {
    const center = {
      lat: -34.607948537960624,
      lng: -58.421914203915975,
    };
    const point = {
      lat: -27.599216083076016,
      lng: -55.32793537353386,
    };
    const result = inRadius(point, center, 100);
    expect(result).toBe(false);
  });
  it('inRadius should return true with 100km radius', () => {
    const center = {
      lat: -34.607948537960624,
      lng: -58.421914203915975,
    };
    const point = {
      lat: -34.92065469150876,
      lng: -57.95413408071765,
    };
    const result = inRadius(point, center, 100);
    expect(result).toBe(true);
  });
});
