pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test Backend') {
            steps {
                dir('mini-shop/backend') {
                    bat 'npm install'
                    bat 'npm test'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                bat '''
                    docker build -t sutharsh30/mini-shop-backend:latest ./mini-shop/backend
                    if errorlevel 1 exit /b 1

                    docker build -t sutharsh30/mini-shop-frontend:latest ./mini-shop/frontend
                    if errorlevel 1 exit /b 1
                '''
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-token',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_TOKEN'
                    )
                ]) {
                    bat '''
                        @echo off

                        echo %DOCKERHUB_TOKEN% | docker login -u "%DOCKERHUB_USER%" --password-stdin
                        if errorlevel 1 exit /b 1

                        docker push sutharsh30/mini-shop-backend:latest
                        if errorlevel 1 exit /b 1

                        docker push sutharsh30/mini-shop-frontend:latest
                        if errorlevel 1 exit /b 1

                        docker logout
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Mini Shop images built and pushed to Docker Hub!'
        }

        failure {
            echo 'FAILED: Check the Jenkins Console Output for the error.'
        }
    }
}
