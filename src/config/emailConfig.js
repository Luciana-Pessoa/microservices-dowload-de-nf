module.exports = (email, password, host, port) => ({
    imap: {
      user: email,
      password: password,
      host: host,
      port: port,
      tls: true,
      authTimeout: 3000
    }
  });
  