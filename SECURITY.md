# Security Policy

## Supported Versions

| Version | Supported          | Security Updates |
| ------- | ------------------ | --------------- |
| 1.0.x   | :white_check_mark: | Yes             |
| < 1.0   | :x:                | No              |

## Security Overview

Wanderlust is a travel rental platform that handles user data, authentication, and file uploads. This document outlines our security practices and vulnerability reporting process.

## Security Features

### Authentication & Authorization
- **Password Hashing**: Uses bcrypt for secure password storage
- **Session Management**: Express-session with secure cookie settings
- **Passport.js**: Industry-standard authentication middleware
- **Protected Routes**: Authorization checks for sensitive operations

### Data Protection
- **Input Validation**: Joi validation schemas for all user inputs
- **MongoDB Injection Prevention**: Mongoose ODM with built-in protection
- **XSS Prevention**: EJS template auto-escaping
- **CSRF Protection**: Session-based CSRF tokens

### File Upload Security
- **Cloudinary Integration**: Secure cloud storage with automatic scanning
- **File Type Validation**: Multer configuration for allowed file types
- **Size Limits**: Configurable file size restrictions

### Environment Security
- **Environment Variables**: Sensitive data stored in .env files
- **No Hardcoded Secrets**: All API keys and secrets externalized
- **Production Configuration**: Separate production environment settings

## Security Best Practices Implemented

### 1. Password Security
```javascript
// Password hashing with bcrypt (handled by passport-local-mongoose)
User.plugin(passportLocalMongoose);
```

### 2. Session Security
```javascript
const sessionOption = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
}
```

### 3. Input Validation
```javascript
// Example validation with Joi
const listingSchema = Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10).max(1000),
    price: Joi.number().positive().required(),
    location: Joi.string().required(),
    country: Joi.string().required()
});
```

### 4. Database Security
- **MongoDB Connection**: Secure connection strings
- **Query Sanitization**: Mongoose built-in protection
- **Data Access Control**: User ownership verification

## Vulnerability Disclosure

### Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Email**: security@[your-domain].com
2. **Private Issue**: Create a private GitHub issue
3. **Include**: Detailed description, steps to reproduce, and potential impact

### Response Timeline

- **Initial Response**: Within 48 hours
- **Assessment**: Within 5 business days
- **Resolution**: Based on severity (see below)
- **Public Disclosure**: After patch is available

### Severity Levels

| Level | Description | Resolution Time |
|-------|-------------|-----------------|
| Critical | Remote code execution, data breach | 48 hours |
| High | Privilege escalation, data exposure | 7 days |
| Medium | XSS, CSRF, authentication bypass | 14 days |
| Low | Information disclosure, minor issues | 30 days |

## Security Guidelines for Developers

### 1. Environment Setup
- Never commit `.env` files to version control
- Use strong, unique secrets for production
- Enable HTTPS in production
- Keep dependencies updated

### 2. Code Review Checklist
- [ ] Input validation on all user data
- [ ] Authorization checks for protected resources
- [ ] Error handling doesn't leak sensitive information
- [ ] Database queries use parameterized statements
- [ ] File uploads are properly validated

### 3. Deployment Security
- Use environment-specific configurations
- Enable security headers (helmet.js recommended)
- Implement rate limiting
- Set up monitoring and logging
- Regular security audits

## Known Security Considerations

### Current Implementation Notes
1. **Session Secret**: Should be changed from default in production
2. **CORS**: Currently allows all origins - restrict in production
3. **Error Messages**: Generic error messages to prevent information disclosure
4. **File Uploads**: Cloudinary provides security scanning

### Recommended Improvements
1. **Rate Limiting**: Implement express-rate-limit
2. **Security Headers**: Add helmet.js middleware
3. **Content Security Policy**: Implement CSP headers
4. **Two-Factor Authentication**: Consider for enhanced security
5. **API Key Rotation**: Regular rotation of third-party API keys

## Security Dependencies

This project uses the following security-focused packages:
- `helmet` (recommended): Security headers
- `bcryptjs`: Password hashing
- `express-rate-limit` (recommended): Rate limiting
- `joi`: Input validation

## Security Updates

### Keeping Dependencies Secure
```bash
# Check for vulnerable dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Update packages
npm update
```

### Monitoring
- Monitor npm security advisories
- Subscribe to security mailing lists
- Regular dependency audits
- Automated security scanning

## Contact Information

For security-related inquiries:
- **Security Team**: security@[your-domain].com
- **GitHub Issues**: Use "security" label
- **Emergency**: Contact project maintainers directly

## Acknowledgments

We thank the security community for helping keep Wanderlust safe for everyone. All responsible disclosures will be acknowledged in our security updates.

---

**Remember**: Security is an ongoing process. Stay vigilant, keep dependencies updated, and follow security best practices.
