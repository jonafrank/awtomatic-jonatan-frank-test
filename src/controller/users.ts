import { RouterContext } from '@koa/router';
import { Next } from 'koa';
import _ from 'lodash';
import { data as users } from '../data/users';
import { inRadius } from '../utils/location';

export function getUsers(ctx: RouterContext, next:Next) {
  const {
    emailContains, coordinate, radius, fields,
  } = ctx.query;
  let resultUsers = _.cloneDeep(users);
  if (emailContains) {
    // @ts-ignore
    resultUsers = _.filter(resultUsers, (val) => val.email.toLowerCase().includes(emailContains.toLowerCase()));
  }
  if (coordinate) {
    // @ts-ignore
    const [centerLat, centerLng] = coordinate.split(',');
    if (radius) {
      resultUsers = _.filter(resultUsers, (val) => inRadius(
        { lat: Number(val.address.geo.lat), lng: Number(val.address.geo.lng) },
        { lat: centerLat, lng: centerLng },
        Number(radius),
      ));
    } else {
      resultUsers = _.filter(resultUsers, (val) => inRadius(
        { lat: Number(val.address.geo.lat), lng: Number(val.address.geo.lng) },
        { lat: centerLat, lng: centerLng },
      ));
    }
  }
  if (fields && fields.length > 0) {
    // @ts-ignore
    const fieldFilter = fields.split(',');
    // only filtering for base property not nested ones.
    // @ts-ignore
    resultUsers = _.map(resultUsers, (val) => _.pick(val, fieldFilter));
  }
  ctx.body = resultUsers;
  return next();
}
