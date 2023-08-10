module.exports = {
    apps : [
      {
        name: 'API-MAIN',
        script: './api/index.js',
        instances: 2,
        autorestart: true,
        watch: false,
        max_memory_restart: '2G',
        env_development: {
          API_PORT: 3000
        },
        env_production: {
          API_PORT: 8080
        }
      },
      {
        name: 'API-MYSQL',
        script: './mysql/index.js',
        instances: 2,
        autorestart: true,
        watch: false,
        max_memory_restart: '2G',
        env_development: {
            API_PORT: 3001
        },
        env_production: {
            API_PORT: 8081
        }
      },
      {
        name: 'API-POST',
        script: './post/index.js',
        instances: 2,
        autorestart: true,
        watch: false,
        max_memory_restart: '2G',
        env_development: {
          API_PORT: 3002
        },
        env_production: {
          API_PORT: 8082
        }
      }
    ],
  };