<div align="center">
  <h3>Hackathon Shop</h3>
  <h3>해커톤 쇼핑몰</h3>
</div>
<div align="center">
    <a href="https://hackathonshop.vercel.app/">https://hackathonshop.vercel.app
    </a>
</div>
</br>
<div align="center">
<img src="https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/NestJS-E0234E?logo=NestJS&logoColor=white" alt="NestJS"/>
<img src="https://img.shields.io/badge/TypeORM-E0234E?logoColor=white"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=PostgreSQL&logoColor=white"/>
<img src="https://img.shields.io/badge/Jest-C21325?logo=Jest&logoColor=white"/>
<img src="https://img.shields.io/badge/Swagger-85EA2D?logo=Swagger&logoColor=white"/>
</div>

# Description

A template hackerton shop to quickly create a mall homepage.

Take a look at Hackerton Shop and build your own shopping mall!

</br>

# Quick Start Guide

### 1. installation

```bash
git clone https://github.com/Jabee7531/hackathonshop-server.git
cd hackathonshop-server
yarn
```

### 2. set up `.env` file

```
ENV=development

CORS_ALLOWED_ORIGINS=your_client_url

DATABASE_HOST=your_database_url.com
DATABASE_PORT=5432
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
DATABASE_DATABASE=postgres
DATABASE_SYNCHRONIZE=true

JWT_SECRET=secret
JWT_EXPIRATION_TIME=24000
Payment_SecretKey=toss_payment_key
```

### 3. start

```
yarn start:dev
```

<br/>

# Project & CI/CD architecture

<img src="./img/hackathonshop-architecture.png"/>

<br/>

# API List

<img src="./img/hackathonshop-swagger1.png"/>
<img src="./img/hackathonshop-swagger2.png"/>
<img src="./img/hackathonshop-swagger3.png"/>
<img src="./img/hackathonshop-swagger4.png"/>
<img src="./img/hackathonshop-swagger5.png"/>

<br/>

# ERD

<img src="./img/hackathonshop-ERD.png"/>

<br/>

# Performance Test

-   Test by [PageSpeed Insights](https://pagespeed.web.dev/)

<img src="./img/locallight-after1.png"/>

</br>

# Stress Test

-   Test by [Artillery](https://www.artillery.io/) (100 users, 10 requests)

<img src="./img/hksreport5.png"/>

<img src="./img/hksreport5r.png"/>

# License

MIT License

</br>
</br>
</br>

# 요약

쇼핑몰 홈페이지를 빠르게 만들기 위한 템플릿 해커톤 숍 입니다.

해커톤 숍을 참고 하여 자신만의 쇼핑몰을 만들어 보세요 !

</br>

# 빠른시작

### 1. 설치하기

```bash
git clone https://github.com/Jabee7531/hackathonshop-server.git
cd hackathonshop-server
yarn
```

### 2. `.env`파일 설정

```
ENV=development

CORS_ALLOWED_ORIGINS=your_client_url

DATABASE_HOST=your_database_url.com
DATABASE_PORT=5432
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
DATABASE_DATABASE=postgres
DATABASE_SYNCHRONIZE=true

JWT_SECRET=secret
JWT_EXPIRATION_TIME=24000
Payment_SecretKey=toss_payment_key
```

### 3. 시작하기

```
yarn start:dev
```

<br/>

# 프로젝트 & CI/CD 아키텍쳐

<img src="./img/hackathonshop-architecture.png"/>

<br/>

# API 목록

<img src="./img/hackathonshop-swagger1.png"/>
<img src="./img/hackathonshop-swagger2.png"/>
<img src="./img/hackathonshop-swagger3.png"/>
<img src="./img/hackathonshop-swagger4.png"/>
<img src="./img/hackathonshop-swagger5.png"/>

<br/>

# ERD

<img src="./img/hackathonshop-ERD.png"/>

<br/>

# 성능 테스트

-   [PageSpeed Insights](https://pagespeed.web.dev/)를 사용한 테스트 결과

<img src="./img/locallight-after1.png"/>

</br>

# 스트레스 테스트

-   [Artillery](https://www.artillery.io/)을 사용한 테스트 결과(100명의 사용자, 10개의 요청)

<img src="./img/hksreport5.png"/>

<img src="./img/hksreport5r.png"/>

</br>

# 라이센스

MIT License
