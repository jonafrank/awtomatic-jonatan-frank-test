/* eslint-disable no-mixed-operators */
import { PositionPoint } from '../types';

/**
 * Estimating a Earth radius of 40000 km checks if a point is
 * inside a circle with a center and a radius in kilometres
 * @param {PositionPoint} point
 * @param {PositionPoint} center
 * @param {PositionPoint} kmRad
 * @returns boolean
 */
export const inRadius = (
  point: PositionPoint,
  center: PositionPoint,
  kmRad: number = 10,
): boolean => {
  // Kilometres per degry latitude. taking an estimate of 40000 km of earth circunference
  const ky = 40000 / 360;
  // kilometres per degry longitude.
  const kx = Math.cos(Math.PI * center.lat / 180.0) * ky;
  // distance longitude
  const dx = Math.abs(center.lng - point.lng) * kx;
  // distance latitude
  const dy = Math.abs(center.lat - point.lat) * ky;
  // pitagoric distance between 2 points
  return Math.sqrt(dx ** 2 + dy ** 2) <= kmRad;
};
