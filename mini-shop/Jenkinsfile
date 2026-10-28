pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    stages {
        // Stage 1: Checkout code from GitHub
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

        // Stage 3: Build Docker images
        stage('Build Docker Images') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-token',
                        usernameVariable: 'sutharsh30',
                        passwordVariable: 'dckr_pat_WK2-kVkk7TKBhIQpiPWpjUPBw9I'
                    )
                ]) {
                    bat '''
                        docker build -t "sutharsh30/mini-shop-backend:latest" ./backend
                        if errorlevel 1 exit /b 1

                        docker build -t "sutharsh30/mini-shop-frontend:latest" ./frontend
                        if errorlevel 1 exit /b 1
                    '''
                }
            }
        }

        // Stage 4: Push images to Docker Hub
        stage('Push Images') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-token',
                        usernameVariable: 'sutharsh30',
                        passwordVariable: 'dckr_pat_WK2-kVkk7TKBhIQpiPWpjUPBw9I'
                    )
                ]) {
                    bat '''
                        @echo off

                        echo dckr_pat_WK2-kVkk7TKBhIQpiPWpjUPBw9I | docker login -u "sutharsh30" --password-stdin
                        if errorlevel 1 exit /b 1

                        docker push "sutharsh30/mini-shop-backend:latest"
                        if errorlevel 1 exit /b 1

                        docker push "%sutharsh30/mini-shop-frontend:latest"
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
