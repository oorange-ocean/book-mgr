const { verify, getToken } = require('../token');
const mongoose = require('mongoose');

const Log = mongoose.model('Log');
const LogResponse = mongoose.model('LogResponse');

const excludedUrlPatterns = [
  /^\/user\/info/,
  /^\/character\/list/,
  /^\/log\/list/,
  /^\/log\/delete/,
  /^\/book\/list/,
  /^\/user\/list/,
]; // Add more patterns to exclude if needed

const logMiddleware = async (ctx, next) => {
  // Check if the request should be excluded from logging
  for (const pattern of excludedUrlPatterns) {
    if (pattern.test(ctx.url)) {
      await next(); // Skip logging and move to the next middleware
      return; // Exit the middleware
    }
  }

  const startTime = Date.now();

  await next();

  let payload = {};
  try {
    payload = await verify(getToken(ctx));
  } catch (e) {
    payload = {
      account: '未知用户',
      id: '',
    };
  }

  const url = ctx.url;
  const method = ctx.method;
  const status = ctx.status;

  let responseBody = '';

  if (typeof ctx.body === 'string') {
    responseBody = ctx.body;
  } else {
    try {
      responseBody = JSON.stringify(ctx.body);
    } catch {
      responseBody = '';
    }
  }

  const endTime = Date.now();

  const log = new Log({
    user: payload.account,
    request: {
      url,
      method,
      status,
    },
    endTime,
    startTime,
    show: true,
  });
  log.save();

  const logRes = new LogResponse({
    logId: log._id,
    data: responseBody,
  });
  logRes.save();
};

module.exports = {
  logMiddleware,
};
