# Recruiter Microservice (Version 0.0.1)

## Overview

This microservice is designed to handle functionalities used by recruiters, such as requesting for candidate's data and CV.

## Features

- **Get Candidate Info:** Recruiters can retrieve candidates informataion.
- **Get Candidate CV:** Recruiters can retrive a signed AWS_S3_URL to download the CV of a candidate.

## Technologies

- **Language/Framework:** [ Typescript, Node.js with Express]
- **Database:** [ MongoDB ]
- **Authentication:** [ JWT ]
- **Cloud Services:** [ AWS SQS, AWS S3 ]
- **Containerization:** [ Docker ]

## Getting Started

### Prerequisites

- Install node v18.19.0

### Installation / Running

1. Clone the repository:

   ```bash
   git clone https://github.com/ShashwotBhattarai/recruiter_microservice.git
   ```

2. Install NPM packages:

   ```bash
    npm install
   ```

3. Add env variables:

   ```bash
    DATABASEURI=
    JWTSECRET=
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_REGION=
    SQS_QUEUE_URL=
    ENV=
    S3_BUCKET_NAME=
    PORT=
    Access_Control_Allow_Origin_URL=http://localhost:{{PORT}}
   ```

4. Run the application:

   ```bash
    npm run start
   ```

5. To test apis:

   ```bash
      Health check API:

        curl --location 'http://localhost:{{PORT}}/recruiter/health'



      GetAll Candidates API:

         curl --location 'http://localhost:{{PORT}}/recruiter/getCandidateInfo/all' \
          --header 'Authorization: Bearer {{<Token>}}'



      Download CV API:

         curl --location 'http://localhost:{{PORT}}/recruiter/getCandidateInfo/cv/{{s3_default_bucket_file_key}}' \
         --header 'Authorization: Bearer {{TOKEN}}'

   ```

### Test

```bash
   npm run test
```
