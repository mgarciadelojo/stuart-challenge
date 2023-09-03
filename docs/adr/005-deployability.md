# Testing

## Context
The motivation behind this document is to explain how our app could be deployed to an AWS production environment using containerization. Containerization allows us to bundle our application with its dependencies and ensures consistency across various environments. To achieve this, we will use Docker Compose and a Dockerfile to create a Docker image. We will then push this image to Amazon Elastic Container Registry (ECR) and deploy it to Amazon Elastic Container Service (ECS).

## Decision
Here are the steps to deploy our application to AWS ECS:

### Build the docker image
Run the following command to build the Docker image locally:

```
docker-compose build
```

### Push the image to ECR

- Log in to the AWS CLI using your AWS credentials
- Create an Amazon ECR repository for your Docker image
- Authenticate Docker to your ECR registry
- Tag your Docker image with the ECR repository URL
- Push the image to your ECR repository

```
aws configure
aws ecr create-repository --repository-name stuart-challenge
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <YOUR_AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com
docker tag stuart-challenge:latest <YOUR_AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/stuart-challenge:latest
docker push <YOUR_AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/stuart-challenge:latest
```

### Deploy to AWS ECS
- Create an ECS task definition specifying the Docker image from ECR, task roles, and environment variables.
- Create an ECS cluster or use an existing one.
- Create an ECS service, referencing the task definition and cluster.
- Configure the desired number of tasks and auto-scaling settings as needed.
- Deploy the ECS service, and ECS will manage the deployment, ensuring that your application is running in the desired state.

## Consequences
In conclusion, the decision to deploy our application using Docker, AWS ECR, and AWS ECS offers many benefits in terms of consistency, scalability, and ease of management. However, it's essential to carefully plan and configure these services to ensure a smooth deployment process. This should all be automated using a CI/CD pipeline to ensure that the application is always up-to-date and running in the desired state.
