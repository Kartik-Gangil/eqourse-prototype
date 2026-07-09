const winston = require('winston');
const { format } = winston;
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Config
const isProduction = process.env.NODE_ENV === 'production';
const logDir = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Sensitive field masking
const SENSITIVE_KEYS = ['password', 'token', 'secret', 'cvv', 'card', 'otp', 'razorpay_secret'];

const maskSensitive = (value) => {
  if (Array.isArray(value)) {
    return value.map(maskSensitive);
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, fieldValue]) => {
      const normalizedKey = key.toLowerCase();

      if (SENSITIVE_KEYS.some((sensitiveKey) => normalizedKey.includes(sensitiveKey))) {
        return [key, '***'];
      }

      if (
        (normalizedKey === 'phone' || normalizedKey === 'mobile' || normalizedKey === 'mobile_number') &&
        typeof fieldValue === 'string'
      ) {
        return [key, fieldValue.replace(/(\d{2})\d{5}(\d{3})/, '$1XXXXX$2')];
      }

      if ((normalizedKey === 'email' || normalizedKey === 'email_id') && typeof fieldValue === 'string') {
        return [key, fieldValue.replace(/^(.{2}).*(@.*)$/, '$1***$2')];
      }

      if (fieldValue && typeof fieldValue === 'object') {
        return [key, maskSensitive(fieldValue)];
      }

      return [key, fieldValue];
    })
  );
};

// Formats
const devFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta, null, 2)}` : '';
    return `${timestamp} ${level}: ${message}${stack ? `\n${stack}` : ''}${metaStr}`;
  })
);

const prodFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.json()
);

// Transports
const rotateOptions = (filename, level = 'info') => ({
  filename: path.join(logDir, `${filename}-%DATE%.log`),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
  level,
});

const transports = [
  new DailyRotateFile(rotateOptions('application')),
  new DailyRotateFile(rotateOptions('error', 'error')),
  new winston.transports.Console({
    format: isProduction ? prodFormat : devFormat,
  }),
];

// Logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
  format: isProduction ? prodFormat : devFormat,
  defaultMeta: {
    service: process.env.SERVICE_NAME || 'eqourse-backend-api',
    env: process.env.NODE_ENV || 'development',
  },
  transports,
  exceptionHandlers: [
    new DailyRotateFile(rotateOptions('exceptions')),
    new winston.transports.Console({ format: isProduction ? prodFormat : devFormat }),
  ],
  rejectionHandlers: [
    new DailyRotateFile(rotateOptions('rejections')),
    new winston.transports.Console({ format: isProduction ? prodFormat : devFormat }),
  ],
  exitOnError: false,
});

// HTTP request middleware
const requestLogger = (req, res, next) => {
  const requestId = crypto.randomUUID();
  req.id = requestId;
  const start = Date.now();

  res.on('finish', () => {
    const duration_ms = Date.now() - start;
    const status = res.statusCode;

    if (req.path === '/health' || req.path === '/ping' || req.path === '/') {
      return;
    }

    const level = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info';

    logger[level]('http_request', {
      requestId,
      method: req.method,
      path: req.path,
      query: maskSensitive(req.query),
      status,
      duration_ms,
      userId: req.user_id || req.user?.id || req.user?._id || res.locals.user?._id,
      role: req.user_type || req.user?.role,
      ip: (req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || '').trim(),
      userAgent: req.headers['user-agent'],
    });
  });

  next();
};

// Domain event loggers
logger.auth = (event, meta = {}) => {
  const level = event.includes('failed') || event.includes('error') ? 'warn' : 'info';
  logger[level]('auth_event', { event, ...maskSensitive(meta) });
};

logger.payment = (event, meta = {}) => {
  const level = event.includes('failed') || event.includes('error') ? 'error' : 'info';
  logger[level]('payment_event', {
    event,
    ...maskSensitive(meta),
    razorpay_secret: undefined,
    razorpayKeySecret: undefined,
  });
};

logger.coins = (event, meta = {}) => {
  const level = event.includes('failed') ? 'error' : 'info';
  logger[level]('coin_event', { event, ...meta });
};

logger.listing = (event, meta = {}) => {
  logger.info('listing_event', { event, ...meta });
};

logger.lead = (event, meta = {}) => {
  logger.info('lead_event', { event, ...meta });
};

logger.requestLogger = requestLogger;
module.exports = logger;
