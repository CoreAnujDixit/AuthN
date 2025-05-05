
# AuthN Backend project
A Authentication and AuthZ Project for all Projects.
## API Reference

#### Register

```http
  POST http://localhost:3000/api/v1/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Login

```http
  POST http://localhost:3000/api/v1/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Logout

```http
  POST http://localhost:3000/api/v1/auth/logout
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### sendOtpToMail

```http
  POST http://localhost:3000/api/v1/auth/sendOTP
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### verifyOtp

```http
  POST http://localhost:3000/api/v1/auth/verify-Account
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

## Authors

- [@coreanujdixit](https://www.github.com/coreanujdixit)

