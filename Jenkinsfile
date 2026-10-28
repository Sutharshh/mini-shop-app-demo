
pipeline {
    agent any

    stages {
        // Stage 1: Get code from GitHub
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // Stage 2: Install dependencies and test backend
        stage('Test Backend') {
            steps {
                dir('backend') {
                    bat 'npm install'
                    bat 'npm test'
                }
            }
        }

        // Stage 3: Build frontend and backend Docker images
        stage('Build Docker Images') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    bat '''
                        docker build -t "%DOCKERHUB_USER%/mini-shop-backend:latest" ./backend
                        docker build -t "%DOCKERHUB_USER%/mini-shop-frontend:latest" ./frontend
                    '''
                }
            }
        }

        // Stage 4: Push images to Docker Hub
        stage('Push Images') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    bat '''
                        @echo off
                        docker login -u "%DOCKERHUB_USER%" --password-stdin < nul
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Mini Shop pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the Jenkins Console Output.'
        }
    }
}
