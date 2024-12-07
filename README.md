# API Project README

This document provides an overview of the API project with three main routes: `/api/arii`, `/api/parteneri`, and `/api/traineri`. Each endpoint serves specific data related to areas, partners, and trainers. Below are the details:

## Routes

### 1. `/api/arii`

- **Method:** GET
- **Description:** Fetches a list of areas.
- **Response:**

```json
[
  {
    "id": "clsg162460001479jl4p5logq",
    "name": "3D Modeling",
    "imageUrl": "https://fiipractic-2024.s3.eu-central-1.amazonaws.com/d1332fcb-84d2-41bb-b5ea-f3288e4ae000.svg%2Bxml"
  },
  {
    "id": "clsg169fy0002479j6w0h9woj",
    "name": "Backend",
    "imageUrl": "https://fiipractic-2024.s3.eu-central-1.amazonaws.com/b183651d-5322-4123-bb8c-e49f6cb4463c.svg%2Bxml"
  }
]
```

### 2. `/api/parteneri`

- **Method:** GET
- **Description:** Fetches a list of partners with their details.
- **Response:**

```json
[
  {
    "id": "clsg1fypx0007479jkrh2vqar",
    "name": "Cirstean Paul Ioan",
    "imageUrl": "https://fiipractic-2024.s3.eu-central-1.amazonaws.com/d0752659-b07e-4053-b84b-91b058d4f6ce.jpeg",
    "url": "https://example.com",
    "tier": "INDIVIDUAL"
  },
  {
    "id": "clsg1m02c000e479jtiauif38",
    "name": "Bytex",
    "imageUrl": "https://fiipractic-2024.s3.eu-central-1.amazonaws.com/89dcbf96-a0be-4f54-9050-e91ba742d520.svg%2Bxml",
    "url": "https://bytex.net/",
    "tier": "DIAMOND"
  }
]
```

### 3. `/api/traineri`

- **Method:** GET
- **Description:** Fetches a list of trainers with their associated partners and training sessions.
- **Response:**

```json
[
  {
    "id": "clsh9s6lf002o47231r587uf8",
    "name": "Alexandru-Constantin",
    "email": "alexandru.cretu@asii.ro",
    "image": "https://lh3.googleusercontent.com/a/ACg8ocKbXnRNPkV6pl8okKuDYrlTK8XFZ7miG0Kqr4NT0-Mjiw"
  }
]
```